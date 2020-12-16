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

@Component({
  selector: 'app-test-activity',
  templateUrl: './test-activity.component.html',
  styleUrls: ['./test-activity.component.sass']
})
export class TestActivityComponent implements OnInit {


  participantID: number = 3;
  examMode: boolean = false;
  
  scheduleHeaders: ScheduleHeader[] = [];
  selectedHeader: ScheduleHeader;

  filteredHeaders: ScheduleHeader[] = [];

  scheduleDetails: ScheduleDetail[] = [];
  filteredDetails: ScheduleDetail[] = [];

  questions: Question[] = [];
  filteredQuestions: Question[] = [];

  options: QuestionOption[] = [];
  filteredOptions: QuestionOption[] = [];

  answers: UserAnswer[] = [];

  constructor(
    private titleService: Title,
    private scheduleHeaderService: ScheduleHeaderService,
    private scheduleDetailService: ScheduleDetailService,
    private questionService: QuestionService,
    private optionService: QuestionOptionService
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
      console.log(this.questions)
    });
  }

  selectScheduleHeader(header: ScheduleHeader): void{

    if(this.examMode){
      alert("Please finish your exam first!")
      return
    }
    this.selectedHeader = header;
    this.filteredQuestions = this.questions.filter(q => q.scheduleID == header.id)
    // console.log(this.filteredQuestions)
  }

}
