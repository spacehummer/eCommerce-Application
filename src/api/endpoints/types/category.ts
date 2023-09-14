type CategoryId = Readonly<{
  id: string;
}>;

export type LocaleString = Readonly<{
  en: string;
  ru: string;
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
  childrens: CategoryDto[];
}>;

export type CategoryDto = CategoryId & CategoryBody & CategoryHierarchy;
