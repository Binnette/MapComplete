import {Store, UIEventSource} from "../UIEventSource";
import Svg from "../../Svg";
import {LocalStorageSource} from "../Web/LocalStorageSource";
import {VariableUiElement} from "../../UI/Base/VariableUIElement";
import LayoutConfig from "../../Models/ThemeConfig/LayoutConfig";
import {QueryParameters} from "../Web/QueryParameters";
import {BBox} from "../BBox";
import Constants from "../../Models/Constants";
import SimpleFeatureSource from "../FeatureSource/Sources/SimpleFeatureSource";

export interface GeoLocationPointProperties {
    id: "gps",
    "user:location": "yes",
    "date": string,
    "latitude": number
    "longitude": number,
    "speed": number,
    "accuracy": number
    "heading": number
    "altitude": number
}

export default class GeoLocationHandler extends VariableUiElement {

    private readonly currentLocation?: SimpleFeatureSource

    /**
     * Wether or not the geolocation is active, aka the user requested the current location
     */
    private readonly _isActive: UIEventSource<boolean>;

    /**
     * Wether or not the geolocation is locked, aka the user requested the current location and wants the crosshair to follow the user
     */
    private readonly _isLocked: UIEventSource<boolean>;

    /**
     * The callback over the permission API
     * @private
     */
    private readonly _permission: UIEventSource<string>;
    /**
     * Literally: _currentGPSLocation.data != undefined
     * @private
     */
    private readonly _hasLocation: Store<boolean>;
    private readonly _currentGPSLocation: UIEventSource<Coordinates>;
    /**
     * Kept in order to update the marker
     * @private
     */
    private readonly _leafletMap: UIEventSource<L.Map>;

    /**
     * The date when the user requested the geolocation. If we have a location, it'll autozoom to it the first 30 secs
     */
    private _lastUserRequest: UIEventSource<Date>;

    /**
     * A small flag on localstorage. If the user previously granted the geolocation, it will be set.
     * On firefox, the permissions api is broken (probably fingerprint resistiance) and "granted + don't ask again" doesn't stick between sessions.
     *
     * Instead, we set this flag. If this flag is set upon loading the page, we start geolocating immediately.
     * If the user denies the geolocation this time, we unset this flag
     * @private
     */
    private readonly _previousLocationGrant: UIEventSource<string>;
    private readonly _layoutToUse: LayoutConfig;

