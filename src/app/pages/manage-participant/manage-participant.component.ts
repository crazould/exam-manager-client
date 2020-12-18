import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Participant } from '../../models/participant/participant.model';
import { ParticipantService } from '../../services/participant/participant.service';

@Component({
  selector: 'app-manage-participant',
  templateUrl: './manage-participant.component.html',
  styleUrls: ['./manage-participant.component.sass'],
})
export class ManageParticipantComponent implements OnInit {
  
  currPart: any = JSON.parse(localStorage.getItem('CURR_PART'))
  isLoad: boolean = true;


  participants: Participant[] = [];
  editParticipantName: string;
  editParticipantEmail: string;

  constructor(
    private titleService: Title,
    private participantService: ParticipantService,
    private router: Router
  ) {
    this.setTitle("Manage Participant");
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
      this.isLoad = false
    });
  }

  add(name: string, email: string, password: string): void {
    let participant = new Participant(name, email);
    participant.password = password

    this.participantService.addParticipant(participant).subscribe((p) => {
      this.participants.push(p);
    });
  }

  save(id: number): void {
    let index = this.participants.findIndex((p) => p.id == id);
    let editParticipant = new Participant(this.editParticipantName, this.editParticipantEmail);

    this.participantService.updateParticipant(id, editParticipant).subscribe((participant) => {
      this.participants.splice(index, 1, participant);
    });

  }

  delete(id: number): void {
    let index = this.participants.findIndex((p) => p.id == id);
    
    this.participantService.deleteParticipant(id).subscribe(() => {
      this.participants.splice(index, 1);
    });
  }
}
