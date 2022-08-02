import Toggle from "../Input/Toggle";
import Lazy from "../Base/Lazy";
import {Utils} from "../../Utils";
import Translations from "../i18n/Translations";
import Combine from "../Base/Combine";
import Locale from "../i18n/Locale";
import LayoutConfig from "../../Models/ThemeConfig/LayoutConfig";
import {Translation} from "../i18n/Translation";
import {VariableUiElement} from "../Base/VariableUIElement";
import Link from "../Base/Link";
import LinkToWeblate from "../Base/LinkToWeblate";
import Toggleable from "../Base/Toggleable";
import Title from "../Base/Title";
import {Store, UIEventSource} from "../../Logic/UIEventSource";
import {SubtleButton} from "../Base/SubtleButton";
import Svg from "../../Svg";
import * as native_languages from "../../assets/language_native.json"
import * as used_languages from "../../assets/generated/used_languages.json"
import BaseUIElement from "../BaseUIElement";

class TranslatorsPanelContent extends Combine {
    constructor(layout: LayoutConfig, isTranslator: Store<boolean>) {
        const t = Translations.t.translations

        const {completeness, untranslated, total} = TranslatorsPanel.MissingTranslationsFor(layout)

        const seed = t.completeness
        for (const ln of Array.from(completeness.keys())) {
            if (ln === "*") {
                continue
            }
            if (seed.translations[ln] === undefined) {
                seed.translations[ln] = seed.translations["en"]
            }
        }

        const completenessTr = {}
        const completenessPercentage = {}
        seed.SupportedLanguages().forEach(ln => {
            completenessTr[ln] = "" + (completeness.get(ln) ?? 0)
            completenessPercentage[ln] = "" + Math.round(100 * (completeness.get(ln) ?? 0) / total)
        })

        function missingTranslationsFor(language: string): BaseUIElement[] {
            // e.g. "themes:<themename>.layers.0.tagRenderings..., or "layers:<layername>.description
            const missingKeys = Utils.NoNull(untranslated.get(language) ?? [])
                .filter(ctx => ctx.indexOf(":") >= 0)
                .map(ctx => ctx.replace(/note_import_[a-zA-Z0-9_]*/, "note_import"))

            const hasMissingTheme = missingKeys.some(k => k.startsWith("themes:"))
            const missingLayers = Utils.Dedup( missingKeys.filter(k => k.startsWith("layers:"))
                .map(k => k.slice("layers:".length).split(".")[0]))

            console.log("Getting untranslated string for",language,"raw:",missingKeys,"hasMissingTheme:",hasMissingTheme,"missingLayers:",missingLayers)
            return [
                hasMissingTheme ? new Link("themes:" + layout.id + ".* (zen mode)", LinkToWeblate.hrefToWeblateZen(language, "themes", layout.id), true) : undefined,
                ...missingLayers.map(id => new Link("layer:" + id + ".* (zen mode)", LinkToWeblate.hrefToWeblateZen(language, "layers", id), true)),
                ...missingKeys.map(context => new Link(context, LinkToWeblate.hrefToWeblate(language, context), true))
            ]
        }


        //
        // 
        // "translationCompleteness": "Translations for {theme} in {language} are at {percentage}: {translated} out of {total}",
        const translated = seed.Subs({
            total, theme: layout.title,
            percentage: new Translation(completenessPercentage),
            translated: new Translation(completenessTr),
            language: seed.OnEveryLanguage((_, lng) => native_languages[lng] ?? lng)
        })

        super([
            new Title(
                Translations.t.translations.activateButton,
            ),
            new Toggle(t.isTranslator.SetClass("thanks block"), undefined, isTranslator),
            t.help,
            translated,
            /*Disable button:*/
            new SubtleButton(undefined, t.deactivate)
                .onClick(() => {
                    Locale.showLinkToWeblate.setData(false)
                }),

            new VariableUiElement(Locale.language.map(ln => {
                const missing = missingTranslationsFor(ln)
                if (missing.length === 0) {
                    return undefined
                }
                let title = Translations.t.translations.allMissing;
                if(untranslated.get(ln) !== undefined){
                    title = Translations.t.translations.missing.Subs({count: untranslated.get(ln).length})
                }
                return new Toggleable(
                    new Title(title),
                    new Combine(missing).SetClass("flex flex-col")
                )
            }))
        ])

    }

}

export default class TranslatorsPanel extends Toggle {


    constructor(state: { layoutToUse: LayoutConfig, isTranslator: Store<boolean> }, iconStyle?: string) {
        const t = Translations.t.translations
        super(
            new Lazy(() => new TranslatorsPanelContent(state.layoutToUse, state.isTranslator)
            ).SetClass("flex flex-col"),
            new SubtleButton(Svg.translate_ui().SetStyle(iconStyle), t.activateButton).onClick(() => Locale.showLinkToWeblate.setData(true)),
            Locale.showLinkToWeblate
        )
        this.SetClass("hidden-on-mobile")

    }


    public static MissingTranslationsFor(layout: LayoutConfig): { completeness: Map<string, number>, untranslated: Map<string, string[]>, total: number } {
        let total = 0
        const completeness = new Map<string, number>()
        const untranslated = new Map<string, string[]>()

        Utils.WalkObject(layout, (o) => {
            const translation = <Translation><any>o;
            if (translation.translations["*"] !== undefined) {
                return
            }
            if (translation.context === undefined || translation.context.indexOf(":") < 0) {
                // no source given - lets ignore
                return
            }
            
            total ++
            used_languages.languages.forEach(ln => {
                const trans = translation.translations
                if (trans["*"] !== undefined) {
                    return;
                }
                if (trans[ln] === undefined) {
                    if (!untranslated.has(ln)) {
                        untranslated.set(ln, [])
                    }
                    untranslated.get(ln).push(translation.context)
                }else{
                    completeness.set(ln, 1 + (completeness.get(ln) ?? 0))
                }
            })
           
        }, o => {
            if (o === undefined || o === null) {
                return false;
            }
            return o instanceof Translation;
        })

        return {completeness, untranslated, total}
    }
}
