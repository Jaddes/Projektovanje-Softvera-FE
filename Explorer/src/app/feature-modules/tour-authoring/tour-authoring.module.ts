import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TourComponent } from './authoring/tours/tour.component';
import { TourFormComponent } from './authoring/tour-form/tour-form.component';
import { AuthorQuizListComponent } from './authoring/quizzes/author-quiz-list.component';
import { AuthorQuizEditComponent } from './authoring/quizzes/author-quiz-edit.component';

@NgModule({
  declarations: [
    TourComponent,
    TourFormComponent,
    AuthorQuizListComponent,
    AuthorQuizEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule
  ],
  exports: [
    TourComponent,
    TourFormComponent,
    AuthorQuizListComponent,
    AuthorQuizEditComponent
  ]
})
export class TourAuthoringModule { }