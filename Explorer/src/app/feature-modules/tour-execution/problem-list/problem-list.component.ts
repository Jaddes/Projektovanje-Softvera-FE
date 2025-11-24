import { Component, OnInit } from '@angular/core';
import { TourExecutionService } from 'src/app/feature-modules/tour-execution/tour-execution.service';
import { Problem } from '../model/problem.model';

@Component({
  selector: 'xp-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[] = [];
  selectedProblem: Problem;
  shouldRenderProblemForm: boolean = false;
  shouldEdit: boolean = false;

  constructor(private service: TourExecutionService) { }

  ngOnInit(): void {
    this.getProblems();
  }

  getProblems(): void {
    this.service.getProblems().subscribe({
      next: (result) => {
        this.problems = result;
      },
      error: (err) => {
        console.error('Error loading problems:', err);
      }
    });
  }

  deleteProblem(id: number): void {
    if (confirm('Are you sure you want to delete this problem?')) {
      this.service.deleteProblem(id).subscribe({
        next: () => {
          this.getProblems();
        },
        error: (err) => {
          console.error('Error deleting problem:', err);
        }
      });
    }
  }

  onEditClicked(problem: Problem): void {
    this.selectedProblem = problem;
    this.shouldRenderProblemForm = true;
    this.shouldEdit = true;
  }

  onAddClicked(): void {
    this.selectedProblem = {} as Problem;
    this.shouldEdit = false;
    this.shouldRenderProblemForm = true;
  }

  onProblemUpdated(): void {
    this.shouldRenderProblemForm = false;
    this.getProblems();
  }

  getCategoryName(category: number): string {
    const categories = ['Booking', 'Itinerary', 'Guide', 'Transportation', 'Other'];
    return categories[category] || 'Unknown';
  }

  getPriorityName(priority: number): string {
    const priorities = ['Low', 'Medium', 'High', 'Critical'];
    return priorities[priority] || 'Unknown';
  }

  getPriorityClass(priority: number): string {
    const classes = ['priority-low', 'priority-medium', 'priority-high', 'priority-critical'];
    return classes[priority] || '';
  }
}