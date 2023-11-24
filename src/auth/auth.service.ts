import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly User: Model<any>) {}
  async signUpUser(
    first_name: string,
    last_name: string,
    username: string,
    password: string,
  ) {
    try {
      const encryptPassword: string = await bcrypt.hash(password, 12);
      const newUser = new this.User({
        first_name,
        last_name,
        username,
        password: encryptPassword,
      });
      await newUser.save();
      return {
        message: 'Sign up successfully, please login to continue',
        success: true,
      };
    } catch (err) {
      console.log('>> ERROR OCCURRED WHILE sign up user : ', err);
      return { message: 'Username should be unique', success: false };
    }
  }

  async loginUser(username: string, password: string) {
    try {
      const foundUser = await this.User.findOne({ username });
      if (!foundUser)
        return { message: 'Username or Password is incorrect', success: false };
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch)
        return { message: 'Username or Password is incorrect', success: false };
      const token = jwt.sign({ _id: foundUser._id }, process.env.JWTSECRET);
      const updatedUser = await this.User.findByIdAndUpdate(foundUser._id, {
        token,
      });
      await updatedUser.save();
      return {
        data: { token: token },
        message: 'LogIn successfully',
        success: false,
      };
    } catch (err) {
      console.log('>> ERROR OCCURRED WHILE login user : ', err);
      return { message: 'Username or Password is incorrect', success: false };
    }
  }
}
