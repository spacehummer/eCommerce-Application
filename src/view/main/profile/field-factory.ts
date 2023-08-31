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

export default { createDisplayField };
