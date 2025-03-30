// src/items/items.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'; // Adjust the import based on your structure
import { PrismaClient, Item } from '@prisma/client';
import { PaginationResult } from 'src/types';
import { ItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
  private prisma = new PrismaClient();
  constructor() { }

  async create(data: ItemDto): Promise<Item> {
    try {
      const item: Item = await this.prisma.item.create({
        data,
      });
      if (!item?.id) {
        throw new Error('Create item failed');
      }
      return item;
    } catch (error) {
      throw new Error(`Failed to create item: ${error.message}`);
    }
  }

  async list(page: number, size: number): Promise<PaginationResult<Item>> {
    const skip = (page - 1) * size;
    const result: Item[] = await this.prisma.item.findMany({
      where: { isDelete: false },
      skip,
      take: size,
    });
    const total = await this.prisma.item.count();
    return {
      data: result,
      page,
      size,
      total,
    };
  }

  async findOne(id: string): Promise<Item> {
    const item: Item | null = await this.prisma.item.findUnique({
      where: { id, isDelete: false },
    });
    if (item?.id) {
      return item;
    } else {
      throw new NotFoundException('Item not found or error occured');
    }
  }

  async update(id: string, data: ItemDto): Promise<boolean> {
    const updateRes = await this.prisma.item.updateMany({
      where: { id, isDelete: false },
      data,
    });
    if (updateRes.count > 0) {
      return true
    } else {
      throw new NotFoundException('Item not found or error occurred');
    }
  }

  async remove(id: string): Promise<boolean> {
    const deleteRes = await this.prisma.item.updateMany({
      where: { id },
      data: { isDelete: true },
    });

    if (deleteRes.count > 0) {
      return true;
    } else {
      throw new NotFoundException('Item not found or error occurred');
    }
  }
}
