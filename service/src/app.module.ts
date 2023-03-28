import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { auth, error, logger } from './middleware';
import { AppModule as BaseAppModule } from './modules/app';
import { ChatgptModule } from './modules/chatgpt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
      load: [configuration],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,  //1分钟
      limit: 10, //请求10次
    }),
    ...(process.env.DB_OPEN === 'true'
      ? [
          TypeOrmModule.forRoot({
            type: process.env.DB_TYPE as any,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [],
            synchronize: true,
            toRetry: (err) => {
              console.log('toRetry', err);
              return true;
            },
          }),
        ]
      : []),
    BaseAppModule,
    ChatgptModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger);
    consumer.apply(auth);
    consumer.apply(error);
    // .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
