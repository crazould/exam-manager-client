import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Participant } from '../../models/participant.model'
import { ParticipantService } from '../../services/participant.service'


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


  constructor(private titleService : Title, private participantService: ParticipantService) {
    this.setTitle('Manage Participant')
  }

  setTitle(newTitle : string) {
    this.titleService.setTitle(newTitle)
  }

  ngOnInit(): void {
    this.getParticipants()
  }

  getParticipants() : void {
    this.participantService.getParticipants()
    .subscribe(participants =>{ 
      this.participants = participants
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

  setEditParticipantName(event : any) {
    this.editParticipantName = event.target.value
  }

  setEditParticipantEmail(event : any) {
    this.editParticipantEmail = event.target.value
  }

  setEditParticipantPassword(event : any) {
    this.editParticipantPassword = event.target.value
  }

  add(): void {

    this.participantService.addParticipant({
      name: this.participantName,
      email: this.participantEmail,
      password: this.participantPassword
    } as Participant).subscribe( () => {
      this.participants.push(new Participant(
        this.participantName,
        this.participantEmail,
        this.participantPassword
      ))
    })

  }

  insertParticipant() {
    // let lenght = this.participants.length
    // let participant = new Participant(
    //   this.participantName,
    //   this.participantEmail,
    //   this.participantPassword
    // )

    // participant.id = (lenght + 1) + ''
    // this.participants.push(
    //     participant
    // )



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
