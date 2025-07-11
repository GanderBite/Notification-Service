import { NotificationDecisions } from '@/api/domain/entities/NotificationDecisions';
import { NotificationDenyReasons } from '@/api/domain/entities/NotificationDenyReasons';
import { Id } from '@/shared/entities/Id';

export class DenyNotificationDto {
  private readonly decision = NotificationDecisions.DENY;
  private readonly status = 200;

  constructor(
    private reason: NotificationDenyReasons,
    private eventId: Id,
    private userId: Id,
  ) {}

  getPayload() {
    return {
      decision: this.decision,
      eventId: this.eventId.toString(),
      reason: this.reason,
      userId: this.userId.toString(),
    };
  }

  getReason() {
    return this.reason;
  }

  getStatus() {
    return this.status;
  }
}
