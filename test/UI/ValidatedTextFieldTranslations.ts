import {describe} from 'mocha'
import {expect} from 'chai'
import Translations from "../../UI/i18n/Translations";
import ValidatedTextField from "../../UI/Input/ValidatedTextField";
import {fail} from "assert";

describe("ValidatedTextFields", () => {

    it("should all have description in the translations", () => {
        const ts = Translations.t.validation;
        const missingTranslations = Array.from(ValidatedTextField.allTypes.keys())
            .filter(key => ts[key] === undefined || ts[key].description === undefined)
        if (missingTranslations !== []) {
            fail("undefined", "a `description` for " + missingTranslations.join(", "), "These validated text fields don't have a type name defined in en.json. (Did you just add one? Run `npm run generate:translations`)")
        }
    })
})
