import TagsEnum from '#src/components_params/tags-enum';

export type Args = InputProperties & ElementProperties;

type InputProperties = {
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  value?: string;
  title?: string;
  form?: string;
  minLength?: number;
  maxLength?: number;
  max?: string;
};

type ElementProperties = {
  classList?: string[];
};

export type DefaultArgs = {
  type: InputType;
} & Args;

export type InputType = 'password' | 'email' | 'submit' | 'checkbox' | 'text' | 'date' | 'hidden';

type ConcreteType = {
  type: InputType;
} & Args;

type SubmitArgs = {
  value: string;
} & Args;

export default class InputFactory {
  public static default(args: DefaultArgs, elem?: HTMLInputElement): HTMLInputElement {
    const result = elem || document.createElement(TagsEnum.INPUT);
    const defaults = { ...args };

    if (args.classList) result.classList.add(...args.classList);

    result.type = defaults.type;
    if (defaults.id) result.id = defaults.id;
    if (defaults.name) result.name = defaults.name;
    if (defaults.placeholder) result.placeholder = defaults.placeholder;
    if (defaults.required) result.required = defaults.required;
    if (defaults.pattern) result.pattern = defaults.pattern;
    if (defaults.value) result.value = defaults.value;
    if (defaults.title) result.title = defaults.title;
    if (defaults.form) result.setAttribute('form', defaults.form);
    if (defaults.minLength) result.minLength = defaults.minLength;
    if (defaults.maxLength) result.maxLength = defaults.maxLength;
    if (defaults.max) result.max = defaults.max;

    return result;
  }

  private static concrete(type: InputType, args: Args, elem?: HTMLInputElement): HTMLInputElement {
    const newArgs = args as ConcreteType;
    newArgs.type = type;
    return this.default(newArgs, elem);
  }

  public static submit(args: SubmitArgs, elem?: HTMLInputElement): HTMLInputElement {
    return this.concrete('submit', args, elem);
  }
}
