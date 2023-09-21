import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';

export type LabelArgs = {
  textContent: string;
  htmlFor?: string;
  classList?: string[];
};

export default class LabelFactory {
  public static default({ textContent, classList }: LabelArgs): HTMLLabelElement {
    const label = document.createElement(TagsEnum.LABEL);
    label.classList.add(ClassesEnum.INPUT_LABEL);
    if (classList) label.classList.add(...classList);
    label.textContent = textContent;
    return label;
  }
}
