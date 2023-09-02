import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import View from '#src/view/view';

export default class FieldSet extends View {
  protected readonly legend: HTMLLegendElement;

  private get fieldset(): HTMLFieldSetElement {
    return this.getHTMLElement() as HTMLFieldSetElement;
  }

  public get elements(): HTMLFormControlsCollection {
    return this.fieldset.elements;
  }

  constructor(name: string, label: string, fields: View[]) {
    super({
      tagName: TagsEnum.FIELD_SET,
      classNames: ClassesEnum.FORM_FIELD_CONTAINER,
    });

    this.fieldset.name = name;
    this.legend = document.createElement('legend');
    this.legend.append(label);
    this.legend.style.display = 'inline';

    this.basicComponent.addInnerElement(this.legend);

    this.createFields(fields);
  }

  protected createFields(fields: View[]): void {
    fields.forEach((field) => this.basicComponent.addInnerElement(field));
  }

  private applyFn(
    fn: (item: Element, name: string, val: string) => void,
    qualifiedName: string,
    value: string
  ): void {
    for (let i = 0; i < this.elements.length; i += 1) {
      const item = this.elements.item(i);
      if (item) {
        fn(item, qualifiedName, value);
      }
    }
  }

  public setAttrForAllItems(qualifiedName: string, value: string): void {
    const fn = (item: Element, name: string, val: string): void => item.setAttribute(name, val);
    this.applyFn(fn, qualifiedName, value);
  }

  public removeAttrForAllItems(qualifiedName: string): void {
    const fn = (item: Element, name: string): void => item.removeAttribute(name);
    this.applyFn(fn, qualifiedName, '');
  }
}
