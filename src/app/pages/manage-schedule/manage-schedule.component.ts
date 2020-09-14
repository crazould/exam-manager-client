import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ParticipantService } from 'src/app/services/participant/participant.service';
import { TestService } from 'src/app/services/test/test.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Participant } from 'src/app/models/participant/participant.model';
import { Test } from 'src/app/models/test/test.model';
import { Schedule } from 'src/app/models/schedule/schedule.model';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.sass'],
})
export class ManageScheduleComponent implements OnInit {
  
  participants: Participant[] = [];
  schedules: Schedule[] = [];
  selectedParticipants: Participant[] = [];

  constructor(
    private titleService: Title,
    private participantService: ParticipantService,
    private testSerivce: TestService,
    private scheduleSerivce: ScheduleService
  ) {
    this.setTitle('Manage Schedule');
  }

  ngOnInit(): void {
    this.getParticipants();
    this.getSchedules();
  }

  setTitle(pageTitle: string): void {
    this.titleService.setTitle(pageTitle);
  }

  getParticipants(): void {
    this.participantService.getParticipants().subscribe((participants) => {
      this.participants = participants;
    });
  }

  getSchedules(): void {
    this.scheduleSerivce.getSchedules().subscribe((schedules) => {

      this.schedules = schedules;
      console.log(this.schedules);

      this.schedules.map(r => {
        console.log(r)
        r.start_time = new Date(r.start_time)
        r.end_time = new Date(r.end_time)
        
        // console.log(new Date(r.start_time).getFullYear())
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
    let test: Test = new Test(testName);
    let startTimeDate  = new Date(startTime)
    let endTimeDate  = new Date(endTime)


    this.testSerivce.addTestHeaders(test).subscribe((test) => {
      let schedule: Schedule = new Schedule(
        test,
        startTimeDate,
        endTimeDate,
        this.selectedParticipants
      );
      console.log(schedule.participants.length)
      this.scheduleSerivce.addSchedule(schedule).subscribe((e) => {
        console.log(e)
      } );
    });
  }

  edit(id: number): void {

  }

  save(id: number): void{

  }

  delete(id: number): void {
    let index = this.schedules.findIndex((s) => s.id == id)

    this.scheduleSerivce.deleteSchedule(id).subscribe(() => {
      this.schedules.splice(index, 1);
    });

  }
}
