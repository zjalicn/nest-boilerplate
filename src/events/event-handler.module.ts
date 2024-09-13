import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { EventHandlerController } from 'src/events/event-handler.controller';
import { EventHandlerService } from 'src/events/event-handler.service';

@Module({
  imports: [EventEmitterModule.forRoot(), DrizzleModule],
  controllers: [EventHandlerController],
  providers: [EventHandlerService],
})
export class EventHandlerModule {}
