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

  private apiUrl = environment.apiUrl
  private participantsUrl = '/user'

  constructor(
    private http: HttpClient
  ) {}

  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(`${this.apiUrl}${this.participantsUrl}`)
  }

  

}
