export class ScheduleHeader {

    id: number;
    testName: string;
    testType: string;
    startTime: string;
    endTime: string;
    totalParticipants: number;
    isForbiden: boolean = false;

    constructor(
      testName: string,
      testType: string,
      startTime: string,
      endTime: string
    ) {
      
      this.testName = testName;
      this.testType = testType;
      this.startTime = startTime;
      this.endTime = endTime;
    }

}
