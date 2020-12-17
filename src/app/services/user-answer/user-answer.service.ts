import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAnswer } from 'src/app/models/user-answer/user-answer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAnswerService {

  private userAnswerUrl: string = environment.apiUrl + '/user-answer';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<UserAnswer[]>{
    return this.http.get<UserAnswer[]>(this.userAnswerUrl);
  }

  addUserAnswer(userAnswers: UserAnswer[]): Observable<UserAnswer>{
    
    let object = {
      totalAnswers: userAnswers.length,
      userID: [],
      questionID: [],
      answer: [],
    }

    userAnswers.forEach(a => {
      object.userID.push(a.userID)
      object.questionID.push(a.questionID)
      object.answer.push(a.answer)
    })

    return this.http.post<UserAnswer>(
      this.userAnswerUrl,
      object,
      this.httpOptions
    );
  }

  updateUserAnswer(id: number, UserAnswer: UserAnswer): Observable<UserAnswer> {
    let url = `${this.userAnswerUrl}/${id}}`
    return this.http.put<UserAnswer>(url, UserAnswer, this.httpOptions)
  }

  deleteUserAnswer(id: number): Observable<UserAnswer> {
    let url = `${this.userAnswerUrl}/${id}`
    return this.http.delete<UserAnswer>(url, this.httpOptions)
  }

}
