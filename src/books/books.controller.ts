import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './books.service';

@Controller('books')
export class BookController {
  constructor(readonly bookService: BookService) {}

  @Get('get-all')
  async getAllBook() {
    return await this.bookService.getAllBook();
  }

  @Post('add')
  async addBook(
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('summary') summary: string,
  ) {
    return await this.bookService.addBook(title, author, summary);
  }

  @Get('by-id/:id')
  async getBookById(@Param('id') id: string) {
    return await this.bookService.getBookById(id);
  }

  @Put('by-id/:id')
  async updateBookById(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('summary') summary: string,
  ) {
    return await this.bookService.updateBookById(id, title, author, summary);
  }

  @Delete('by-id/:id')
  async deleteById(@Param('id') id: string) {
    return await this.bookService.deleteBookById(id);
  }
}
