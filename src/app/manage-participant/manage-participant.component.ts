import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-manage-participant',
  templateUrl: './manage-participant.component.html',
  styleUrls: ['./manage-participant.component.sass']
})
export class ManageParticipantComponent implements OnInit {

  participants = []
  participantName : string
  participantPassword : string
  participantEmail : string


  constructor(private titleService : Title) {
    this.setTitle('Manage Participant')
  }

  private setTitle(newTitle : string) {
    this.titleService.setTitle(newTitle)
  }

  ngOnInit(): void {
    this.participants.push({
      name: "Emilia",
      email: "Emilia@gmail.com",
      password: "Emilia123"
    })
    this.participants.push({
      name: "Subaru",
      email: "Subaru@gmail.com",
      password: "Subaru123"
    })
    this.participants.push({
      name: "Puck",
      email: "Puck@gmail.com",
      password: "Puck123"
    })
  }

  setParticipantName(event : any) {
    this.participantName = event.target.value
  }

  setParticipantEmail(event : any) {
    this.participantEmail = event.target.value
  }

  setParticipantPassword(event : any) {
    this.participantPassword = event.target.value
  }

  insertParticipant() {
    this.participants.push({
      name: this.participantName,
      email: this.participantEmail,
      password: this.participantPassword,
      isEdit: false,
      isDelete: false
    })

    console.log(this.participants)

  }

}
