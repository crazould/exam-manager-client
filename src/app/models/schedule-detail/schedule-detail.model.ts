import { Participant } from '../participant/participant.model';

export class ScheduleDetail {
  
    scheduleID: number;

    totalParticipants: number;
    participants: Participant[];

    constructor(
        scheduleID: number,
        participants: Participant[]
    ) {
        this.scheduleID = scheduleID
        this.participants = participants;
        this.totalParticipants = this.participants.length
    }
}
