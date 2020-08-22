import { Question } from '../question/question.model'
export class Test {
    name: string
    questions: Question[]

    constructor(name: string){
        this.name = name
    }

    addQuestion(question: Question): void {
        this.questions.push(question)
    }

    removeQuestion(question: Question): void {
        this.questions.splice(
            this.findQuestionIndex(question.id),
            1
        )
    }

    findQuestionIndex(id: number): number{
        return this.questions.findIndex((p) => p.id == id)
    }

}
