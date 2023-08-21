import Validator from '#src/utils/validator';
import LoginModel from './login-model';

export default class LoginController {
  private readonly model = new LoginModel();

  public async login(email: string, password: string): Promise<string> {
    let errMsg: string = '';
    if (!Validator.email(email)) {
      errMsg += Validator.emailMsg;
    }
    if (!Validator.password(password)) {
      errMsg += Validator.passwordMsg;
    }
    if (errMsg) return errMsg;
    return this.model.login(email, password);
  }
}
