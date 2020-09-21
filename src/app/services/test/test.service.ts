import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Test } from 'src/app/models/test/test.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private testHeaderURL: string = environment.apiUrl + "/test-header"
  private teshURL: string = environment.apiUrl + "/test"

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient
  ) { }

  getTestHeaders(): Observable<Test[]> {
    return this.http.get<Test[]>(this.testHeaderURL)
  }

  addTestHeaders(test: Test): Observable<Test>{
    return this.http.post<Test>(this.testHeaderURL, test, this.httpOptions)
  }


}
