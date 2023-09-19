import { BasicComponent } from '#src/components/basic-component';
import ClassesEnum from '#src/components_params/classes-enum';
import TagsEnum from '#src/components_params/tags-enum';
import FormComponent from '../../signup-login/components/form';
import InputField from '../../signup-login/components/input-field';
import { ErrorCollection } from '../../signup-login/components/types';
import InputFactory from '../../signup-login/components/utils/inputFactory';

export enum PromoCodeFields {
  PromoCode = 'promoCode',
}

export default class AddPromoCodeForm extends FormComponent {
  constructor(callback: (record: Record<string, string | Record<string, string>>) => void) {
    super(callback, Object.values(PromoCodeFields), ClassesEnum.ONLY_FOR_DRAFT_CODE);

    const availableCodes = new BasicComponent({
      tagName: TagsEnum.PARAGRAPH,
      classNames: ClassesEnum.ONLY_FOR_DRAFT_CODE,
    });
    availableCodes.setTextContent('Awailable codes are: "RSSchool".');

    const promoCode = new InputField({
      label: 'Promo code',
      name: PromoCodeFields.PromoCode,
      type: 'text',
    });

    const submit = InputFactory.default({
      type: 'submit',
      value: 'Apply promo code',
      classList: [ClassesEnum.ONLY_FOR_DRAFT_CODE],
    });

    this.basicComponent.addInnerElement(availableCodes);
    this.basicComponent.addInnerElement(promoCode);
    this.basicComponent.addInnerElement(submit);
  }

  protected onSucces(): void {
    this.okMsg.hide();
  }

  public showSubmitResults(successMsg: string, errors?: ErrorCollection): void {
    if (!(errors && errors.errorMsg)) {
      setTimeout(() => {
        this.onSucces();
      }, 1500);
    } else {
      setTimeout(() => {
        this.errorMsg.hide();
      }, 20000);
    }
    super.showSubmitResults(successMsg, errors);
  }
}
