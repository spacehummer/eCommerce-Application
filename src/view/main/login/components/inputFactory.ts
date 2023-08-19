import TagsEnum from '#src/components_params/tags-enum';

type Args = {
  id: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  classList?: string[];
};

type DefaultArgs = {
  type: string;
} & Args;

type PassArgs = {
  type: 'password';
} & Args;

type EmailArgs = {
  type: 'email';
} & Args;

type SubmitArgs = {
  type: 'submit';
  value: string;
} & Args;

export default class InputFactory {
  public static default(
    { type, id, name, placeholder, required = false, classList }: DefaultArgs,
    elem?: HTMLInputElement
  ): HTMLInputElement {
    const result = elem || document.createElement(TagsEnum.INPUT);

    if (classList) result.classList.add(...classList);
    result.type = type;
    if (id) result.id = id;
    if (name) result.name = name;
    if (placeholder) result.placeholder = placeholder;
    if (required) result.required = required;

    return result;
  }

  public static password(args: PassArgs, elem?: HTMLInputElement): HTMLInputElement {
    return this.default(args, elem);
  }

  public static email(args: EmailArgs, elem?: HTMLInputElement): HTMLInputElement {
    return this.default(args, elem);
  }

  public static submit(args: SubmitArgs, elem?: HTMLInputElement): HTMLInputElement {
    const result = this.default(args, elem);
    return result;
  }
}
