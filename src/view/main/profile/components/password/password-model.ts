import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { ChangePasswordDto } from '#src/api/endpoints/types/customer';
import BaseModel from '../base-model';

export default class PasswordModel extends BaseModel {
  protected async apiPromiseChain(data: unknown): Promise<void> {
    const dto = data as ChangePasswordDto;
    await this.api
      .changePassword(dto)
      .then((val: ClientResponse<Customer>) =>
        this.api.login({ username: val.body.email, password: dto.newPassword })
      )
      .then(this.signInProfile);
  }
}
