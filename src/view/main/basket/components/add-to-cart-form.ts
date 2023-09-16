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
    values: ProductCredentials
  ) {
    super(callback, [values.productId], Object.values(AddCartFileds), false);

    this.setId(values.productId);

    const productId = InputFactory.default({
      type: 'hidden',
      value: values.productId,
      form: values.productId,
    });

    if (this.fieldSet) {
      this.fieldSet.basicComponent.addInnerElement(productId);
    }
  }

  protected createFieldSet(): EditableFieldSet {
    return new EditableFieldSet('', '', [], undefined, this.submit);
  }

  protected createCancel(): CancelSubmit {
    return new CancelSubmit(undefined, 'Add to Cart');
  }
}
