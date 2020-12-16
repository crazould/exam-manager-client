import { QuestionOption } from "../question-option/question-option.model"

export class Question {
    id: number
    scheduleID: number
    type: string = ""
    name: string
    rightAnswer: string
    options: QuestionOption[] = [];

    constructor(name: string, type: string) {
        this.name = name
        this.type = type
    }

    public setRightAnswer(rightAnswer:string): void{
        if( this.type === "multiple" ||
            this.type === "true false" ||
            this.type === "choose" ){
                this.rightAnswer = rightAnswer
            }
    }
    


}
