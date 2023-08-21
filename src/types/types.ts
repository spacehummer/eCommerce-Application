/**
 * Type for addEventListener method CB.
 */
export type ListenerCB = (e?: Event) => void;

export type ComponentElementField = HTMLElement | null;

/**
 * Interface for get HTML Element from component.
 */
export interface GetHTMLElement {
  getHTMLElement(): ComponentElementField;
}

/**
 * Interface for pages parameters object.
 */
export interface PageParams {
  name: string;
  callback: () => void;
}
