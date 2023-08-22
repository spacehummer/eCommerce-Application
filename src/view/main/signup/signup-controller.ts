import CustomerData from '#src/api/endpoints/types/customer';
import SignUpModel, { SignUpResult } from './signup-model';

export default class SignUpController {
  private readonly model: SignUpModel;

  constructor() {
    this.model = new SignUpModel();
  }

  public async signUp(data: CustomerData): Promise<SignUpResult> {
    return this.model.signUp(data);
  }
}
