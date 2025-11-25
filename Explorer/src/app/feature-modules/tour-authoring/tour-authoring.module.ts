import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { TourComponent } from './authoring/tours/tour.component';
import { TourFormComponent } from './authoring/tour-form/tour-form.component';
import { AuthorQuizEditComponent, AuthorQuizListComponent } from './authoring/quizzes';

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
    MatCheckboxModule,
    MatSelectModule
  ],
  exports: [
    TourComponent,
    TourFormComponent,
    AuthorQuizListComponent,
    AuthorQuizEditComponent
  ]
})
export class TourAuthoringModule { }