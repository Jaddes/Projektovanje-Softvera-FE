import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDto } from './quiz.model';
import { QuizService } from '../../quiz.service';

@Component({
  selector: 'xp-author-quiz-list',
  templateUrl: './author-quiz-list.component.html',
  styleUrls: ['./author-quiz-list.component.css']
})
export class AuthorQuizListComponent implements OnInit {
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
    this.quizService.getOwnedQuizzes().subscribe({
      next: (quizzes) => {
        this.quizzes = quizzes || [];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load quizzes. Please try again later.';
        this.loading = false;
      }
    });
  }

  createQuiz(): void {
    this.router.navigate(['/author/quizzes/create']);
  }

  editQuiz(quiz: QuizDto): void {
    if (!quiz.id) { return; }
    this.router.navigate(['/author/quizzes', quiz.id, 'edit']);
  }

  deleteQuiz(quiz: QuizDto): void {
    if (!quiz.id) { return; }
    this.quizService.deleteQuiz(quiz.id).subscribe({
      next: () => this.loadQuizzes(),
      error: () => this.errorMessage = 'Failed to delete quiz.'
    });
  }
}