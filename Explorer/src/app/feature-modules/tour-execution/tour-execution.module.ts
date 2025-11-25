import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { ProblemFormComponent } from './problem-form/problem-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TouristQuizListComponent } from './quizzes/tourist-quiz-list.component';
import { TouristQuizSolveComponent } from './quizzes/tourist-quiz-solve.component';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ProblemListComponent,
    ProblemFormComponent,
    TouristQuizListComponent,
    TouristQuizSolveComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ProblemListComponent,
    ProblemFormComponent,
    TouristQuizListComponent,
    TouristQuizSolveComponent
  ]
})
export class TourExecutionModule { }
