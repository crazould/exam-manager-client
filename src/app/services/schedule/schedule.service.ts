import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models/schedule/schedule.model';
import { Test } from 'src/app/models/test/test.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private scheduleHeaderUrl: string = environment.apiUrl + '/schedule-header'
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient
  ) { }

  getScheduleHeaders(): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(this.scheduleHeaderUrl)
  }

  addScheduleHeader(schedule: Schedule){
    return this.http.post<Schedule>(this.scheduleHeaderUrl, schedule, this.httpOptions)
  }


}
