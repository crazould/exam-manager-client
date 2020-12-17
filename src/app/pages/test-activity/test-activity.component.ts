import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Question } from 'src/app/models/question/question.model';
import { QuestionOption } from 'src/app/models/question-option/question-option.model';
import { UserAnswer } from 'src/app/models/user-answer/user-answer.model';
import { ScheduleDetail } from 'src/app/models/schedule-Detail/schedule-Detail.model';
import { ScheduleHeader } from 'src/app/models/schedule-header/schedule-header.model';
import { QuestionService } from 'src/app/services/question/question.service';
import { ScheduleDetailService } from 'src/app/services/schedule-detail/schedule-detail.service';
import { ScheduleHeaderService } from 'src/app/services/schedule-header/schedule-header.service';
import { QuestionOptionService } from 'src/app/services/question-option/question-option.service';
import { UserAnswerService } from 'src/app/services/user-answer/user-answer.service';

@Component({
  selector: 'app-test-activity',
  templateUrl: './test-activity.component.html',
  styleUrls: ['./test-activity.component.sass']
})
export class TestActivityComponent implements OnInit {

  isLoad: boolean = true;

  participantID: number = 3;
  examMode: boolean = false;
  
  scheduleHeaders: ScheduleHeader[] = [];
  selectedHeader: ScheduleHeader;

  filteredHeaders: ScheduleHeader[] = [];

  scheduleDetails: ScheduleDetail[] = [];
  filteredDetails: ScheduleDetail[] = [];
  selectedDetail: ScheduleDetail;

  questions: Question[] = [];
  filteredQuestions: Question[] = [];

  options: QuestionOption[] = [];
  filteredOptions: QuestionOption[] = [];

  multipleAnswers: UserAnswer[] = [];

  trueFalseAnswers: UserAnswer[] = [];

  chooseAnswers: UserAnswer[] = [];

  essayAnswers: UserAnswer[] = [];

  constructor(
    private titleService: Title,
    private scheduleHeaderService: ScheduleHeaderService,
    private scheduleDetailService: ScheduleDetailService,
    private questionService: QuestionService,
    private optionService: QuestionOptionService,
    private userAnswerService: UserAnswerService
  ) { 
    this.setTitle("Test Activity")
  }

  ngOnInit(): void {
    this.getSchedules();
  }

  setTitle(pageTitle: string): void {
    this.titleService.setTitle(pageTitle)
  }

  getSchedules(): void {
    this.isLoad = true;
    this.scheduleHeaderService.getScheduleHeaders().subscribe((scheduleHeaders) => {
      this.scheduleHeaders = scheduleHeaders;
      this.getDetails()
        // console.log(this.scheduleHeaders)
    });
  }

  getDetails(): void {
    this.scheduleDetailService.getScheduleDetails().subscribe((sd) => {
      this.scheduleDetails = sd;
      this.getQuestions();
    })

  }

  getQuestions(): void {
    this.questionService.getQuestions().subscribe((qs) => {
      this.questions = qs
      this.getOptions()
    })

  }

  getOptions(): void{
    this.optionService.getQuestionOptions().subscribe((ops) => {
      this.options = ops

      this.filteredDetails =  this.scheduleDetails.filter(sd => sd.userID == this.participantID)
      // console.log(this.filteredDetails)
      this.scheduleHeaders.forEach(sh => {
        this.filteredDetails.forEach(sd => {
          if(sd.scheduleID == sh.id) 
            this.filteredHeaders.push(sh)
        })
      })

      // console.log(this.filteredHeaders)

      this.questions.forEach(q => {
        q.options = this.options.filter( opt => opt.questionID == q.id)
      })

      this.selectScheduleHeader(this.scheduleHeaders[0])
      this.isLoad = false;

      // console.log(this.questions)

    });
  }

  selectScheduleHeader(header: ScheduleHeader): void{

    if(this.examMode){
      alert("Please finish your exam first!")
      return
    }
    
    this.selectedHeader = header;
    this.filteredQuestions = this.questions.filter(q => q.scheduleID == header.id)
    this.selectedDetail = this.filteredDetails.find(sd => sd.scheduleID == header.id)
    // console.log(this.filteredQuestions)
  }

  setMultipleAnswer(value: any, questionID: number): void{

    let check = this.multipleAnswers.find(a => a.questionID == questionID)

    if(check != undefined){
      let index = this.multipleAnswers.indexOf(check)
      check.answer = value
      this.multipleAnswers.splice(index, 1, check);
      return;
    }

    this.multipleAnswers.push( new UserAnswer(this.participantID, questionID, value))

  }

