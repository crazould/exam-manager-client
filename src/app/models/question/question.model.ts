export class Question {
    id: number
    scheduleID: number
    type: string = ""
    options: string[]
    name: string
    rightAnswer: string

    constructor(name: string, type: string) {
        this.name = name
        this.type = type
    }

    public setRightAnswer(rightAnswer:string): void{
        if( this.type === "multiple" ||
            this.type === "trueFalse" ||
            this.type === "choose" ){
                this.rightAnswer = rightAnswer
            }
    }

    public setOptions(options :string[]): void{
        if( this.type === "multiple" ||
        this.type === "choose" ){
            this.options = options
        }
        else if(this.type === "trueFalse" ){
            options = ["true", "false"]
            this.options = options
        }
    }


}
