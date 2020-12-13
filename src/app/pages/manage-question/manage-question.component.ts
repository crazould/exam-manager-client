import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ScheduleHeader } from 'src/app/models/schedule-header/schedule-header.model';
import { ScheduleHeaderService } from 'src/app/services/schedule-header/schedule-header.service';
import { QuestionService } from 'src/app/services/question/question.service';
import { QuestionOptionService } from 'src/app/services/question-option/question-option.service';
import { Question } from 'src/app/models/question/question.model'
import { QuestionOption } from 'src/app/models/question-option/question-option.model'


@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.sass']
})
export class ManageQuestionComponent implements OnInit {


  scheduleHeaders: ScheduleHeader[] = [];
  questions: Question[] = [];

  selectedHeader: ScheduleHeader;
  selectedQuestions: Question[] = [];

  newQuestion: Question;
  newQuestionOptions: QuestionOption;

  editQuestion: Question  = new Question("","");

  multipleOptions: string[] = [];
  multipleRightAnswer: string;

  trueFalseRightAnswer: string;

  chooseOptions: string[] = [];
  chooseRightAnswer: string = 'true';

  constructor(
    private titleService: Title,
    private scheduleHeaderService: ScheduleHeaderService,
    private questionService: QuestionService,
    private questionOptionService: QuestionOptionService
  ) { 
    this.setTitle("Manage Question")
  }

  ngOnInit(): void {
    this.getSchedules();
    this.newQuestion = new Question("", "");
  }

  setTitle(pageTitle: string): void {
    this.titleService.setTitle(pageTitle)
  }

  getSchedules(): void {

    this.scheduleHeaderService.getScheduleHeaders().subscribe((scheduleHeaders) => {
        this.scheduleHeaders = scheduleHeaders;
        this.getQuestions();
        // console.log(this.scheduleHeaders)
    });
  }

  getQuestions(): void{
    this.questionService.getQuestions().subscribe((qs) => {
      this.questions = qs
      if(this.scheduleHeaders.length != 0){
        this.selectScheduleHeader(this.scheduleHeaders[0]);
      }
    })
  }

  selectScheduleHeader(header: ScheduleHeader): void{
    this.selectedHeader = header;
    this.newQuestion.scheduleID = header.id;
    this.selectedQuestions = this.questions.filter(q => q.scheduleID == header.id)
    // console.log(this.selectedQuestions)
  }

  setTrueFalseRightAnswer(trueAnswer, falseAnswer): void{
    if(trueAnswer) this.trueFalseRightAnswer = "true";
    else if(falseAnswer) this.trueFalseRightAnswer = "false";
  }

  setQuestionType(multiple,trueFalse,choose,essay,file): void{
    if(multiple.checked){
      this.newQuestion.type = "multiple"
      this.multipleOptions = ["Option A", "Option B", "Option C", "Option D"]
    }
    else if(trueFalse.checked){
      this.newQuestion.type = "true false"
    }
    else if(choose.checked){
      this.newQuestion.type = "choose"
    }
    else if(essay.checked){
      this.newQuestion.type = "essay"
    }
    else if(file.checked){
      this.newQuestion.type = "file"
    }
  }

  addQuestion(): void {
    
    if(this.newQuestion.name == ""){
      alert("Please fill the question!")
      return;
    }

    switch(this.newQuestion.type){
      case "multiple":

        if(this.multipleRightAnswer == undefined)
          this.multipleRightAnswer = this.multipleOptions[0]
        
        this.newQuestion.rightAnswer = this.multipleRightAnswer;
        // console.log(this.newQuestion)
        this.questionService.addQuestion(this.newQuestion).subscribe((question)=>{
          // console.log(question)
          this.questions.push(question)
          this.newQuestionOptions = new QuestionOption(
            question.id,
            this.multipleOptions
          )
          this.questionOptionService.addQuestionOptions(this.newQuestionOptions).subscribe((questionOptions) =>{
            // console.log(questionOptions)
            this.selectScheduleHeader(this.selectedHeader)

          })
        })
        break;

      case "true false":
      
        this.newQuestion.rightAnswer = this.trueFalseRightAnswer;
        this.questionService.addQuestion(this.newQuestion).subscribe((question)=>{
          // console.log(question)
          this.questions.push(question)
          this.selectScheduleHeader(this.selectedHeader)
         
        })
        break;

      case "choose":

        if(this.chooseRightAnswer == undefined) {
          this.chooseRightAnswer = this.chooseOptions[0]
        }

        this.newQuestion.rightAnswer = this.chooseRightAnswer;
        // console.log(this.newQuestion)
        this.questionService.addQuestion(this.newQuestion).subscribe((question)=>{
          // console.log(question)
          this.questions.push(question)
          this.newQuestionOptions = new QuestionOption(
            question.id,
            this.chooseOptions
          )
          this.questionOptionService.addQuestionOptions(this.newQuestionOptions).subscribe((questionOptions) =>{
            // console.log(questionOptions)
            this.selectScheduleHeader(this.selectedHeader)

          })
        })
        break;

      case "essay":
        this.questionService.addQuestion(this.newQuestion).subscribe((question)=>{
          // console.log(question)
          this.questions.push(question)
          this.selectScheduleHeader(this.selectedHeader)

        })
        break;

      case "file":
        this.questionService.addQuestion(this.newQuestion).subscribe((question)=>{
          // console.log(question)
          this.questions.push(question)
          this.selectScheduleHeader(this.selectedHeader)

        })
        break;
    }

    this.newQuestion = new Question("", "")
  }

  saveQuestion(id: number, questionName: string): void {
    console.log(id)
    console.log(this.editQuestion.name)
    let index = this.questions.findIndex(e => e.id == id)
    this.questionService.updateQuestion(id, this.editQuestion).subscribe((q) => {
      this.questions.splice(index, 1, q)
      this.selectScheduleHeader(this.selectedHeader)
    })
  }

  deleteQuestion(id: number): void {
    let index = this.questions.findIndex(q => q.id == id)

    this.questionService.deleteQuestion(id).subscribe(() => {
      this.questions.splice(index, 1)
      this.selectScheduleHeader(this.selectedHeader)
    })

  }


}
