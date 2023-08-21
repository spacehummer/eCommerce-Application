import Api from '#src/api/api';
import ApiError from '#src/api/utils/apiError';

export default class LoginModel {
  private readonly api = new Api();

  public async login(username: string, password: string): Promise<string> {
    try {
      await this.api.login({ username, password });
      return '';
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.data && error.data.body.statusCode) {
          if (error.data.body.statusCode === 400) {
            return 'Incorrect email or password!';
          }
          return error.message;
        }
        return 'Network Error. Check network connection.';
      }
      throw error;
    }
  }
}
