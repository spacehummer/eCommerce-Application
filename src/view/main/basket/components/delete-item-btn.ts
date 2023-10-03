import InputFactory from '../../signup-login/components/utils/inputFactory';
import AddToCartForm from './add-to-cart-form';
import { BasketProductCredentials } from './types';

export default class DeleteItemButton extends AddToCartForm {
  constructor(
    callback: (record: Record<string, string | Record<string, string>>) => void,
    values: BasketProductCredentials,
    isDisabledByDefault: boolean = false
  ) {
    super(callback, values, [], [], isDisabledByDefault);

    this.fieldSet = undefined;

    this.setId(values.id);
    this.basicComponent.addInnerElement(this.cretate());
  }

  private cretate(): HTMLInputElement {
    const deleteBtn = InputFactory.default({ type: 'button', value: 'Delete from cart' });
    return deleteBtn;
  }
}
