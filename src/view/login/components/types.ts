export type FormField = {
  name: string;
  label: string;
  pattern?: string;
  title?: string;
};

export type FormFieldContainer = {
  root: HTMLDivElement;
  input: HTMLInputElement;
  label: HTMLLabelElement;
};
