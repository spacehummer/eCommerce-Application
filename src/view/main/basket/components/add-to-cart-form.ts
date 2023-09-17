import EditableFieldSet from '../../profile/components/editable-fieldset';
import EditableForm from '../../profile/components/editable-form';
import CancelSubmit from '../../profile/components/save-cancel-btn';
import InputFactory from '../../signup-login/components/utils/inputFactory';
import { ProductCredentials } from './types';

export enum AddCartFileds {
  ProductId = 'ProductId',
}

export default class AddToCartForm extends EditableForm {
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
  }

  public disable(): void {
    this.fieldSet?.getHTMLElement()?.setAttribute('disabled', '');
  }

  protected toggleForm(): void {}

  protected createFieldSet(): EditableFieldSet {
    return new EditableFieldSet('', '', [], undefined, this.submit);
  }

  protected createCancel(): CancelSubmit {
    return new CancelSubmit(undefined, 'Add to Cart', 'button');
  }
}
