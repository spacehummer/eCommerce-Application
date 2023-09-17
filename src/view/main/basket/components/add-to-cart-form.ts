import EditableFieldSet from '../../profile/components/editable-fieldset';
import EditableForm from '../../profile/components/editable-form';
import CancelSubmit from '../../profile/components/save-cancel-btn';
import InputFactory from '../../signup-login/components/utils/inputFactory';
import { ProductCredentials } from './types';

export enum AddCartFileds {
  ProductId = 'ProductId',
}
const enableValue = 'Add to Cart';
const disableValue = 'Already in cart';

export default class AddToCartForm extends EditableForm {
  protected get enableValue(): string {
    return enableValue;
  }

  protected get disableValue(): string {
    return disableValue;
  }

  constructor(
    callback: (record: Record<string, string | Record<string, string>>) => void,
    values: ProductCredentials,
    isDisabledByDefault: boolean = false
  ) {
    super(callback, [values.productId], Object.values(AddCartFileds), isDisabledByDefault);

    this.setId(values.productId);

    const productId = InputFactory.default({
      type: 'hidden',
      name: AddCartFileds.ProductId,
      value: values.productId,
      form: values.productId,
    });

    if (this.submit) {
      this.submit.submit.onclick = (e: Event): void => {
        const elem = e.currentTarget as HTMLInputElement;
        const { form } = elem;
        if (form) {
          form.dispatchEvent(new SubmitEvent('submit'));
        }
      };
    }

    this.basicComponent.addInnerElement(productId);
  }

  public enable(): void {
    this.fieldSet?.getHTMLElement()?.removeAttribute('disabled');
    this.setSubmitValue(this.disableValue);
  }

  public disable(): void {
    this.fieldSet?.getHTMLElement()?.setAttribute('disabled', '');
    this.setSubmitValue(this.enableValue);
  }

  protected setSubmitValue(value: string): void {
    if (this.submit) {
      this.submit.submit.value = value;
    }
  }

  protected toggleForm(): void {}

  protected createFieldSet(): EditableFieldSet {
    return new EditableFieldSet('', '', [], undefined, this.submit);
  }

  protected createCancel(): CancelSubmit {
    return new CancelSubmit(undefined, this.enableValue, 'button');
  }
}
