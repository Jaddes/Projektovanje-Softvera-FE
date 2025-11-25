import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDto } from '../../tour-authoring/authoring/quizzes/quiz.model';
import { QuizService } from '../../tour-authoring/quiz.service';

@Component({
  selector: 'xp-tourist-quiz-list',
  templateUrl: './tourist-quiz-list.component.html',
  styleUrls: ['./tourist-quiz-list.component.css']
})
export class TouristQuizListComponent implements OnInit {
  quizzes: QuizDto[] = [];
  loading = false;
  errorMessage = '';

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.loading = true;
    this.errorMessage = '';
    this.quizService.getAllQuizzes().subscribe({
      next: (quizzes: QuizDto[]) => {
        this.quizzes = quizzes || [];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load quizzes.';
        this.loading = false;
      }
    });
  }

  solveQuiz(quiz: QuizDto): void {
    if (!quiz.id) { return; }
    this.router.navigate(['/quizzes', quiz.id, 'solve']);
  }
}
