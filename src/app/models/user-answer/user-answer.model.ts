export class UserAnswer {
    userID: number;
    questionID: number;
    answer: string;

    constructor(userID, questionID, answer){
        this.userID = userID;
        this.questionID = questionID;
        this.answer = answer;
    }


}

