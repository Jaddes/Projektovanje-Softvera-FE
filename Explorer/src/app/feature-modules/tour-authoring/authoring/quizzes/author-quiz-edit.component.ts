import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizAnswerOptionDto, QuizDto, QuizQuestionDto } from './quiz.model';
import { QuizService } from '../../quiz.service';

@Component({
  selector: 'xp-author-quiz-edit',
  templateUrl: './author-quiz-edit.component.html',
  styleUrls: ['./author-quiz-edit.component.css']
})
export class AuthorQuizEditComponent implements OnInit {
  quizForm: FormGroup;
  isEdit = false;
  quizId?: number;
  loading = false;
  errorMessage = '';
  validationError = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const parsed = Number(idParam);
      if (!isNaN(parsed)) {
        this.isEdit = true;
        this.quizId = parsed;
        this.loadQuiz(parsed);
      }
    }

    if (!this.isEdit) {
      this.addQuestion();
    }
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  options(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  private createOption(option?: QuizAnswerOptionDto): FormGroup {
    return this.fb.group({
      id: [option?.id ?? 0],
      questionId: [option?.questionId ?? 0],
      text: [option?.text || '', Validators.required],
      isCorrect: [option?.isCorrect ?? false],
      feedback: [option?.feedback || '', Validators.required]
    });
  }

  private createQuestion(question?: QuizQuestionDto): FormGroup {
    const options = (question?.options || []).map(o => this.createOption(o));
    const optionsArray = this.fb.array(options);
    if (optionsArray.length === 0) {
      optionsArray.push(this.createOption());
      optionsArray.push(this.createOption());
    }

    return this.fb.group({
      id: [question?.id ?? 0],
      quizId: [question?.quizId ?? 0],
      text: [question?.text || '', Validators.required],
      allowsMultipleAnswers: [question?.allowsMultipleAnswers ?? false],
      options: optionsArray
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  addOption(questionIndex: number): void {
    this.options(questionIndex).push(this.createOption());
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const opts = this.options(questionIndex);
    if (opts.length <= 1) { return; }
    opts.removeAt(optionIndex);
  }

  private loadQuiz(id: number): void {
    this.loading = true;
    this.quizService.getOwnedQuiz(id).subscribe({
      next: (quiz) => {
        if (!quiz) {
          this.errorMessage = 'Quiz not found.';
          this.loading = false;
          return;
        }
        this.quizForm.patchValue({
          title: quiz.title,
          description: quiz.description
        });
        this.questions.clear();
        (quiz.questions || []).forEach(q => this.questions.push(this.createQuestion(q)));
        if (this.questions.length === 0) {
          this.addQuestion();
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load quiz.';
        this.loading = false;
      }
    });
  }

  private validateQuestions(questions: QuizQuestionDto[]): boolean {
    for (const q of questions) {
      if (!q.text || q.text.trim().length === 0) {
        this.validationError = 'Question text is required for all questions.';
        return false;
      }
      if (!q.options || q.options.length === 0) {
        this.validationError = 'Each question must have at least one answer option.';
        return false;
      }
      const correctCount = q.options.filter(o => o.isCorrect).length;
      if (correctCount === 0) {
        this.validationError = 'Each question must have at least one correct option.';
        return false;
      }
      if (!q.allowsMultipleAnswers && correctCount > 1) {
        this.validationError = 'Single-answer questions can only have one correct option.';
        return false;
      }
      const invalidOption = q.options.find(o => !o.text || !o.feedback);
      if (invalidOption) {
        this.validationError = 'All options require text and feedback.';
        return false;
      }
    }
    this.validationError = '';
    return true;
  }

  onSubmit(): void {
    if (this.quizForm.invalid) {
      this.validationError = 'Please complete all required fields.';
      this.quizForm.markAllAsTouched();
      return;
    }

    const formValue = this.quizForm.value;
    const quiz: QuizDto = {
      id: this.quizId,
      title: formValue.title,
      description: formValue.description,
      questions: (formValue.questions || []).map((q: any) => ({
        id: q.id,
        quizId: q.quizId,
        text: q.text,
        allowsMultipleAnswers: q.allowsMultipleAnswers,
        options: (q.options || []).map((o: any) => ({
          id: o.id,
          questionId: o.questionId,
          text: o.text,
          feedback: o.feedback,
          isCorrect: !!o.isCorrect
        }))
      }))
    };

    if (!this.validateQuestions(quiz.questions)) {
      return;
    }

    const request$ = this.isEdit ? this.quizService.updateQuiz(quiz) : this.quizService.createQuiz(quiz);
    request$.subscribe({
      next: () => this.router.navigate(['/author/quizzes']),
      error: () => this.errorMessage = 'Failed to save quiz. Please try again.'
    });
  }

  deleteQuiz(): void {
    if (!this.isEdit || !this.quizId) { return; }
    this.quizService.deleteQuiz(this.quizId).subscribe({
      next: () => this.router.navigate(['/author/quizzes']),
      error: () => this.errorMessage = 'Failed to delete quiz.'
    });
  }

  cancel(): void {
    this.router.navigate(['/author/quizzes']);
  }

  trackByIndex(index: number, _item: AbstractControl): number {
    return index;
  }
}