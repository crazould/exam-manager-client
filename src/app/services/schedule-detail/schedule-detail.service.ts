import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleDetail } from 'src/app/models/schedule-Detail/schedule-Detail.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDetailService {

  private schedulDetailUrl: string = environment.apiUrl + '/schedule-detail';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getScheduleDetails(): Observable<ScheduleDetail[]> {
    return this.http.get<ScheduleDetail[]>(this.schedulDetailUrl);
  }

  addScheduleDetail(scheduleDetail: ScheduleDetail): Observable<ScheduleDetail> {
    return this.http.post<ScheduleDetail>(
      this.schedulDetailUrl,
      scheduleDetail,
      this.httpOptions
    );
  }

  updateSchedule(){
    
  }

}
