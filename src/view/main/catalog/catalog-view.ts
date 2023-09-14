import { BasicComponentConstructorArgs } from "#src/components/basic-component";
import ClassesEnum from "#src/components_params/classes-enum";
import TagsEnum from "#src/components_params/tags-enum";
import View, { ViewLogicParams } from "#src/view/view";

const args: BasicComponentConstructorArgs = {
    classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
    tagName: TagsEnum.SECTION
}

export default class Catalog extends View {
    constructor(logicParams: ViewLogicParams) {
        super(args, logicParams)
    }
}