import { ErrorBodyCollection } from '#src/api/endpoints/types/error';
import Validator from '#src/utils/validator';
import { LoginFieldNames } from './components/login-form';
import { ApiRequestResult } from './components/types';
import LoginModel from './login-model';

export default class LoginController {
  private readonly model = new LoginModel();

  public async login(email: string, password: string): Promise<ApiRequestResult> {
    const errMsg: ErrorBodyCollection[] = [];
    if (!Validator.email(email)) {
      errMsg.push({
        code: '-1',
        message: Validator.emailMsg,
        field: LoginFieldNames.Email,
      });
    }
    if (!Validator.password(password)) {
      errMsg.push({
        code: '-1',
        message: Validator.passwordMsg,
        field: LoginFieldNames.Password,
      });
    }
    if (errMsg.length > 0) {
      return {
        isSuccessful: false,
        error: errMsg,
        errorMsg: 'Correct the fields according to the error messages!',
      };
    }
    return this.model.login(email, password);
  }
}
