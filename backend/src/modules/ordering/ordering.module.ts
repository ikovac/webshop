import { Module } from '@nestjs/common';
import { OrderingController } from './ordering.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrderingService } from './ordering.service';
import Order from './order.entity';
import OrderItem from './order-item.entity';
import { CatalogModule } from 'modules/catalog/catalog.module';
import { CatalogItemIntegrationService } from './catalog-item.integration.service';

@Module({
  controllers: [OrderingController],
  imports: [MikroOrmModule.forFeature([Order, OrderItem]), CatalogModule],
  providers: [OrderingService, CatalogItemIntegrationService],
})
export class OrderingModule {}
