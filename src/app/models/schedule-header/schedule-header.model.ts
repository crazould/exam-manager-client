export class ScheduleHeader {

    id: number;
    testName: string;
    startTime: string;
    endTime: string;
    totalParticipants: number;
    answerStatus: string;

    constructor(
      testName: string,
      startTime: string,
      endTime: string
    ) {
      this.testName = testName;
      this.startTime = startTime;
      this.endTime = endTime;
      this.answerStatus = 'not done';
    }

}
