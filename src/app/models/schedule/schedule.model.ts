import { Test } from '../test/test.model'
import { Participant } from '../participant/participant.model'

export class Schedule {

    id: number
    test: Test
    startTime: string
    endTime: string

    participants: Participant[]
    status: string

    constructor(test: Test, startTime: string, endTime: string) {
        this.test = test
        this.startTime = startTime
        this.endTime = endTime
    }

    

}