    constructor(
        state: {
            selectedElement: UIEventSource<any>;
            currentUserLocation?: SimpleFeatureSource,
            leafletMap: UIEventSource<any>,
            layoutToUse: LayoutConfig,
            featureSwitchGeolocation: UIEventSource<boolean>
        }
    ) {
        const currentGPSLocation = new UIEventSource<Coordinates>(undefined, "GPS-coordinate")
        const leafletMap = state.leafletMap
        const initedAt = new Date()
        let autozoomDone = false;
        const hasLocation = currentGPSLocation.map(
            (location) => location !== undefined
        );
        const previousLocationGrant = LocalStorageSource.Get(
            "geolocation-permissions"
        );
        const isActive = new UIEventSource<boolean>(false);
        const isLocked = new UIEventSource<boolean>(false);
        const permission = new UIEventSource<string>("");
        const lastClick = new UIEventSource<Date>(undefined);
        const lastClickWithinThreeSecs = lastClick.map(lastClick => {
            if (lastClick === undefined) {
                return false;
            }
            const timeDiff = (new Date().getTime() - lastClick.getTime()) / 1000
            return timeDiff <= 3
        })

        const latLonGiven = QueryParameters.wasInitialized("lat") && QueryParameters.wasInitialized("lon")
        const willFocus = lastClick.map(lastUserRequest => {
            const timeDiffInited = (new Date().getTime() - initedAt.getTime()) / 1000
            if (!latLonGiven && !autozoomDone && timeDiffInited < Constants.zoomToLocationTimeout) {
                return true
            }
            if (lastUserRequest === undefined) {
                return false;
            }
            const timeDiff = (new Date().getTime() - lastUserRequest.getTime()) / 1000
            return timeDiff <= Constants.zoomToLocationTimeout
        })

        lastClick.addCallbackAndRunD(_ => {
            window.setTimeout(() => {
                if (lastClickWithinThreeSecs.data || willFocus.data) {
                    lastClick.ping()
                }
            }, 500)
        })

        super(
            hasLocation.map(
                (hasLocationData) => {
                    if (permission.data === "denied") {
                        return Svg.location_refused_svg();
                    }

                    if (!isActive.data) {
                        return Svg.location_empty_svg()
                    }
                    if (!hasLocationData) {
                        // Position not yet found but we are active: we spin to indicate activity
                        // If will focus is active too, we indicate this differently
                        const icon = willFocus.data ? Svg.location_svg() : Svg.location_empty_svg()
                        icon.SetStyle("animation: spin 4s linear infinite;")
                        return icon;
                    }
                    if (isLocked.data) {
                        return Svg.location_locked_svg()
                    }
                    if (lastClickWithinThreeSecs.data) {
                        return Svg.location_unlocked_svg()
                    }

                    // We have a location, so we show a dot in the center
                    return Svg.location_svg();
                },
                [isActive, isLocked, permission, lastClickWithinThreeSecs, willFocus]
            )
        );
        this.SetClass("mapcontrol")
        this._isActive = isActive;
        this._isLocked = isLocked;
        this._permission = permission
        this._previousLocationGrant = previousLocationGrant;
        this._currentGPSLocation = currentGPSLocation;
        this._leafletMap = leafletMap;
        this._layoutToUse = state.layoutToUse;
        this._hasLocation = hasLocation;
        this._lastUserRequest = lastClick
        const self = this;

        const currentPointer = this._isActive.map(
            (isActive) => {
                if (isActive && !self._hasLocation.data) {
                    return "cursor-wait";
                }
                return "cursor-pointer";
            },
            [this._hasLocation]
        );
        currentPointer.addCallbackAndRun((pointerClass) => {
            self.RemoveClass("cursor-wait")
            self.RemoveClass("cursor-pointer")
            self.SetClass(pointerClass);
        });


        this.onClick(() => {
            /*
             * If the previous click was within 3 seconds (and we have an active location), then we lock to the location 
             */
            if (self._hasLocation.data) {
                if (isLocked.data) {
                    isLocked.setData(false)
                } else if (lastClick.data !== undefined) {
                    const timeDiff = (new Date().getTime() - lastClick.data.getTime()) / 1000
                    if (timeDiff <= 3) {
                        isLocked.setData(true)
                        lastClick.setData(undefined)
                    } else {
                        lastClick.setData(new Date())
                    }
                } else {
                    lastClick.setData(new Date())
                }
            }

            self.init(true, true);
        });


        const doAutoZoomToLocation = !latLonGiven && state.featureSwitchGeolocation.data && state.selectedElement.data !== undefined
        this.init(false, doAutoZoomToLocation);

        isLocked.addCallbackAndRunD(isLocked => {
            if (isLocked) {
                leafletMap.data?.dragging?.disable()
            } else {
                leafletMap.data?.dragging?.enable()
            }
        })

        this.currentLocation = state.currentUserLocation
        this._currentGPSLocation.addCallback((location) => {
            self._previousLocationGrant.setData("granted");
            const feature = {
                "type": "Feature",
                properties: <GeoLocationPointProperties>{
                    id: "gps",
                    "user:location": "yes",
                    "date": new Date().toISOString(),
                    "latitude": location.latitude,
                    "longitude": location.longitude,
                    "speed": location.speed,
                    "accuracy": location.accuracy,
                    "heading": location.heading,
                    "altitude": location.altitude
                },
                geometry: {
                    type: "Point",
                    coordinates: [location.longitude, location.latitude],
                }
            }

            self.currentLocation?.features?.setData([{feature, freshness: new Date()}])

            if (willFocus.data) {
                console.log("Zooming to user location: willFocus is set")
                lastClick.setData(undefined);
                autozoomDone = true;
                self.MoveToCurrentLocation(16);
            } else if (self._isLocked.data) {
                self.MoveToCurrentLocation();
            }

        });

    }

    private init(askPermission: boolean, zoomToLocation: boolean) {
        const self = this;

        if (self._isActive.data) {
            self.MoveToCurrentLocation(16);
            return;
        }

        if (typeof navigator === "undefined") {
            return
        }

        try {
            navigator?.permissions
                ?.query({name: "geolocation"})
                ?.then(function (status) {
                    console.log("Geolocation permission is ", status.state);
                    if (status.state === "granted") {
                        self.StartGeolocating(zoomToLocation);
                    }
                    self._permission.setData(status.state);
                    status.onchange = function () {
                        self._permission.setData(status.state);
                    };
                });
        } catch (e) {
            console.error(e);
        }

        if (askPermission) {
            self.StartGeolocating(zoomToLocation);
        } else if (this._previousLocationGrant.data === "granted") {
            this._previousLocationGrant.setData("");
            self.StartGeolocating(zoomToLocation);
        }
    }

