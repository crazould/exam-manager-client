import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-manage-participant',
  templateUrl: './manage-participant.component.html',
  styleUrls: ['./manage-participant.component.sass']
})
export class ManageParticipantComponent implements OnInit {

  constructor(private titleService : Title) {
    this.setTitle('Manage Participant')
  }

  private setTitle(newTitle : string) {
    this.titleService.setTitle(newTitle)
  }

  ngOnInit(): void {

  }

}
