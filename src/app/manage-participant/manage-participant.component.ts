import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Participant} from '../models/participant.model'


@Component({
  selector: 'app-manage-participant',
  templateUrl: './manage-participant.component.html',
  styleUrls: ['./manage-participant.component.sass']
})
export class ManageParticipantComponent implements OnInit {

  participants: Participant[] = []
  
  participantName : string
  participantPassword : string
  participantEmail : string

  editParticipantName : string
  editParticipantPassword : string
  editParticipantEmail : string


  constructor(private titleService : Title) {
    this.setTitle('Manage Participant')
  }

  setTitle(newTitle : string) {
    this.titleService.setTitle(newTitle)
  }

  ngOnInit(): void {
    let emilia = new Participant(
      "emilia",
      "emilia@gmail.com",
      "emilia123"
    )
    let subaru = new Participant(
      "subaru",
      "subaru@gmail.com",
      "subaru123"
    )
    let puck =  new Participant(
      "puck",
      "puck@gmail.com",
      "puck12345"
    )
    emilia.id = '1'
    subaru.id = '2'
    puck.id = '3'
    this.participants.push(emilia)
    this.participants.push(subaru)
    this.participants.push(puck)
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

  setEditParticipantName(event : any) {
    this.editParticipantName = event.target.value
  }

  setEditParticipantEmail(event : any) {
    this.editParticipantEmail = event.target.value
  }

  setEditParticipantPassword(event : any) {
    this.editParticipantPassword = event.target.value
  }

  insertParticipant() {
    let lenght = this.participants.length

    let participant = new Participant(
      this.participantName,
      this.participantEmail,
      this.participantPassword
    )

    participant.id = (lenght + 1) + ''
    this.participants.push(
        participant
    )
  }

  updateParticipant(id) {

    let oldParticipant = this.participants.find(p => p.id == id)

    let p = new Participant(
      this.editParticipantName  == undefined ? oldParticipant.name : this.editParticipantName,
      this.editParticipantEmail == undefined ? oldParticipant.email : this.editParticipantEmail,
      this.editParticipantPassword  == undefined ? oldParticipant.password : this.editParticipantPassword
    )

    this.participants.splice(--id, 1, p)
  }

  deleteParticipant(id) {
    this.participants.splice(--id, 1)
  }

}
