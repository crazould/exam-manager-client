import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Participant } from '../../models/participant/participant.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private participantsUrl: string = environment.apiUrl + '/participant';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.participantsUrl);
  }

  login(email, password): Observable<Participant> {
    let object = {email: email, password: password}
    let url = this.participantsUrl + '/login'
    return this.http.post<Participant>(url, object, this.httpOptions);
  }

  addParticipant(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>(
      this.participantsUrl,
      participant,
      this.httpOptions
    );
  }

  updateParticipant(
    id: number,
    participant: Participant
  ): Observable<Participant> {
    let url = `${this.participantsUrl}/${id}`;
    return this.http.put<Participant>(url, participant, this.httpOptions);
  }

  deleteParticipant(id: number): Observable<Participant> {
    let url = `${this.participantsUrl}/${id}`;
    return this.http.delete<Participant>(url, this.httpOptions);
  }
}
