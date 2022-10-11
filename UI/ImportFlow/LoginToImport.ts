import Combine from "../Base/Combine"
import { FlowStep } from "./FlowStep"
import UserRelatedState from "../../Logic/State/UserRelatedState"
import { Store, UIEventSource } from "../../Logic/UIEventSource"
import Translations from "../i18n/Translations"
import Title from "../Base/Title"
import { VariableUiElement } from "../Base/VariableUIElement"
import { LoginToggle } from "../Popup/LoginButton"
import Img from "../Base/Img"
import Constants from "../../Models/Constants"
import Toggle from "../Input/Toggle"
import { SubtleButton } from "../Base/SubtleButton"
import Svg from "../../Svg"
import MoreScreen from "../BigComponents/MoreScreen"
import CheckBoxes from "../Input/Checkboxes"

export default class LoginToImport extends Combine implements FlowStep<UserRelatedState> {
    readonly IsValid: Store<boolean>
    readonly Value: Store<UserRelatedState>

    private static readonly whitelist = [15015689]

    constructor(state: UserRelatedState) {
        const t = Translations.t.importHelper.login
        const check = new CheckBoxes([
            new VariableUiElement(
                state.osmConnection.userDetails.map((ud) => t.loginIsCorrect.Subs(ud))
            ),
        ])
        const isValid = state.osmConnection.userDetails.map(
            (ud) =>
                LoginToImport.whitelist.indexOf(ud.uid) >= 0 ||
                ud.csCount >= Constants.userJourney.importHelperUnlock
        )
        super([
            new Title(t.userAccountTitle),
            new LoginToggle(
                new VariableUiElement(
                    state.osmConnection.userDetails.map((ud) => {
                        if (ud === undefined) {
                            return undefined
                        }
                        return new Combine([
                            new Img(ud.img ?? "./assets/svgs/help.svg").SetClass(
                                "w-16 h-16 rounded-full"
                            ),
                            t.loggedInWith.Subs(ud),
                            new SubtleButton(
                                Svg.logout_svg().SetClass("h-8"),
                                Translations.t.general.logout
                            ).onClick(() => state.osmConnection.LogOut()),
                            check,
                        ])
                    })
                ),
                t.loginRequired,
                state
            ),
            new Toggle(
                undefined,
                new Combine([
                    t.lockNotice.Subs(Constants.userJourney).SetClass("alert"),
                    MoreScreen.CreateProffessionalSerivesButton(),
                ]),
                isValid
            ),
        ])
        this.Value = new UIEventSource<UserRelatedState>(state)
        this.IsValid = isValid.map(
            (isValid) => isValid && check.GetValue().data.length > 0,
            [check.GetValue()]
        )
    }
}
