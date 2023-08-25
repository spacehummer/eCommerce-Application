import { BasicComponentConstructorArgs } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

const args: BasicComponentConstructorArgs = {
  tagName: TagsEnum.SELECT,
  classNames: [ClassesEnum.INPUT, ClassesEnum.INPUT_SELECT],
};

type SelectOptionsArgs = {
  text?: string;
  value?: string;
  defaultSelected?: boolean;
  selected?: boolean;
};

export default class SelectComponent extends View {
  constructor(name: string, options: SelectOptionsArgs | SelectOptionsArgs[]) {
    super(args);

    const base = this.basicComponent.getHTMLElement() as HTMLSelectElement;
    base.name = name;
    base.append(...this.createOptions(options));
  }

  protected createOptions(options: SelectOptionsArgs | SelectOptionsArgs[]): HTMLOptionElement[] {
    if (options instanceof Array) {
      return options.map((v) => new Option(v.text, v.value, v.defaultSelected, v.selected));
    }
    return [new Option(options.text, options.value, options.defaultSelected, options.selected)];
  }
}
