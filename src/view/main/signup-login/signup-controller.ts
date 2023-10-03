import CustomerData from '#src/api/endpoints/types/customer';
import { ApiRequestResult } from './components/types';
import SignUpModel from './signup-model';

export default class SignUpController {
  private readonly model: SignUpModel;

  constructor() {
    this.model = new SignUpModel();
  }

  public async signUp(data: CustomerData): Promise<ApiRequestResult> {
    return this.model.signUp(data);
  }
}
