import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Participant } from '../../models/participant/participant.model';
import { ParticipantService } from '../../services/participant.service';

@Component({
  selector: 'app-manage-participant',
  templateUrl: './manage-participant.component.html',
  styleUrls: ['./manage-participant.component.sass'],
})
export class ManageParticipantComponent implements OnInit {
  
  participants: Participant[] = [];

  constructor(
    private titleService: Title,
    private participantService: ParticipantService
  ) {
    this.setTitle("Manage Participant");
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

  add(name: string, email: string, password: string): void {
    let participant = new Participant(name, email, password);

    this.participantService.addParticipant(participant).subscribe((p) => {
      this.participants.push(p);
    });
  }

  save(id: number, name: any, email: any, password: any): void {
    let index = this.participants.findIndex((p) => p.id == id);
    let newParticipant = new Participant(name, email, password);

    this.participantService.updateParticipant(id, newParticipant).subscribe((participant) => {
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
