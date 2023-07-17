import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'shared/auth.guard';
import {
  CatalogItemNotFoundException,
  CatalogItemService,
} from './catalog-item.service';

@Controller('catalog')
@UseGuards(AuthGuard)
export class CatalogController {
  constructor(private catalogItemService: CatalogItemService) {}

  @Get()
  async getAll() {
    const data = await this.catalogItemService.getAll();
    return { data };
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.catalogItemService
      .get(id)
      .then((data) => ({ data }))
      .catch((err) => {
        if (err instanceof CatalogItemNotFoundException) {
          throw new NotFoundException(err.message);
        }
        throw err;
      });
  }
}
