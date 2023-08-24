import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import LabelFactory from '#src/view/login/components/labelFactory';
import View from '#src/view/view';
import { IFormField } from './field';
import Select from './select';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.CONTAINER,
  classNames: ClassesEnum.FORM_FIELD,
};

type SelectOptionsArgs = {
  text?: string;
  value?: string;
  defaultSelected?: boolean;
  selected?: boolean;
};

export default class SelectField extends View implements IFormField {
  private readonly select: Select;

  public readonly label: HTMLLabelElement;

  public get input(): HTMLInputElement {
    return this.select.getHTMLElement() as HTMLInputElement;
  }

  constructor(name: string, label: string, options: SelectOptionsArgs | SelectOptionsArgs[]) {
    super(args);

    this.select = new Select(name, options);

    this.label = LabelFactory.default({
      textContent: label,
      htmlFor: this.input.id,
    });

    this.basicComponent.addInnerElement(this.label);
    this.basicComponent.addInnerElement(this.select);
  }
}
