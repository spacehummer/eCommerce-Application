import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import { IFormField } from './form-field';
import SelectComponent from './select';
import LabelFactory from './utils/labelFactory';

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
  private readonly select: SelectComponent;

  public readonly label: HTMLLabelElement;

  public get input(): HTMLInputElement {
    return this.select.getHTMLElement() as HTMLInputElement;
  }

  constructor(name: string, label: string, options: SelectOptionsArgs | SelectOptionsArgs[]) {
    super(args);

    this.select = new SelectComponent(name, options);

    this.label = LabelFactory.default({
      textContent: label,
      htmlFor: this.input.id,
    });

    this.basicComponent.addInnerElement(this.label);
    this.basicComponent.addInnerElement(this.select);
  }
}
