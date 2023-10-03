type CategoryId = Readonly<{
  id: string;
}>;

export type LocaleString = Readonly<{
  [index: string]: string;
}>;

type CategoryBody = Readonly<{
  key?: string;
  name: LocaleString;
  description?: LocaleString;
  slug: LocaleString;
  parent?: CategoryId;
  ancestors?: CategoryId[];
}>;

type CategoryHierarchy = Readonly<{
  childrens: Category[];
}>;

export type Category = CategoryId & CategoryBody & CategoryHierarchy;
