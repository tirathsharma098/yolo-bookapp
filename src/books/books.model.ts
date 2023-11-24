import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const bookSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  author: {
    type: String,
  },
  summary: {
    type: String,
  },
});
