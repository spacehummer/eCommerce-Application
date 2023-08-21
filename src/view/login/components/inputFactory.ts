import TagsEnum from '#src/components_params/tags-enum';

type Args = {
  id: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  classList?: string[];
  pattern?: string;
  value?: string;
  title?: string;
};

type DefaultArgs = {
  type: string;
} & Args;

type InputType = 'password' | 'email' | 'submit';

type ConcreteType = {
  type: InputType;
} & Args;

type PassArgs = {
  pattern: string;
  title: string;
} & Args;

type EmailArgs = Args;

type SubmitArgs = {
  value: string;
} & Args;

export default class InputFactory {
  public static default(
    {
      type,
      id,
      name,
      placeholder,
      required = false,
      classList,
      pattern,
      value,
      title,
    }: DefaultArgs,
    elem?: HTMLInputElement
  ): HTMLInputElement {
    const result = elem || document.createElement(TagsEnum.INPUT);

    if (classList) result.classList.add(...classList);
    result.type = type;
    if (id) result.id = id;
    if (name) result.name = name;
    if (placeholder) result.placeholder = placeholder;
    if (required) result.required = required;
    if (pattern) result.pattern = pattern;
    if (value) result.value = value;
    if (title) result.title = title;

    return result;
  }

  private static concrete(type: InputType, args: Args, elem?: HTMLInputElement): HTMLInputElement {
    const newArgs = args as ConcreteType;
    newArgs.type = type;
    return this.default(newArgs, elem);
  }

  public static password(args: PassArgs, elem?: HTMLInputElement): HTMLInputElement {
    return this.concrete('password', args, elem);
  }

  public static email(args: EmailArgs, elem?: HTMLInputElement): HTMLInputElement {
    return this.concrete('email', args, elem);
  }

  public static submit(args: SubmitArgs, elem?: HTMLInputElement): HTMLInputElement {
    return this.concrete('submit', args, elem);
  }
}
