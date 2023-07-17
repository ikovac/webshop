import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import CatalogItem from './catalog-item.entity';

export class CatalogItemNotFoundException extends Error {
  constructor() {
    super('Catalog Item is not found');
    this.name = this.constructor.name;
  }
}

@Injectable()
export class CatalogItemService {
  constructor(
    @InjectRepository(CatalogItem)
    private readonly catalogItemRepository: EntityRepository<CatalogItem>,
  ) {}

  getAll(): Promise<CatalogItem[]> {
    return this.catalogItemRepository.findAll();
  }

  async get(id: number): Promise<CatalogItem> {
    const catalogItem = await this.catalogItemRepository.findOne(id);
    if (!catalogItem) throw new CatalogItemNotFoundException();
    return catalogItem;
  }
}
