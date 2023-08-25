import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';
import MessageField from './msg-field';
import { ErrorCollection } from './types';

export default class FormComponent extends View {
  protected readonly errorMsg: MessageField;

  protected readonly okMsg: MessageField;

  protected get form(): HTMLFormElement {
    return this.getHTMLElement() as HTMLFormElement;
  }

  public get elements(): HTMLFormControlsCollection {
    return this.form.elements;
  }

  constructor(
    protected readonly submitCallback: (record: Record<string, string>) => void,
    protected readonly itemsNames: ReadonlyArray<string>,
    classNames: ClassesEnum | ClassesEnum[]
  ) {
    super({
      tagName: TagsEnum.FORM,
      classNames,
    });

    this.errorMsg = new MessageField(ClassesEnum.FORM_ERROR_MESSAGE);
    this.okMsg = new MessageField(ClassesEnum.FORM_OK_MESSAGE);

    this.basicComponent.addInnerElement(this.okMsg);
    this.basicComponent.addInnerElement(this.errorMsg);

    this.form.onsubmit = this.onSubmit;
  }

  protected append(items: View[]): void {
    items.forEach((item) => this.basicComponent.addInnerElement(item));
  }

  protected getSubmitItems(): Record<string, string> {
    const result: Record<string, string> = {};

    this.itemsNames.reduce((acc, value) => {
      const elem = this.elements.namedItem(value) as HTMLInputElement;
      acc[value] = elem.value;
      return acc;
    }, result);

    return result;
  }

  public showSubmitResults(successMsg: string, errors?: ErrorCollection): void {
    if (errors && errors.errorMsg) {
      errors.error?.forEach((value) => {
        if (value.field) {
          const namedItem = this.elements.namedItem(value.field);
          if (namedItem) {
            const input = namedItem as HTMLInputElement;
            input.setCustomValidity(value.message);
            input.checkValidity();
          }
        }
      });
      this.errorMsg.show(errors.errorMsg);
      this.form.reportValidity();
    } else {
      this.okMsg.show(successMsg);
    }
  }

  protected readonly onSubmit = (): boolean => {
    this.errorMsg.hide();
    this.okMsg.hide();
    const submitData = this.getSubmitItems();
    this.submitCallback(submitData);
    return false;
  };
}
