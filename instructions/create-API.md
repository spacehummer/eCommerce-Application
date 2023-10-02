# Instruction "How to create API client"

## Create a new Project

After succes registration on `Commerce Tools` go [Merchant Center](https://mc.europe-west1.gcp.commercetools.com/) to section [Manage projects](https://mc.europe-west1.gcp.commercetools.com/account/projects) to create a new project
![](./assets/screenshots/manage-projects/screen.png)

## Project Settings

After creating a new project in `Commerce Tools` go `Project settings` to tab page `International` ![](./assets/screenshots/project-settings/international.png)
Set:
 - languages: `en`, `ru`;
 - countries: `ru`;
 - currencies: `RUB`;

Go tab page `Storefront search` and toggle `Indexing` to `active` ![](./assets/screenshots/project-settings/enable-product-projections.png)

## Create Tax

At the moment there no `command` to save all project objects. You need to create a `Tax category` to correct work of add to basket.

Go tab page `Taxes` on `Project settings`
![](./assets/screenshots/project-settings/create-tax.png)

## Create API Client
>**NOTE:**
>After creating the Api-Client save client credentionals as `.env` file and replace values `CTP_PROJECT_KEY`, `CTP_CLIENT_SECRET`, `CTP_CLIENT_ID` in enum `APICredentials`

https://github.com/spacehummer/eCommerce-Application/blob/c8b469784d48e68104d71624dca68503c1aa7965/src/api/utils/apiCredencials.ts#L1-L4

>by new values from `.env` file.

Go `Developer settings` and create `API client` using presets for `Mobile&SPA` ![](./assets/screenshots/developer-settings/create-Api.png)

## Commands sequence

> **NOTE:** fill in all fields as indicated in all screenshots.

After configure project settings go [ImpEx (A GUI application to run command-line processes)](https://impex.europe-west1.gcp.commercetools.com/) to run commands
![](./assets/screenshots/impEx-commands/screen.png)

**Select command:**
 - `Category importer`. file to upload [exported-categories_en_slug.csv](./assets/data-files/category/exported-categories_en_slug.csv)
 ![](./assets/screenshots/commands/category/category-import.png)

 - `Product type import`. Files to upload `product types`: [products-to-attributes.csv](./assets/data-files/product-types/products-to-attributes.csv); `attributes`: [attributes.csv](./assets/data-files/product-types/attributes.csv)
 ![](./assets/screenshots/commands/product-type/product-type-import.png)

 - `Product importer`. Files to upload (one per `product-type`): [Accessories.csv](./assets/data-files/product/Accessories.csv), [Hardcover-book.csv](./assets/data-files/product/Hardcover-book.csv), [Magazine-newspaper.csv](./assets/data-files/product/Magazine-newspaper.csv)
 ![](./assets/screenshots/commands/product/product-import.png)

 ## Publich products 

Go to `Products list` in `Merchant Center`
![](./assets/screenshots/publish-products/publish-products.png)

## Create a discount code for basket
> **NOTE:** don't forget to toogle `active` when create new discounts
1) Go discounts to create a discount code:
![](./assets/screenshots/add-discount/select-add-discount.png)
2) Create a discount:
![](./assets/screenshots/add-discount/discounts_carts_general.png)
3) Add a code:
![](./assets/screenshots/add-discount/discount_code_rsschool.png)