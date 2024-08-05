import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { EventHandlerController } from 'src/events/event-handler.controller';
import { EventHandlerService } from 'src/events/event-handler.service';
import { RawBodyMiddleware } from 'src/middleware/raw-body.middleware';

@Module({
  imports: [EventEmitterModule.forRoot(), DrizzleModule],
  controllers: [EventHandlerController],
  providers: [EventHandlerService],
})
export class EventHandlerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({ path: 'api/webhook', method: RequestMethod.POST });
  }
}
