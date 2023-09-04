import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

export default class EditButton extends View {
  constructor(onclickCallback: () => void) {
    super({
      tagName: TagsEnum.BUTTON,
      classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
    });

    const btn = this.getHTMLElement();
    if (btn) {
      btn.textContent = 'Edit';
      btn.onclick = onclickCallback;
    }
  }
}
