import { Injectable } from '@nestjs/common';
import { CatalogItemExternalService } from 'modules/catalog/catalog-item.external.service';
import { pick } from 'radash';

export type GetCatalogItemResponse = {
  id: number;
  price: number;
};

@Injectable()
export class CatalogItemIntegrationService {
  constructor(
    private readonly catalogItemExternalService: CatalogItemExternalService,
  ) {}

  async get(id: number): Promise<GetCatalogItemResponse> {
    const catalogItem = await this.catalogItemExternalService.get(id);
    return pick(catalogItem, ['id', 'price']);
  }
}
