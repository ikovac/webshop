import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderingService, ProductNotFoundException } from './ordering.service';
import { Request } from 'express';
import { AuthGuard } from 'shared/auth.guard';
import { CreateOrderDTO } from './ordering.dto';
import { OrderEmptyException } from './order.entity';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderingController {
  constructor(private readonly orderingService: OrderingService) {}

  @Get(':id')
  async getOrder(@Param('id', ParseIntPipe) id: number) {
    const data = await this.orderingService.getOrder(id);
    return { data };
  }

  @Post()
  createOrder(@Req() req: Request, @Body() body: CreateOrderDTO) {
    return this.orderingService
      .createOrder(req.userId, body.items)
      .then((data) => ({ data }))
      .catch((err) => {
        if (
          err instanceof ProductNotFoundException ||
          err instanceof OrderEmptyException
        ) {
          throw new BadRequestException(err.message);
        }
        throw err;
      });
  }
}
