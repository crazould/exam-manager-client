import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ParticipantService } from 'src/app/services/participant/participant.service';

import { ScheduleHeaderService } from 'src/app/services/schedule-header/schedule-header.service';
import { ScheduleDetailService } from 'src/app/services/schedule-detail/schedule-detail.service';

import { Participant } from 'src/app/models/participant/participant.model';
import { ScheduleHeader } from 'src/app/models/schedule-header/schedule-header.model';
import { ScheduleDetail } from 'src/app/models/schedule-Detail/schedule-Detail.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.sass'],
})
export class ManageScheduleComponent implements OnInit {

  currPart: any = JSON.parse(localStorage.getItem('CURR_PART'))
  isLoad: boolean = true;

  participants: Participant[] = [];
  newTestType: string;

  scheduleHeaders: ScheduleHeader[] = [];
  scheduleDetails: ScheduleDetail[] = [];

  selectedParticipants: Participant[] = [];

  editTestName: string;
  editTestType: string;
  editStartTime: any;
  editEndTime: any;

  constructor(
    private titleService: Title,
    private participantService: ParticipantService,
    private scheduleHeaderService: ScheduleHeaderService,
    private scheduleDetailService: ScheduleDetailService,
    private router: Router
  ) {
    this.setTitle('Manage Schedule');
  }

  ngOnInit(): void {
    if(this.currPart == null) {
      this.router.navigate(['/']);
      return
    }

    this.getParticipants();
  }
  
  setTitle(pageTitle: string): void {
    this.titleService.setTitle(pageTitle);
  }
  
  getParticipants(): void {
    this.participantService.getParticipants().subscribe((participants) => {
      this.participants = participants;
      this.getSchedules();
    });
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
        this.isLoad = false;
      })
    });
  }

  setParticipantSchedule(
    participant: Participant,
    clickedBtn: HTMLButtonElement
  ): void {
    let activatedBtn: HTMLButtonElement = clickedBtn.parentElement.querySelector(
      '.active'
    );

    activatedBtn
      ? this.removeParticipantFromSchedule(participant, activatedBtn)
      : this.addParticipantToSchedule(participant, clickedBtn);
  }

  addParticipantToSchedule(
    participant: Participant,
    clickedBtn: HTMLButtonElement
  ): void {
    this.selectedParticipants.push(participant);
    clickedBtn.className += ' active';
  }

  removeParticipantFromSchedule(
    participant: Participant,
    activatedBtn: HTMLButtonElement
  ): void {
    this.selectedParticipants.splice(
      this.selectedParticipants.findIndex((p) => p == participant),
      1
    );
    activatedBtn.classList.remove('active');
  }

  add(testName: string, startTime: string, endTime: string): void {
    
    let startTimeDate = new Date(new Date(startTime).toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
    let endTimeDate = new Date(new Date(endTime).toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]

    if(this.newTestType == undefined) this.newTestType = "multiple";

    let scheduleHeader: ScheduleHeader =
        new ScheduleHeader(testName,this.newTestType,startTimeDate,endTimeDate)


      this.scheduleHeaderService.addScheduleHeader(scheduleHeader).subscribe((scheduleHeader) => {
        
        console.log(scheduleHeader)
        this.scheduleHeaders.push(scheduleHeader)

        let scheduleDetail: ScheduleDetail = new ScheduleDetail(
          scheduleHeader.id, 
          this.selectedParticipants
        )

        this.scheduleDetailService.addScheduleDetail(scheduleDetail).subscribe((scheduleDetail) => {
          // console.log(scheduleDetail)
          this.scheduleDetails.push(scheduleDetail)
        })

      })

  }

  save(id: number): void {

    let index = this.scheduleHeaders.findIndex((p) => p.id == id)
    
    if (this.editTestName==undefined) this.editTestName = this.scheduleHeaders[index].testName;
    if (this.editTestType==undefined) this.editTestType = this.scheduleHeaders[index].testType;
    if (this.editStartTime==undefined) this.editStartTime = this.scheduleHeaders[index].startTime;
    if (this.editEndTime==undefined) this.editEndTime = this.scheduleHeaders[index].endTime;

    let editScheduleHeader =  new ScheduleHeader(this.editTestName, this.editTestType ,this.editStartTime, this.editEndTime)

    // console.log(editScheduleHeader)
    console.log(id)
    console.log(index)

    this.scheduleHeaderService.updateScheduleHeader(id, editScheduleHeader).subscribe((scheduleHeader) => {
      this.scheduleHeaders.splice(index, 1, scheduleHeader)
    })

  }

  delete(id: number): void {
    let index = this.scheduleHeaders.findIndex((s) => s.id == id)

    this.scheduleHeaderService.deleteScheduleHeader(id).subscribe(() => {
      this.scheduleHeaders.splice(index, 1);
    });
  }

}
