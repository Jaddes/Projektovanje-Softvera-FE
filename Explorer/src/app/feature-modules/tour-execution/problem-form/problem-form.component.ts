import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Problem } from '../model/problem.model';
import { TourExecutionService } from '../tour-execution.service';

@Component({
  selector: 'xp-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.css']
})
export class ProblemFormComponent implements OnChanges {
  @Input() problem: Problem;
  @Input() shouldEdit: boolean = false;
  @Output() problemUpdated = new EventEmitter<void>();

  problemForm = new FormGroup({
    tourId: new FormControl<number | null>(null, [Validators.required]),
    category: new FormControl<number | null>(0, [Validators.required]),
    priority: new FormControl<number | null>(0, [Validators.required]),
    description: new FormControl<string | null>('', [Validators.required, Validators.minLength(10)])
  });

  constructor(private service: TourExecutionService) {}

  ngOnChanges(): void {
    if (this.shouldEdit && this.problem) {
      this.problemForm.patchValue({
        tourId: this.problem.tourId,
        category: this.problem.category,
        priority: this.problem.priority,
        description: this.problem.description
      });
    } else {
      this.problemForm.reset();
      this.problemForm.patchValue({
        category: 0,
        priority: 0
      });
    }
  }

  onSubmit(): void {
    if (this.problemForm.valid) {
      const problemData: Problem = {
        tourId: this.problemForm.value.tourId || 0,
        category: this.problemForm.value.category || 0,
        priority: this.problemForm.value.priority || 0,
        description: this.problemForm.value.description || '',
        reportedAt: new Date()
      };

      if (this.shouldEdit && this.problem) {
        // Edit existing problem
        problemData.id = this.problem.id;
        this.service.updateProblem(problemData).subscribe({
          next: () => {
            this.problemUpdated.emit();
            this.problemForm.reset();
          },
          error: (err) => {
            console.error('Error updating problem:', err);
            alert('Error updating problem!');
          }
        });
      } else {
        // Create new problem
        this.service.createProblem(problemData).subscribe({
          next: () => {
            this.problemUpdated.emit();
            this.problemForm.reset();
          },
          error: (err) => {
            console.error('Error creating problem:', err);
            alert('Error creating problem!');
          }
        });
      }
    } else {
      alert('Please fill in all required fields!');
    }
  }

  onCancel(): void {
    this.problemForm.reset();
    this.problemUpdated.emit();
  }
}