import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SchedulerHealth {
  private readonly logger = new Logger(SchedulerHealth.name);

  @Cron(CronExpression.EVERY_HOUR)
  handleHealthCheck() {
    this.logger.log('health: ejecutado para mantener más encendido el servidor gratuito de Render');
  }
}