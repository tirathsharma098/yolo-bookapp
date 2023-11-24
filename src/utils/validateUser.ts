import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';

@Injectable()
export class ValidateUser implements NestMiddleware {
  constructor(@InjectModel('User') private readonly User: Model<any>) {}
  async use(req: any, res: Response, next: NextFunction) {
    try {
      const userTokenGot = req.headers.authorization;
      if (!userTokenGot)
        return res
          .status(401)
          .json({ message: 'Please Login first', success: false });
      const payloadOfToken = jwt.verify(userTokenGot, process.env.JWTSECRET);
      if (!payloadOfToken?._id)
        return res
          .status(401)
          .json({ message: 'Token is not valid', success: false });
      const foundUser = await this.User.findOne({
        token: userTokenGot,
        _id: payloadOfToken._id,
      });
      if (!foundUser) {
        return res.status(401).json({
          message: 'User Validation Failed, Please login again',
          success: false,
        });
      }
      req.currentUser = {
        _id: foundUser._id,
        username: foundUser.username,
      };
      return next();
    } catch (err) {
      console.log('>> ERROR OCCURRED WHILE VALIDATING USER IN: ', err);
      return res.status(400).json({
        message: 'Something unexpected happened While Validating User',
        success: false,
      });
    }
  }
}
