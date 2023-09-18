import EditButton from '../../profile/components/edit-btn';
import EditableFieldSet from '../../profile/components/editable-fieldset';
import CancelSubmit from '../../profile/components/save-cancel-btn';
import InputField from '../../signup-login/components/input-field';
import InputFactory from '../../signup-login/components/utils/inputFactory';
import AddToCartForm, { AddCartFileds } from './add-to-cart-form';
import { BasketProductCredentials } from './types';

export enum ModifyQuantityFields {
  BasketItemId = 'id',
  Quantity = 'quantity',
}

export const BasketItemFields = { ...AddCartFileds, ...ModifyQuantityFields };
export type ModifyQuantityEnum = typeof BasketItemFields;

const editBtnText = 'Modify quantity';

export default class ModifyQuantity extends AddToCartForm {
  protected get enableValue(): string {
    return 'Modify';
  }

  protected get isToggle(): boolean {
    return true;
  }

  constructor(
    callback: (record: Record<string, string | Record<string, string>>) => void,
    values: BasketProductCredentials,
    isDisabledByDefault: boolean = true
  ) {
    super(
      callback,
      values,
      [`${values.quantity}`, values.productId, values.id],
      Object.values(BasketItemFields),
      isDisabledByDefault
    );

    this.setId(values.id);
    const basketItemId = InputFactory.default({
      type: 'hidden',
      name: ModifyQuantityFields.BasketItemId,
      value: values.id,
    });
    this.basicComponent.addInnerElement(basketItemId);

    this.fieldSet?.basicComponent.addInnerElement(this.createQuantity(values));
  }

  protected createEditBtn(btnText?: string): EditButton {
    return super.createEditBtn(btnText || editBtnText);
  }

  protected createFieldSet(): EditableFieldSet {
    return new EditableFieldSet('', '', [], this.editBtn, this.submit);
  }

  protected createCancel(): CancelSubmit {
    return new CancelSubmit(this.cancel.bind(this), this.enableValue, 'button');
  }

  private createQuantity(prod: BasketProductCredentials): InputField {
    const quantity = new InputField({
      label: 'Quntity:',
      name: ModifyQuantityFields.Quantity,
      type: 'number',
      min: '1',
      max: '100',
      maxLength: 3,
      value: `${prod.quantity}`,
    });

    return quantity;
  }
}
