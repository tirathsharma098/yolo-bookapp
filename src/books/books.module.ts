import { Module } from '@nestjs/common';
import { BookController } from './books.controller';
import { BookService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { bookSchema } from './books.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: bookSchema }])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
