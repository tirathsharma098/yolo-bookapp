import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private readonly Book: Model<any>) {}

  async getAllBook() {
    try {
      const allBooks = await this.Book.find();
      return {
        message: 'All books got successfully',
        success: true,
        data: { books: allBooks },
      };
    } catch (err) {
      console.log('>> ERROR OCCURRED WHILE FINDING ALL BOOK : ', err);
      return {
        message: 'Book not found',
        success: false,
        data: {},
      };
    }
  }

  async addBook(title: string, author: string, summary: string) {
    try {
      const newBook = new this.Book({ title, author, summary });
      await newBook.save();
      return {
        message: 'Book saved successfully',
        success: true,
        data: {},
      };
    } catch (err) {
      console.log('>> ERROR OCCURRED WHILE ADDING BOOK : ', err);
      return {
        message: 'Book not found',
        success: false,
        data: {},
      };
    }
  }

  async getBookById(id: string) {
    try {
      const bookGot = await this.Book.findById(id);
      return {
        message: 'Book got successfully',
        success: true,
        data: { book: bookGot },
      };
    } catch (err) {
      console.log('>> ERROR OCCURRED WHILE GETTING BOOK BY ID : ', err);
      return {
        message: 'Book not found',
        success: false,
        data: {},
      };
    }
  }

  async updateBookById(
    id: string,
    title: string,
    author: string,
    summary: string,
  ) {
    try {
      const bookUpdate = await this.Book.findByIdAndUpdate(id, {
        title,
        author,
        summary,
      });
      await bookUpdate.save();
      return {
        message: 'Book updated successfully',
        success: true,
        data: {},
      };
    } catch (err) {
      console.log('>> ERROR OCCURRED WHILE UPDATING BOOK : ', err);
      return {
        message: 'Book not found',
        success: false,
        data: {},
      };
    }
  }

  async deleteBookById(id: string) {
    try {
      const message = await this.Book.findByIdAndDelete(id);
      return {
        message: message?.title
          ? 'Book deleted successfully'
          : 'Book not found',
        success: true,
        data: {},
      };
    } catch (err) {
      console.log('>> ERROR OCCURRED WHILE DELETING BOOK : ', err);
      return {
        message: 'Book not found',
        success: false,
        data: {},
      };
    }
  }
}
