import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Participant } from 'src/app/models/participant/participant.model';
import { ScheduleDetail } from 'src/app/models/schedule-Detail/schedule-Detail.model';
import { ScheduleHeader } from 'src/app/models/schedule-header/schedule-header.model';
import { ParticipantService } from 'src/app/services/participant/participant.service';
import { ScheduleDetailService } from 'src/app/services/schedule-detail/schedule-detail.service';
import { ScheduleHeaderService } from 'src/app/services/schedule-header/schedule-header.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.sass']
})
export class TestResultComponent implements OnInit {

  currPart: any = JSON.parse(localStorage.getItem('CURR_PART'))
  isLoad: boolean = true;

  scheduleHeaders: ScheduleHeader[] = [];
  selectedHeader: ScheduleHeader;

  scheduleDetails: ScheduleDetail[] = [];
  selectedDetails: ScheduleDetail[] = [];

  participants: Participant[] = [];


  constructor(
    private titleService: Title,
    private scheduleHeaderService: ScheduleHeaderService,
    private scheduleDetailService: ScheduleDetailService,
    private participantService: ParticipantService,
    private router: Router
  ) {
    this.setTitle("Test Result")
  }

  ngOnInit(): void {
    if(this.currPart == null) {
      this.router.navigate(['/']);
      return
    }
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
      this.getParticipants()
    })
  }

  getParticipants(): void{
    this.participantService.getParticipants().subscribe((p) => {
      this.participants = p;
      this.isLoad = false      
    })
  }

  selectScheduleHeader(header: ScheduleHeader): void{
    this.selectedHeader = header;
    // console.log(this.scheduleDetails)
    if(this.scheduleDetails.length != 0) {
      this.selectedDetails = this.scheduleDetails.filter(sd => sd.scheduleID == header.id)
      this.selectedDetails.map(e => {
        e.participants = []
        let p = this.participants.find(p => p.id == e.userID)
        e.participants.push(p)
      })
    }
  }

}
