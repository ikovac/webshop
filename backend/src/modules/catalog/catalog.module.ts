import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import CatalogItem from './catalog-item.entity';
import { CatalogItemService } from './catalog-item.service';
import { CatalogController } from './catalog.controller';
import { CatalogItemExternalService } from './catalog-item.external.service';

@Module({
  controllers: [CatalogController],
  imports: [MikroOrmModule.forFeature([CatalogItem])],
  providers: [CatalogItemService, CatalogItemExternalService],
  exports: [CatalogItemExternalService],
})
export class CatalogModule {}
