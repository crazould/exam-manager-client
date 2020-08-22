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
  participantIDs: number[] = [];

  constructor(
    private titleService: Title,
    private participantService: ParticipantService,
    private testSerivce: TestService,
    private scheduleSerivce: ScheduleService,
  ) {
    this.setTitle('Manage Schedule');
  }

  ngOnInit(): void {
    this.getParticipants();
  }

  setTitle(pageTitle: string): void {
    this.titleService.setTitle(pageTitle);
  }

  getParticipants(): void {
    this.participantService.getParticipants().subscribe((participants) => {
      this.participants = participants;
    });
  }

  setParticipantSchedule(
    participantID: number,
    clickedBtn: HTMLButtonElement
  ): void {
    let activatedBtn: HTMLButtonElement = clickedBtn.parentElement.querySelector(
      '.active'
    );

    activatedBtn
      ? this.removeParticipantFromSchedule(participantID, activatedBtn)
      : this.addParticipantToSchedule(participantID, clickedBtn);
  }

  addParticipantToSchedule(
    participantID: number,
    clickedBtn: HTMLButtonElement
  ): void {
    this.participantIDs.push(participantID);
    clickedBtn.className += ' active';
  }

  removeParticipantFromSchedule(
    participantID: number,
    activatedBtn: HTMLButtonElement
  ): void {
    this.participantIDs.splice(
      this.participantIDs.findIndex((id) => id == participantID),
      1
    );
    activatedBtn.classList.remove('active');
  }

  add(testName: string, startTime: string, endTime: string): void{


  }

  edit(): void{


  }

  delete(): void{


  }

}