    /**
     * Moves to the currently loaded location.
     *
     * // Should move to any location
     * let resultingLocation = undefined
     * let resultingzoom = 1
     * const state = {
     *             selectedElement: new UIEventSource<any>(undefined);
     *             currentUserLocation: undefined ,
     *             leafletMap: new UIEventSource<any>({getZoom: () => resultingzoom; setView: (loc, zoom) => {resultingLocation = loc; resultingzoom = zoom}),
     *             layoutToUse: new LayoutConfig(<any>{
     *                 id: 'test',
     *                 title: {"en":"test"}
     *                description: "A testing theme",
     *                layers: []
     *             }),
     *             featureSwitchGeolocation : new UIEventSource<boolean>(true)
     *         }
     * const handler = new GeoLocationHandler(state)
     * handler._currentGPSLocation.setData(<any> {latitude : 51.3, longitude: 4.1})
     * handler.MoveToCurrentLocation()
     * resultingLocation // => [51.3, 4.1]
     * handler._currentGPSLocation.setData(<any> {latitude : 60, longitude: 60) // out of bounds
     * handler.MoveToCurrentLocation()
     * resultingLocation // => [60, 60]
     * 
     * // should refuse to move if out of bounds
     * let resultingLocation = undefined
     * let resultingzoom = 1
     * const state = {
     *             selectedElement: new UIEventSource<any>(undefined);
     *             currentUserLocation: undefined ,
     *             leafletMap: new UIEventSource<any>({getZoom: () => resultingzoom; setView: (loc, zoom) => {resultingLocation = loc; resultingzoom = zoom}),
     *             layoutToUse: new LayoutConfig(<any>{
     *                 id: 'test',
     *                 title: {"en":"test"}
     *                "lockLocation": [ [ 2.1, 50.4], [6.4, 51.54 ]], 
     *                description: "A testing theme",
     *                layers: []
     *             }),
     *             featureSwitchGeolocation : new UIEventSource<boolean>(true)
     *         }
     * const handler = new GeoLocationHandler(state)
     * handler._currentGPSLocation.setData(<any> {latitude : 51.3, longitude: 4.1})
     * handler.MoveToCurrentLocation()
     * resultingLocation // => [51.3, 4.1]
     * handler._currentGPSLocation.setData(<any> {latitude : 60, longitude: 60) // out of bounds
     * handler.MoveToCurrentLocation()
     * resultingLocation // => [51.3, 4.1]
     */
    private MoveToCurrentLocation(targetZoom?: number) {
        const location = this._currentGPSLocation.data;
        this._lastUserRequest.setData(undefined);

        if (
            this._currentGPSLocation.data.latitude === 0 &&
            this._currentGPSLocation.data.longitude === 0
        ) {
            console.debug("Not moving to GPS-location: it is null island");
            return;
        }

        // We check that the GPS location is not out of bounds
        const b = this._layoutToUse.lockLocation;
        let inRange = true;
        if (b) {
            if (b !== true) {
                // B is an array with our locklocation
                inRange = new BBox(b).contains([location.longitude, location.latitude])
            }
        }
        if (!inRange) {
            console.log("Not zooming to GPS location: out of bounds", b, location);
        } else {
            const currentZoom = this._leafletMap.data.getZoom()
            this._leafletMap.data.setView([location.latitude, location.longitude], Math.max(targetZoom ?? 0, currentZoom));
        }
    }

    private StartGeolocating(zoomToGPS = true) {
        const self = this;

        this._lastUserRequest.setData(zoomToGPS ? new Date() : new Date(0))
        if (self._permission.data === "denied") {
            self._previousLocationGrant.setData("");
            self._isActive.setData(false)
            return "";
        }
        if (this._currentGPSLocation.data !== undefined) {
            this.MoveToCurrentLocation(16);
        }

        if (self._isActive.data) {
            return;
        }
        self._isActive.setData(true);

        navigator.geolocation.watchPosition(
            function (position) {
                self._currentGPSLocation.setData(position.coords);
            },
            function () {
                console.warn("Could not get location with navigator.geolocation");
            },
            {
                enableHighAccuracy: true
            }
        );
    }
}
