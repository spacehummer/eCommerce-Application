import FieldSet from '#src/view/main/signup-login/components/field-set';
import View from '#src/view/view';
import EditButton from './edit-btn';
import CancelSubmit from './save-cancel-btn';

export default class EditableFieldSet extends FieldSet {
  constructor(
    name: string,
    label: string,
    fields: View[],
    editBtn: EditButton,
    submit: CancelSubmit
  ) {
    super(name, label, fields);

    this.legend.append(editBtn.getHTMLElement() as HTMLElement);

    this.basicComponent.addInnerElement(submit);
  }

  protected createFields(fields: View[]): void {
    super.createFields(fields);
  }
}
