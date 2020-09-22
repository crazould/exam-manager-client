import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ParticipantService } from 'src/app/services/participant/participant.service';

import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Participant } from 'src/app/models/participant/participant.model';
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

      this.schedules.map(r => {
        r.startTime = new Date(new Date(r.startTime).toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
        r.endTime = new Date(new Date(r.endTime).toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
      })

      console.log(this.schedules)

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


      let schedule: Schedule = new Schedule(
        testName,
        startTimeDate,
        endTimeDate,
        this.selectedParticipants
      )

      this.scheduleSerivce.addSchedule(schedule).subscribe((e) => {
        this.schedules.push(schedule)
      })


  }

  edit(id: number): void {

  }

  save(id: number): void {
    console.log(id)
  }

  delete(id: number): void {
    let index = this.schedules.findIndex((s) => s.id == id)

    this.scheduleSerivce.deleteSchedule(id).subscribe(() => {
      this.schedules.splice(index, 1);
    });

  }
}
