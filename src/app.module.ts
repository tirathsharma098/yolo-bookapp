import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BookModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ValidateUser } from './utils/validateUser';
import { userSchema } from './user/user.model';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    ConfigModule.forRoot(),
    AuthModule,
    BookModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-book'),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUser).forRoutes('books');
  }
}