  setTrueFalseAnswer(value: any, questionID: number): void{


    let check = this.trueFalseAnswers.find(a => a.questionID == questionID)

    if(check != undefined){
      let index = this.trueFalseAnswers.indexOf(check)
      check.answer = value
      this.trueFalseAnswers.splice(index, 1, check);
      return;
    }

    this.trueFalseAnswers.push( new UserAnswer(this.participantID, questionID, value))
  }

  setChooseAnswer(value: any, questionID: number): void{
    let check = this.chooseAnswers.find(a => a.questionID == questionID)

    console.log(value)

    if(check != undefined){
      let index = this.chooseAnswers.indexOf(check)
      check.answer = value
      this.chooseAnswers.splice(index, 1, check);
      return;
    }

    this.chooseAnswers.push( new UserAnswer(this.participantID, questionID, value))
  }

  setEssayAnswer(value: any, questionID: number): void{
    let check = this.essayAnswers.find(a => a.questionID == questionID)

    if(check != undefined){
      let index = this.essayAnswers.indexOf(check)
      check.answer = value
      this.essayAnswers.splice(index, 1, check);
      return;
    }

    this.essayAnswers.push( new UserAnswer(this.participantID, questionID, value))
  }

  endExam(): void{

    let score;
    let updateDetail

    switch(this.selectedHeader.testType){
      case "multiple":

          score = 0;
          if(this.multipleAnswers != undefined){
            let totalRight = 0;
            let selectedMultipleQuestion = this.questions.filter(q => q.scheduleID == this.selectedHeader.id )
              selectedMultipleQuestion.forEach( q => {
                let participantAnswer = this.multipleAnswers.find(a => a.questionID == q.id)
                if(q.rightAnswer == participantAnswer.answer) totalRight++;
              })
              console.log(totalRight)
              console.log(selectedMultipleQuestion.length)
              score = (totalRight / selectedMultipleQuestion.length) * 100;
          }
          updateDetail = this.selectedDetail
          updateDetail.score = score;
          this.multipleAnswers = []
          this.scheduleDetailService.updateSchedule(updateDetail).subscribe( () => {
            window.location.reload()
          })

        break;
      case "true false":

        score = 0;
        if(this.trueFalseAnswers != undefined){
          let totalRight = 0;

          let selectedTrueFalseQuestion = this.questions.filter(q => q.scheduleID == this.selectedHeader.id )
            selectedTrueFalseQuestion.forEach( q => {
              let participantAnswer = this.trueFalseAnswers.find(a => a.questionID == q.id)
              if(q.rightAnswer == participantAnswer.answer) totalRight++;
            })
            console.log(totalRight)
            console.log(selectedTrueFalseQuestion.length)
            score = (totalRight / selectedTrueFalseQuestion.length) * 100;
        }

        updateDetail = this.selectedDetail
        updateDetail.score = score;
        this.trueFalseAnswers = []
        this.scheduleDetailService.updateSchedule(updateDetail).subscribe( () => {
          window.location.reload()
        })

        break;
      case "choose":
        
        console.log(this.chooseAnswers)

        score = 0;

        if(this.chooseAnswers != undefined){
          let totalRight = 0;

          let selectedChooseQuestion = this.questions.filter(q => q.scheduleID == this.selectedHeader.id )
            selectedChooseQuestion.forEach( q => {
              let participantAnswer = this.chooseAnswers.find(a => a.questionID == q.id)

              if(participantAnswer == undefined){
                participantAnswer = new UserAnswer(this.participantID, q.id, q.options[0].optionName[0])
              } 

              if(q.rightAnswer == participantAnswer.answer) totalRight++;
            })

            console.log(totalRight)
            console.log(selectedChooseQuestion.length)
            score = (totalRight / selectedChooseQuestion.length) * 100;
        }

        updateDetail = this.selectedDetail
        updateDetail.score = score;

        console.log(score)

        this.chooseAnswers = []
        console.log(updateDetail);

        this.scheduleDetailService.updateSchedule(updateDetail).subscribe( () => {
          window.location.reload()
        })

        break;
      case "essay":

        // console.log(this.essayAnswers)

        if(this.essayAnswers == undefined){
            this.essayAnswers = []
        }

        updateDetail = this.selectedDetail
        updateDetail.answerStatus = "not yet graded"


        this.scheduleDetailService.updateSchedule(updateDetail).subscribe( () => {
          this.userAnswerService.addUserAnswer(this.essayAnswers).subscribe((as) => {
            window.location.reload()
          })
        })


        break;
      case "file":

        break;
    }


  }

  calculateScore(): void{

  }

}
