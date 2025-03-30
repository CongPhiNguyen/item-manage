import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { ItemDto } from './dto/item.dto';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('add', () => {
    it('should add a new item and return it', async () => {
      const newItem: ItemDto = {
        name: 'Bánh mì',
        type: 'Thực phẩm',
        category: 'Đồ ăn nhanh',
        price: 15.0,
        description: 'Bánh mì tươi ngon, đầy đủ nhân.',
        imageUrl: 'https://example.com/images/banhmi.jpg',
        stock: 100,
      };

      const result: any = await service.create(newItem);
      delete result.createdAt;
      delete result.updatedAt;
      delete result.id;

      expect(result).toEqual(newItem);
    });

    it('should not add an item with invalid data', async () => {
      const invalidItem: any = {
        type: 'Thực phẩm',
        category: 'Đồ ăn nhanh',
        price: -10.0, // Invalid price
        description: '',
        imageUrl: 'invalid-url', // Invalid URL
        stock: -5, // Invalid stock
      };

      await expect(service.create(invalidItem)).rejects.toThrow();
    });
  });
});
