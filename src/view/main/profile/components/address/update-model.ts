import { AddressDto } from '#src/api/endpoints/types/customer';
import BaseModel from '../base-model';

export default class UpdateModel extends BaseModel {
  protected async apiPromiseChain(data: unknown): Promise<void> {
    const dto = data as AddressDto;
    await this.api.updateAddress(dto).then(this.updateProfile);
  }
}
