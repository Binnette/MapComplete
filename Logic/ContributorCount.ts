/// Given a feature source, calculates a list of OSM-contributors who mapped the latest versions
import {Store, UIEventSource} from "./UIEventSource";
import FeaturePipeline from "./FeatureSource/FeaturePipeline";
import Loc from "../Models/Loc";
import {BBox} from "./BBox";

export default class ContributorCount {

    public readonly Contributors: UIEventSource<Map<string, number>> = new UIEventSource<Map<string, number>>(new Map<string, number>());
    private readonly state: { featurePipeline: FeaturePipeline, currentBounds: Store<BBox>, locationControl: Store<Loc> };
    private lastUpdate: Date = undefined;

    constructor(state: { featurePipeline: FeaturePipeline, currentBounds: Store<BBox>, locationControl: Store<Loc> }) {
        this.state = state;
        const self = this;
        state.currentBounds.map(bbox => {
            self.update(bbox)
        })
        state.featurePipeline.runningQuery.addCallbackAndRun(
            _ => self.update(state.currentBounds.data)
        )

    }

    private update(bbox: BBox) {
        if (bbox === undefined) {
            return;
        }
        const now = new Date();
        if (this.lastUpdate !== undefined && ((now.getTime() - this.lastUpdate.getTime()) < 1000 * 60)) {
            return;
        }
        this.lastUpdate = now;
        const featuresList = this.state.featurePipeline.GetAllFeaturesWithin(bbox)
        const hist = new Map<string, number>();
        for (const list of featuresList) {
            for (const feature of list) {
                const contributor = feature.properties["_last_edit:contributor"]
                const count = hist.get(contributor) ?? 0;
                hist.set(contributor, count + 1)
            }
        }
        this.Contributors.setData(hist)
    }

}