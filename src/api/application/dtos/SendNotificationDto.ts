import { NotificationChannels } from '@/api/domain/entities/NotificationChannels';
import { NotificationDecisions } from '@/api/domain/entities/NotificationDecisions';
import { Id } from '@/shared/entities/Id';

export class SendNotificationDto {
  private readonly decision = NotificationDecisions.SEND;
  private readonly status = 202;

  constructor(
    private channels: NotificationChannels[],
    private eventId: Id,
    private userId: Id,
  ) {}

  getPayload() {
    return {
      channels: this.channels,
      decision: this.decision,
      eventId: this.eventId.toString(),
      userId: this.userId.toString(),
    };
  }

  getStatus() {
    return this.status;
  }
}
