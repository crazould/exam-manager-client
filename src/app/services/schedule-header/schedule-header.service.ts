import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleHeader } from 'src/app/models/schedule-header/schedule-header.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleHeaderService {

  private scheduleHeaderUrl: string = environment.apiUrl + '/schedule-header';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor(private http: HttpClient) { }

  getScheduleHeaders(): Observable<ScheduleHeader[]> {
    return this.http.get<ScheduleHeader[]>(this.scheduleHeaderUrl);
  }

  addScheduleHeader(scheduleHeader: ScheduleHeader): Observable<ScheduleHeader> {
    return this.http.post<ScheduleHeader>(
      this.scheduleHeaderUrl,
      scheduleHeader,
      this.httpOptions
    );
  }

  updateScheduleHeader(id: number, scheduleHeader: ScheduleHeader): Observable<ScheduleHeader> {
    let url = `${this.scheduleHeaderUrl}/${id}}`
    
    return this.http.put<ScheduleHeader>(url, scheduleHeader, this.httpOptions)
  }

  deleteScheduleHeader(id: number): Observable<ScheduleHeader> {
    let url = `${this.scheduleHeaderUrl}/${id}`
    return this.http.delete<ScheduleHeader>(url, this.httpOptions)
  }

}
