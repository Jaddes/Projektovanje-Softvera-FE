import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { ProblemFormComponent } from './problem-form/problem-form.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProblemListComponent,
    ProblemFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ProblemListComponent,
    ProblemFormComponent
  ]
})
export class TourExecutionModule { }