import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour, TourDifficulty, TourStatus } from '../model/tours.model';
import { TourAuthoringService } from '../../tour-authoring.service';

@Component({
  selector: 'xp-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css']
})
export class TourFormComponent implements OnInit {

  tourForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    difficulty: new FormControl(TourDifficulty.Easy, [Validators.required]),
    tags: new FormControl(''),
    price: new FormControl(0, [Validators.required])
  });

  difficulties = [
    { value: TourDifficulty.Easy, label: 'Easy' },
    { value: TourDifficulty.Medium, label: 'Medium' },
    { value: TourDifficulty.Hard, label: 'Hard' }
  ];
  isEdit: boolean = false;
  tourId?: number;
  originalStatus?: TourStatus;

  constructor(
    private service: TourAuthoringService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      if (!isNaN(id)) {
        this.isEdit = true;
        this.tourId = id;
        this.service.getTour(id).subscribe({
          next: (t: Tour) => {
            if (t) {
              this.originalStatus = t.status;
              this.tourForm.patchValue({
                name: t.name,
                description: t.description,
                difficulty: t.difficulty,
                tags: (t.tags || []).join(', '),
                price: t.price
              });
            }
          }
        });
      }
    }
  }

  onSave(): void {
    const form = this.tourForm.value;
    const statusToUse = this.isEdit ? (this.originalStatus ?? TourStatus.Draft) : TourStatus.Draft;
    const tour: Tour = {
      name: form.name || '',
      description: form.description || '',
      difficulty: form.difficulty ?? TourDifficulty.Easy,
      status: statusToUse,
      tags: (form.tags || '').split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0),
      price: Number(form.price) || 0
    };

    console.log('Saving tour (frontend object):', tour);

    if (this.isEdit && this.tourId) {
      tour.id = this.tourId;
      this.service.updateTour(tour).subscribe({
        next: (res) => { console.log('Update success', res); this.router.navigate(['/author-tours']); },
        error: (err) => { console.error('Update failed', err); }
      });
    } else {
      this.service.addTour(tour).subscribe({
        next: (res) => { console.log('Add success', res); this.router.navigate(['/author-tours']); },
        error: (err) => { console.error('Add failed', err); }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/author-tours']);
  }

}
