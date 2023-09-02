import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { PersonalesDto } from '#src/api/endpoints/types/customer';
import { setProfile } from '#src/logic/state/state';
import BaseModel from './base-model';

export default class PersonalesModel extends BaseModel {
  protected async apiPromiseChain(data: unknown): Promise<void> {
    const dto = data as PersonalesDto;
    this.api.updatePersonales(dto).then((val: ClientResponse<Customer>) => {
      setProfile(val.body);
    });
  }
}
