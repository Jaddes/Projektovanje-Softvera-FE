import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  OptionEvaluationDto,
  QuestionAnswerDto,
  QuestionEvaluationResultDto,
  QuizDto,
  QuizEvaluationResultDto,
  QuizQuestionDto,
  SubmitQuizAnswersDto
} from '../../tour-authoring/authoring/quizzes/quiz.model';
import { QuizService } from '../../tour-authoring/quiz.service';

@Component({
  selector: 'xp-tourist-quiz-solve',
  templateUrl: './tourist-quiz-solve.component.html',
  styleUrls: ['./tourist-quiz-solve.component.css']
})
export class TouristQuizSolveComponent implements OnInit {
  quiz?: QuizDto;
  result?: QuizEvaluationResultDto;
  loading = false;
  errorMessage = '';
  validationError = '';
  selections: Record<number, Set<number>> = {};

  constructor(private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const parsedId = idParam ? Number(idParam) : NaN;
    if (!isNaN(parsedId)) {
      this.loadQuiz(parsedId);
    } else {
      this.errorMessage = 'Invalid quiz id.';
    }
  }

  private loadQuiz(id: number): void {
    this.loading = true;
    this.quizService.getQuizById(id).subscribe({
      next: (quiz: QuizDto | undefined) => {
        if (!quiz) {
          this.errorMessage = 'Quiz not found.';
        } else {
          this.quiz = quiz;
          this.resetSelections();
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load quiz.';
        this.loading = false;
      }
    });
  }

  private setSelection(questionId: number, optionId: number, checked: boolean, allowsMultiple: boolean): void {
    const set = this.selections[questionId] ?? new Set<number>();
    if (allowsMultiple) {
      checked ? set.add(optionId) : set.delete(optionId);
    } else {
      set.clear();
      if (checked) {
        set.add(optionId);
      }
    }
    this.selections[questionId] = set;
  }

  toggleOption(question: QuizQuestionDto, optionId: number, checked: boolean): void {
    if (!question.id) { return; }
    this.setSelection(question.id, optionId, checked, question.allowsMultipleAnswers);
    this.result = undefined;
  }

  selectSingle(question: QuizQuestionDto, optionId: number): void {
    this.toggleOption(question, optionId, true);
  }

  getSingleSelection(questionId: number): number | null {
    const values = Array.from(this.selections[questionId] ?? []);
    return values.length ? values[0] : null;
  }

  isSelected(questionId: number, optionId: number): boolean {
    return this.selections[questionId]?.has(optionId) ?? false;
  }

  getQuestionResult(questionId: number): QuestionEvaluationResultDto | undefined {
    return this.result?.questions.find(q => q.questionId === questionId);
  }

  getOptionResult(questionId: number, optionId: number): OptionEvaluationDto | undefined {
    return this.getQuestionResult(questionId)?.options.find(o => o.optionId === optionId);
  }

  submit(): void {
    if (!this.quiz?.id) { return; }
    this.validationError = '';
    const answers: QuestionAnswerDto[] = [];

    for (const question of this.quiz.questions || []) {
      if (!question.id) { continue; }
      const selected = Array.from(this.selections[question.id] ?? []);
      if (selected.length === 0) {
        this.validationError = 'Please answer all questions before submitting.';
        return;
      }
      answers.push({ questionId: question.id, selectedOptionIds: selected });
    }

    const payload: SubmitQuizAnswersDto = {
      quizId: this.quiz.id,
      answers
    };

    this.loading = true;
    this.quizService.submitAnswers(this.quiz.id, payload).subscribe({
      next: (res: QuizEvaluationResultDto) => {
        this.result = res;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to submit answers.';
        this.loading = false;
      }
    });
  }

  resetSelections(): void {
    if (!this.quiz) { return; }
    this.selections = {};
    (this.quiz.questions || []).forEach(q => {
      if (q.id === undefined) { return; }
      this.selections[q.id] = new Set<number>();
    });
    this.result = undefined;
    this.validationError = '';
  }
}
