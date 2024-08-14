import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from './products.repository';

describe('ProductsRepository', () => {
  let provider: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsRepository],
    }).compile();

    provider = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
