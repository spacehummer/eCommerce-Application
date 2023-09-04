import { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ChangePasswordDto } from '#src/api/endpoints/types/customer';
import { setProfile } from '#src/logic/state/state';
import BaseModel from '../base-model';

export default class PasswordModel extends BaseModel {
  protected async apiPromiseChain(data: unknown): Promise<void> {
    const dto = data as ChangePasswordDto;
    await this.api
      .changePassword(dto)
      .then((val: ClientResponse<Customer>) =>
        this.api.login({ username: val.body.email, password: dto.newPassword })
      )
      .then((val: ClientResponse<CustomerSignInResult>) => {
        setProfile(val.body.customer);
        return val;
      });
  }
}
