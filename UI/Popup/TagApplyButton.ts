import { AutoAction } from "./AutoApplyButton"
import Translations from "../i18n/Translations"
import { VariableUiElement } from "../Base/VariableUIElement"
import BaseUIElement from "../BaseUIElement"
import { FixedUiElement } from "../Base/FixedUiElement"
import { Store, UIEventSource } from "../../Logic/UIEventSource"
import { SubtleButton } from "../Base/SubtleButton"
import Combine from "../Base/Combine"
import ChangeTagAction from "../../Logic/Osm/Actions/ChangeTagAction"
import { And } from "../../Logic/Tags/And"
import Toggle from "../Input/Toggle"
import { Utils } from "../../Utils"
import { Tag } from "../../Logic/Tags/Tag"
import FeaturePipelineState from "../../Logic/State/FeaturePipelineState"
import LayoutConfig from "../../Models/ThemeConfig/LayoutConfig"
import { Changes } from "../../Logic/Osm/Changes"

export default class TagApplyButton implements AutoAction {
    public readonly funcName = "tag_apply"
    public readonly docs =
        "Shows a big button; clicking this button will apply certain tags onto the feature.\n\nThe first argument takes a specification of which tags to add.\n" +
        Utils.Special_visualizations_tagsToApplyHelpText
    public readonly supportsAutoAction = true
    public readonly args = [
        {
            name: "tags_to_apply",
            doc: "A specification of the tags to apply",
        },
        {
            name: "message",
            doc: "The text to show to the contributor",
        },
        {
            name: "image",
            doc: "An image to show to the contributor on the button",
        },
        {
            name: "id_of_object_to_apply_this_one",
            defaultValue: undefined,
            doc: "If specified, applies the the tags onto _another_ object. The id will be read from properties[id_of_object_to_apply_this_one] of the selected object. The tags are still calculated based on the tags of the _selected_ element",
        },
    ]
    public readonly example =
        "`{tag_apply(survey_date=$_now:date, Surveyed today!)}`, `{tag_apply(addr:street=$addr:street, Apply the address, apply_icon.svg, _closest_osm_id)"

    /**
     * Parses a tag specification
     *
     * TagApplyButton.parseTagSpec("key=value;key0=value0") // => [["key","value"],["key0","value0"]]
     *
     * // Should handle escaped ";"
     * TagApplyButton.parseTagSpec("key=value;key0=value0\\;value1") // => [["key","value"],["key0","value0;value1"]]
     */
    private static parseTagSpec(spec: string): [string, string][]{
        const tgsSpec : [string, string][] = []

        while(spec.length > 0){
            const [part] = spec.match(/((\\;)|[^;])*/)
            spec = spec.substring(part.length + 1) // +1 to remove the pending ';' as well
            const kv = part.split("=").map((s) => s.trim().replace("\\;",";"))
            if (kv.length == 2) {
                tgsSpec.push(<[string, string]> kv)
            }else if (kv.length < 2) {
                throw "Invalid key spec: no '=' found in " + spec
            }else{
                throw "Invalid key spec: multiple '=' found in " + spec
            }
        }

        for (const spec of tgsSpec) {
            if (spec[0].endsWith(":")) {
                throw "The key for a tag specification for import or apply ends with ':'. The theme author probably wrote key:=otherkey instead of key=$otherkey"
            }
        }
        return tgsSpec
    }

    public static generateTagsToApply(spec: string, tagSource: Store<any>): Store<Tag[]> {
        // Check whether we need to look up a single value

        if (!spec.includes(";") && !spec.includes("=") && spec.includes("$")) {
            // We seem to be dealing with a single value, fetch it
            spec = tagSource.data[spec.replace("$", "")]
        }

       const tgsSpec = TagApplyButton.parseTagSpec(spec)

        return tagSource.map((tags) => {
            const newTags: Tag[] = []
            for (const [key, value] of tgsSpec) {
                if (value.indexOf("$") >= 0) {
                    let parts = value.split("$")
                    // THe first of the split won't start with a '$', so no substitution needed
                    let actualValue = parts[0]
                    parts.shift()

                    for (const part of parts) {
                        const [_, varName, leftOver] = part.match(/([a-zA-Z0-9_:]*)(.*)/)
                        actualValue += (tags[varName] ?? "") + leftOver
                    }
                    newTags.push(new Tag(key, actualValue))
                } else {
                    newTags.push(new Tag(key, value))
                }
            }
            return newTags
        })
    }

    async applyActionOn(
        state: {
            layoutToUse: LayoutConfig
            changes: Changes
        },
        tags: UIEventSource<any>,
        args: string[]
    ): Promise<void> {
        const tagsToApply = TagApplyButton.generateTagsToApply(args[0], tags)
        const targetIdKey = args[3]

        const targetId = tags.data[targetIdKey] ?? tags.data.id
        const changeAction = new ChangeTagAction(
            targetId,
            new And(tagsToApply.data),
            tags.data, // We pass in the tags of the selected element, not the tags of the target element!
            {
                theme: state.layoutToUse.id,
                changeType: "answer",
            }
        )
        await state.changes.applyAction(changeAction)
    }

    public constr(
        state: FeaturePipelineState,
        tags: UIEventSource<any>,
        args: string[]
    ): BaseUIElement {
        const tagsToApply = TagApplyButton.generateTagsToApply(args[0], tags)
        const msg = args[1]
        let image = args[2]?.trim()
        if (image === "" || image === "undefined") {
            image = undefined
        }
        const targetIdKey = args[3]
        const t = Translations.t.general.apply_button

        const tagsExplanation = new VariableUiElement(
            tagsToApply.map((tagsToApply) => {
                const tagsStr = tagsToApply.map((t) => t.asHumanString(false, true)).join("&")
                let el: BaseUIElement = new FixedUiElement(tagsStr)
                if (targetIdKey !== undefined) {
                    const targetId = tags.data[targetIdKey] ?? tags.data.id
                    el = t.appliedOnAnotherObject.Subs({ tags: tagsStr, id: targetId })
                }
                return el
            })
        ).SetClass("subtle")
        const self = this
        const applied = new UIEventSource(false)
        const applyButton = new SubtleButton(
            image,
            new Combine([msg, tagsExplanation]).SetClass("flex flex-col")
        ).onClick(() => {
            self.applyActionOn(state, tags, args)
            applied.setData(true)
        })

        return new Toggle(
            new Toggle(t.isApplied.SetClass("thanks"), applyButton, applied),
            undefined,
            state.osmConnection.isLoggedIn
        )
    }
}
