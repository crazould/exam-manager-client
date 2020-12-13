import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ScheduleDetail } from 'src/app/models/schedule-Detail/schedule-Detail.model';
import { ScheduleHeader } from 'src/app/models/schedule-header/schedule-header.model';
import { ScheduleDetailService } from 'src/app/services/schedule-detail/schedule-detail.service';
import { ScheduleHeaderService } from 'src/app/services/schedule-header/schedule-header.service';
import { Question } from 'src/app/models/question/question.model'

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.sass']
})
export class ManageQuestionComponent implements OnInit {


  scheduleHeaders: ScheduleHeader[] = [];
  scheduleDetails: ScheduleDetail[] = [];

  selectedHeader: ScheduleHeader;
  newQuestion: Question;

  multipleOptions: string[];
  multipleRightAnswer: string;

  trueFalseRightAnswer: string;

  constructor(
    private titleService: Title,
    private scheduleHeaderService: ScheduleHeaderService,
    private scheduleDetailService: ScheduleDetailService
  ) { 
    this.setTitle("Manage Question")
  }

  ngOnInit(): void {
    this.getSchedules()
    this.newQuestion = new Question("", "")
  }

  setTitle(pageTitle: string): void {
    this.titleService.setTitle(pageTitle)
  }

  getSchedules(): void {

    this.scheduleHeaderService.getScheduleHeaders().subscribe((scheduleHeaders) => {
      this.scheduleDetailService.getScheduleDetails().subscribe((scheduleDetails) =>{
        this.scheduleHeaders = scheduleHeaders;
        this.scheduleDetails = scheduleDetails;
        this.scheduleHeaders.map(scheduleHeader => {
          scheduleHeader.startTime = new Date(new Date(scheduleHeader.startTime).toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
          scheduleHeader.endTime = new Date(new Date(scheduleHeader.endTime).toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
        })
        // console.log(this.scheduleHeaders)
        // console.log(this.scheduleDetails)
      })
    });
  }

  selectScheduleHeader(header: ScheduleHeader): void{
    this.selectedHeader = header;
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
      this.newQuestion.type = "trueFalse"
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

  addQuestion(): void{
    switch(this.newQuestion.type){
      case "multiple":
        console.log(this.newQuestion.name)
        console.log(this.multipleOptions)
        console.log(this.multipleRightAnswer)
        break;
      case "trueFalse":
        console.log(this.newQuestion.name)
        console.log(this.trueFalseRightAnswer)
        break;
      case "choose":
        console.log("choose")

        break;
      case "essay":
        console.log("essay")
        break;
      case "file":
        console.log("file")
        break;

    }
  }



}
