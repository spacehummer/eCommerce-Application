import { isDefaultAddress } from '#src/logic/state/state';
import { Address } from '#src/logic/state/types';
import FieldSet from '../signup-login/components/field-set';
import InputField from '../signup-login/components/input-field';

export const createDisplayField = (name: string, value: string): InputField => {
  const result = new InputField({
    type: 'text',
    name,
    label: name,
    title: name,
    value,
  });
  result.input.disabled = true;
  return result;
};

export const createDisplayAdress = (val: Address): FieldSet => {
  const fields = [
    createDisplayField('Country', val.country),
    createDisplayField('City', val.city),
    createDisplayField('Street', val.streetName),
    createDisplayField('Postal code', val.postalCode),
  ];
  const label = isDefaultAddress(val.id) ? 'Default' : '';
  return new FieldSet('', label, fields);
};

export default { createDisplayField };
