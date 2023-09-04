import { PersonalesDto } from '#src/api/endpoints/types/customer';
import BaseModel from '../base-model';

export default class PersonalesModel extends BaseModel {
  protected async apiPromiseChain(data: unknown): Promise<void> {
    const dto = data as PersonalesDto;
    await this.api.updatePersonales(dto).then(this.updateProfile);
  }
}
