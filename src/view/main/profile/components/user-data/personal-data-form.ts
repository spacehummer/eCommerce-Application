import {
  CredentialFieldNames,
  PersonFieldNames,
} from '#src/view/main/signup-login/components/enums';
import SignUpForm from '#src/view/main/signup-login/components/signup-form';
import EditableFieldSet from './editable-fieldset';
import EditableForm from './editable-form';

export default class PersonalDataForm extends EditableForm {
  public readonly fieldSesName: string = 'user-data';

  constructor(
    submitCallback: (record: Record<string, string | Record<string, string>>) => void,
    values: string[]
  ) {
    super(submitCallback, values, [CredentialFieldNames.Email, ...Object.values(PersonFieldNames)]);
  }

  protected createFieldSet(): EditableFieldSet {
    return new EditableFieldSet(
      this.fieldSesName,
      'Personal data',
      [SignUpForm.createEmail(), ...SignUpForm.createPersonFields()],
      this.editBtn,
      this.submit || super.createCancel()
    );
  }
}
