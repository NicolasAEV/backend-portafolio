import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SchedulerHealth {
  @Cron(CronExpression.EVERY_HOUR)
  handleHealthCheck() {
    console.log('health: ejecutado para mantener más encendido el servidor gratuito de Render');
  }
}