export class ScheduleHeader {

    id: number;
    testName: string;
    startTime: string;
    endTime: string;
    totalParticipants: number;

    constructor(
      testName: string,
      startTime: string,
      endTime: string
    ) {
      this.testName = testName;
      this.startTime = startTime;
      this.endTime = endTime;
    }

}
