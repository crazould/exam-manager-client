import { Test } from '../test/test.model';
import { Participant } from '../participant/participant.model';

export class Schedule {
  id: number;
  test: Test;
  start_time: Date;
  end_time: Date;

  participants: Participant[];
  totalParticipants: number;
  status: string;

  constructor(
    test: Test,
    start_time: Date,
    end_time: Date,
    participants: Participant[]
  ) {
    this.test = test;
    this.start_time = start_time;
    this.end_time = end_time;
    this.participants = participants;
    this.totalParticipants = this.participants.length
  }

}
