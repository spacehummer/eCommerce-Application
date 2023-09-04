import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import { getProfile } from '#src/logic/state/state';
import { ApiRequestResult } from '#src/view/main/signup-login/components/types';
import View from '#src/view/view';
import PasswordForm, { PasswordNames } from './password-form';
import PasswordModel from './password-model';

const model = new PasswordModel();

export default class ChangePassword extends View {
  private readonly form: PasswordForm;

  private readonly btn: HTMLButtonElement;

  constructor() {
    super({
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
    });

    this.btn = document.createElement(TagsEnum.BUTTON);
    this.btn.textContent = 'Change Password';
    this.btn.onclick = (): void => {
      this.btn.classList.add(ClassesEnum.HIDDEN);
      this.form.show();
    };

    this.form = new PasswordForm(this.submitCallback, this.onSucces);

    this.basicComponent.addInnerElement(this.btn);
    this.basicComponent.addInnerElement(this.form);
  }

  private readonly onSucces = (): void => {
    this.btn.classList.remove(ClassesEnum.HIDDEN);
  };

  private readonly submitCallback = (
    record: Record<string, string | Record<string, string>>
  ): void => {
    const profile = getProfile();
    if (profile) {
      const { version, email } = profile;
      const {
        [PasswordNames.CurrentPassword]: currentPassword,
        [PasswordNames.NewPassword]: newPassword,
      } = record;

      model
        .apiCall({ version, currentPassword, newPassword, email })
        .then((result: ApiRequestResult) => {
          this.form.showSubmitResults('Password Changed!', result);
        });
    }
  };
}
