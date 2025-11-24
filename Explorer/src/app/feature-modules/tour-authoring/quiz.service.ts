import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import {
  OptionEvaluationDto,
  QuestionAnswerDto,
  QuestionEvaluationResultDto,
  QuizAnswerOptionDto,
  QuizDto,
  QuizEvaluationResultDto,
  QuizQuestionDto,
  SubmitQuizAnswersDto,
} from './authoring/quizzes/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly baseUrl = `${environment.apiHost}quizzes`;

  constructor(private http: HttpClient) { }

  getOwnedQuizzes(): Observable<QuizDto[]> {
    return this.http.get<QuizDto[]>(`${this.baseUrl}/owned`);
  }

  getOwnedQuiz(id: number): Observable<QuizDto | undefined> {
    return this.getOwnedQuizzes().pipe(map(quizzes => quizzes.find(q => q.id === id)));
  }

  createQuiz(quiz: QuizDto): Observable<QuizDto> {
    return this.http.post<QuizDto>(this.baseUrl, quiz);
  }

  updateQuiz(quiz: QuizDto): Observable<QuizDto> {
    return this.http.put<QuizDto>(`${this.baseUrl}/${quiz.id}`, quiz);
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllQuizzes(): Observable<QuizDto[]> {
    return this.http.get<QuizDto[]>(this.baseUrl);
  }

  submitAnswers(quizId: number, submission: SubmitQuizAnswersDto): Observable<QuizEvaluationResultDto> {
    return this.http.post<QuizEvaluationResultDto>(`${this.baseUrl}/${quizId}/submit`, submission);
  }
}

export type { QuizDto, QuizQuestionDto, QuizAnswerOptionDto, SubmitQuizAnswersDto, QuestionAnswerDto, QuizEvaluationResultDto, QuestionEvaluationResultDto, OptionEvaluationDto };