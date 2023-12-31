import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

export default class EditButton extends View {
  constructor(onclickCallback: () => void, btnText: string = 'Edit') {
    super({
      tagName: TagsEnum.BUTTON,
      classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
    });

    this.basicComponent.setComponentAttribute('type', 'button');

    const btn = this.getHTMLElement();
    if (btn) {
      btn.textContent = btnText;
      btn.onclick = onclickCallback;
    }
  }
}
