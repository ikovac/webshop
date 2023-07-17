import { Injectable } from '@nestjs/common';
import { CatalogItemService } from './catalog-item.service';
import CatalogItem from './catalog-item.entity';

@Injectable()
export class CatalogItemExternalService {
  constructor(private readonly catalogItemService: CatalogItemService) {}

  get(id: number): Promise<CatalogItem> {
    return this.catalogItemService.get(id);
  }
}
