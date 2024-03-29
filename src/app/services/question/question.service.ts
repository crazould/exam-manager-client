import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question/question.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionUrl: string = environment.apiUrl + '/question';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]>{
    return this.http.get<Question[]>(this.questionUrl);
  }

  addQuestion(question: Question): Observable<Question>{
    return this.http.post<Question>(
      this.questionUrl,
      question,
      this.httpOptions
    );
  }

  updateQuestion(id: number, Question: Question): Observable<Question> {
    let url = `${this.questionUrl}/${id}}`
    return this.http.put<Question>(url, Question, this.httpOptions)
  }

  deleteQuestion(id: number): Observable<Question> {
    let url = `${this.questionUrl}/${id}`
    return this.http.delete<Question>(url, this.httpOptions)
  }

}
