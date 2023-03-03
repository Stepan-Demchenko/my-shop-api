import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/data-base/data-base.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { BrandsModule } from './modules/brands/brands.module';

@Module({
  imports: [DatabaseModule, CategoriesModule, ProductsModule, BrandsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
