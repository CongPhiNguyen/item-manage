// src/items/items.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from '@prisma/client';
import { ItemDto, ItemQuery } from './dto/item.dto';
import { PaginationResult } from 'src/types';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createItemDto: ItemDto): Promise<Partial<Item>> {
    return await this.itemService.create(createItemDto);
  }

  @Get()
  async listItem(@Query() query: ItemQuery): Promise<PaginationResult<Item>> {
    const listItem: PaginationResult<Item> = await this.itemService.list(query.page, query.size);
    return listItem
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item | null> {
    return await this.itemService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: ItemDto,
  ): Promise<boolean> {
    return await this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.itemService.remove(id);
  }
}
