import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
// import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AppModule as BaseAppModule } from './modules/app';
import { ChatgptModule } from './modules/chatgpt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
      load: [configuration],
    }),
    BaseAppModule,
    ChatgptModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware);
    // .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
