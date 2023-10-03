import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import InputField from '#src/view/main/signup-login/components/input-field';
import View from '#src/view/view';
import CheckBoxGroup from './checkbox-group';

export enum AddressStateFields {
  isShipping = 'isShipping',
  IsBilling = 'isBilling',
  IsDefault = 'isDefaultAddress',
}

export default class AddressState extends View {
  private addressType: CheckBoxGroup;

  constructor() {
    super({
      tagName: TagsEnum.CONTAINER,
      classNames: ClassesEnum.FORM_FIELD_CONTAINER,
    });

    const isShip = this.createCheckbox(AddressStateFields.isShipping, 'Set as shipping address.');
    const isBill = this.createCheckbox(AddressStateFields.IsBilling, 'Set as billing address.');
    const isDefault = this.createCheckbox(
      AddressStateFields.IsDefault,
      'Set as default (billing and/or shipping)'
    );

    this.addressType = new CheckBoxGroup('Address types', [isShip, isBill]);

    this.basicComponent.addInnerElement(this.addressType);
    this.basicComponent.addInnerElement(isDefault);
  }

  private readonly onClick = (e: Event): void => {
    const target = e.currentTarget as HTMLInputElement;
    if (!target.checked) {
      target.value = 'off';
    } else {
      target.value = 'on';
    }
  };

  private createCheckbox(name: AddressStateFields, label: string): InputField {
    const checkbox = new InputField(
      {
        type: 'checkbox',
        name,
        label,
        classList: [ClassesEnum.INPUT_CHECK],
        value: 'off',
      },
      'input-first'
    );
    checkbox.basicComponent.setCssClassesToElement([ClassesEnum.FORM_FIELD_CHECKBOX]);

    checkbox.input.onclick = this.onClick;
    return checkbox;
  }
}
