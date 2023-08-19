import LoginModel from './login-model';

export default class LoginController {
  private readonly model = new LoginModel();

  public async login(email: string, password: string): Promise<string> {
    return this.model.login(email, password);
  }
}
