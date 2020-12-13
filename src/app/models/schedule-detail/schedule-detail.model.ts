import { Participant } from '../participant/participant.model';

export class ScheduleDetail {
  
    scheduleID: number;

    totalParticipants: number;
    participants: Participant[];
    answerStatus: string;

    constructor(
        scheduleID: number,
        participants: Participant[]
    ) {
        this.scheduleID = scheduleID
        this.participants = participants;
        this.totalParticipants = this.participants.length
        this.answerStatus = 'not file';

    }
}
