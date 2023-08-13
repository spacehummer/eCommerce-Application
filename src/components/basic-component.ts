import checkInstance from '#src/utils/utils';
import { ListenerCB, ComponentElementField, GetHTMLElement } from '#src/types/types';

/**
 * Args for component constructor.
 */
export interface BasicComponentConstructorArgs {
  tagName: string;
  classNames: ClassList;
  id?: string | null;
  textContent?: string | null;
  callback?: ListenerCB | null;
  eventType?: string;
}

export type ClassList = string[];

/**
 * Basic component class.
 * @typedef {{
 * tagName: string,
 * classNames: Array<string>,
 * textContent: string,
 * callback: function,
 * }} ElementParams
 */
export class BasicComponent implements GetHTMLElement {
  public htmlElement: ComponentElementField;

  public cssClasses: string[];

  /**
   * @param {ElementParams} params
   */
  constructor(params: BasicComponentConstructorArgs) {
    this.htmlElement = null;
    this.cssClasses = params.classNames;
    this.createElement(params);
  }

  /**
   * Get HTMLElement from component object.
   * @returns {HTMLElement}
   */
  public getHTMLElement(): ComponentElementField {
    return this.htmlElement;
  }

  /**
   * Add inner HTMLElement for component.
   * @param {HTMLElement | BasicComponent} innerElement
   */
  public addInnerElement(innerElement: HTMLElement | GetHTMLElement): void {
    const currentComponentElement = checkInstance(this.htmlElement, HTMLElement);

    if (innerElement instanceof HTMLElement) {
      currentComponentElement.append(innerElement);
    } else {
      currentComponentElement.append(checkInstance(innerElement.getHTMLElement(), HTMLElement));
    }
  }

  /**
   * Create component HTML Element. Add CB and listener for event, when CB is specified.
   * @param {ElementParams} params
   */
  protected createElement(params: BasicComponentConstructorArgs): void {
    this.htmlElement = document.createElement(params.tagName);
    this.setCssClasses(this.cssClasses);
    if (params.id) {
      this.setCssId(params.id);
    }
    if (params.textContent) {
      this.setTextContent(params.textContent);
    }
    if (params.callback) {
      this.setCallback(params.callback, params.eventType);
    }
  }

  /**
   * Add css classes.
   * @param {Array<string>} cssClasses  - list of CSS classes for component HTML Element.
   */
  public setCssClasses(cssClasses: Array<string>): void {
    checkInstance(this.htmlElement, HTMLElement).classList.add(...cssClasses);
  }

  /**
   * Add id to HTML Element.
   * @param {string} id - new id for HTML Element.
   */
  public setCssId(id: string): void {
    checkInstance(this.htmlElement, HTMLElement).setAttribute('id', id);
  }

  /**
   * Add component HTML Element text content.
   * @param {string} text - new text content for component HTML Element.
   */
  public setTextContent(text = ''): void {
    checkInstance(this.htmlElement, HTMLElement).textContent = text;
  }

  /**
   * Set component HTML Element callback.
   * @param {function}  callback  - listener CB.
   * @param {string}    eventType - type of event for listener.
   */
  public setCallback(callback: ListenerCB, eventType: string = 'click'): void {
    if (typeof callback === 'function') {
      checkInstance(this.htmlElement, HTMLElement).addEventListener(eventType, (event) =>
        callback(event)
      );
    }
  }

  /**
   * Set component outer HTML Element attribute.
   * @param {string} name   - A string specifying the name of the attribute
   *                          whose value is to be set.
   * @param {string} value  - A string containing the value to assign to the attribute.
   *                          Any non-string value specified is converted automatically
   *                          into a string.
   */
  public setComponentAttribute(name: string, value: string): void {
    checkInstance(this.htmlElement, HTMLElement).setAttribute(name, value);
  }
}
