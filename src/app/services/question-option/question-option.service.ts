import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionOption } from 'src/app/models/question-option/question-option.model';
import { Question } from 'src/app/models/question/question.model';


@Injectable({
  providedIn: 'root'
})
export class QuestionOptionService {

  private questionOptionUrl: string = environment.apiUrl + '/question-option';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getQuestionOptions(): Observable<QuestionOption[]> {
    return this.http.get<QuestionOption[]>(this.questionOptionUrl)
  }
  
  addQuestionOptions(questionOptions: QuestionOption): Observable<QuestionOption> {
    
    let object = {questionID: questionOptions.questionID, 
                  totalOptions: questionOptions.optionName.length, 
                  questionOptions: questionOptions.optionName }

    return this.http.post<QuestionOption>(
      this.questionOptionUrl,
      object,
      this.httpOptions
    )
  }

}
