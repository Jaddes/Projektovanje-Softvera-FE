import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Problem } from './model/problem.model';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {

  constructor(private http: HttpClient) { }

  getProblems(): Observable<Problem[]> {
    return this.http.get<Problem[]>(environment.apiHost + 'tourist/tour-problems');
  }

  createProblem(problem: Problem): Observable<Problem> {
    return this.http.post<Problem>(environment.apiHost + 'tourist/tour-problems', problem);
  }

  updateProblem(problem: Problem): Observable<Problem> {
    return this.http.put<Problem>(environment.apiHost + 'tourist/tour-problems/' + problem.id, problem);
  }

  deleteProblem(id: number): Observable<void> {
    return this.http.delete<void>(environment.apiHost + 'tourist/tour-problems/' + id);
  }
}