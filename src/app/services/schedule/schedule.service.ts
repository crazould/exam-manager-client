import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models/schedule/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private scheduleUrl: string = environment.apiUrl + '/schedule';
  private scheduleHeaderUrl: string = environment.apiUrl + '/schedule-header';
  private schedulDetaileUrl: string = environment.apiUrl + '/schedule-detail';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.scheduleUrl);
  }

  addSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(
      this.scheduleUrl,
      schedule,
      this.httpOptions
    );
  }

  updateSchedule(){
    
  }

  deleteSchedule(id: number): Observable<Schedule> {
    let url = `${this.scheduleUrl}/${id}`
    return this.http.delete<Schedule>(url, this.httpOptions)
  }

  
}
