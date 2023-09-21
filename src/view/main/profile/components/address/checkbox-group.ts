import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import FieldSet from '#src/view/main/signup-login/components/field-set';
import InputField from '#src/view/main/signup-login/components/input-field';
import View from '#src/view/view';

export default class CheckBoxGroup extends View {
  private readonly firstCheckbox: HTMLInputElement | null;

  private readonly checkboxes: HTMLInputElement[];

  private readonly fieldset: FieldSet;

  constructor(label: string, checkboxes: InputField[]) {
    super({
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.FORM_FIELD,
    });
    this.checkboxes = checkboxes.map((val) => val.input);
    this.firstCheckbox = checkboxes.length > 0 ? checkboxes[0].input : null;
    this.fieldset = new FieldSet('', label, checkboxes);
    this.init();

    this.basicComponent.addInnerElement(this.fieldset);
  }

  private init(): void {
    if (this.firstCheckbox) {
      for (let i = 0; i < this.checkboxes.length; i += 1) {
        this.checkboxes[i].addEventListener('change', this.checkValidity);
      }
    }
  }

  private isChecked(): boolean {
    for (let i = 0; i < this.checkboxes.length; i += 1) {
      if (this.checkboxes[i].checked) return true;
    }
    return false;
  }

  private readonly checkValidity = (): void => {
    const errorMessage = !this.isChecked() ? 'At least one checkbox must be selected.' : '';
    this.firstCheckbox?.setCustomValidity(errorMessage);
  };
}
