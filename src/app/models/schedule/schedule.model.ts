import { Participant } from '../participant/participant.model';

export class Schedule {
  
  id: number;
  testName: string;
  startTime: string;
  endTime: string;

  participants: Participant[];
  totalParticipants: number;
  answerStatus: string[];

  constructor(
    testName: string,
    startTime: string,
    endTime: string,
    participants: Participant[]
  ) {
    this.testName = testName;
    this.startTime = startTime;
    this.endTime = endTime;
    this.participants = participants;
    this.totalParticipants = this.participants.length
  }

}
