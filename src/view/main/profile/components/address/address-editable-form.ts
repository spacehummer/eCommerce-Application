import { AddressFieldNames } from '#src/view/main/signup-login/components/enums';
import SignUpForm from '#src/view/main/signup-login/components/signup-form';
import InputFactory from '#src/view/main/signup-login/components/utils/inputFactory';
import View from '#src/view/view';
import EditableFieldSet from '../editable-fieldset';
import EditableForm from '../editable-form';
// import AddressState, { AddressStateFields } from './address-state-field';

let tmpLabel: string = '';

export enum AddressIdNames {
  AddressId = 'addressId',
}

export default class AddressEditableForm extends EditableForm {
  public readonly id: string;

  constructor(
    submitCallback: (record: Record<string, string | Record<string, string>>) => void,
    values: string[],
    label: string
  ) {
    tmpLabel = label;
    super(submitCallback, values, [
      ...Object.values(AddressFieldNames),
      // ...Object.values(AddressStateFields),
      ...Object.values(AddressIdNames),
    ]);

    this.id = values[values.length - 1];

    const idElem = InputFactory.default({
      type: 'hidden',
      name: AddressIdNames.AddressId,
      value: this.id,
    });

    this.setId(this.id);
    this.fieldSet?.basicComponent.addInnerElement(idElem);
  }

  protected createFieldSet(): EditableFieldSet {
    return new EditableFieldSet(
      '',
      tmpLabel,
      this.createItems(),
      this.editBtn,
      this.submit || this.createCancel()
    );
  }

  protected createItems(): View[] {
    // const state = new AddressState();
    return [...SignUpForm.createAdressFields() /* , state */];
  }
}
