import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Monument } from '../model/monuments.model';
import { MonumentsService } from '../monuments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-monument',
  templateUrl: './edit-monument.component.html',
  styleUrls: ['./edit-monument.component.css']
})
export class EditMonumentComponent implements OnInit {
  
  @Input() monument!: Monument;
  @Output() monumentUpdated = new EventEmitter<Monument>();
  @Output() cancelEdit = new EventEmitter<void>();

  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private monumentService: MonumentsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.monument.name, Validators.required],
      description: [this.monument.description],
      yearOfOrigin: [this.monument.yearOfOrigin, this.validateYear],
      locationLatitude: [this.monument.locationLatitude, Validators.required],
      locationLongitude: [this.monument.locationLongitude, Validators.required],
      status: [this.monument.status, Validators.required]
    });
  }

  validateYear(control: AbstractControl) {
    const year = Number(control.value);
    if (!year) return null;
    const current = new Date().getFullYear();
    return year > current ? { futureYear: true } : null;
  }

  save(): void {
    if (this.editForm.invalid) return;

    const updatedMonument: Monument = {
      ...this.monument,
      ...this.editForm.value
    };

    this.monumentService.updateMonument(updatedMonument).subscribe({
      next: (res) => {
        alert('Monument updated successfully');
        this.monumentUpdated.emit(res);
      },
      error: (err) => {
        console.error('Error updating monument:', err);
        alert('Failed to update monument');
      }
    });
  }

  cancel(): void {
    this.cancelEdit.emit();
  }
}
