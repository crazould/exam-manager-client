import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Participant } from '../models/participant.model'
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private participantsUrl = environment.apiUrl + '/user'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient
  ) {}

  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.participantsUrl, )
  }

  addParticipant(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>(this.participantsUrl, participant, this.httpOptions)
  }
  
  updateParticipant(participant: Participant): Observable<any> {

    let id = typeof participant === 'number' ? participant : participant.id
    let url = `${this.participantsUrl}/${id}`
    
    return this.http.put(url, participant, this.httpOptions)

  }

  deleteParticipant(participant: Participant): Observable<Participant> {
    let id = typeof participant === 'number' ? participant : participant.id
    let url = `${this.participantsUrl}/${id}`

    return this.http.delete<Participant>(url, this.httpOptions)
  }

}
