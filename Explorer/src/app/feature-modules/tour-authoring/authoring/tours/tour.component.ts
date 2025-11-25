import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour, TourStatus, TourDifficulty } from '../model/tours.model';
import { TourAuthoringService } from '../../tour-authoring.service';

@Component({
  selector: 'xp-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  draftTours: Tour[] = [];
  confirmedTours: Tour[] = [];

  constructor(private service: TourAuthoringService, private router: Router) { }

  ngOnInit(): void {
    this.getTours();
  }

  formatDifficulty(d: TourDifficulty | number): string {
    return (TourDifficulty as any)[d] ?? String(d);
  }

  getTours(): void {
    this.service.getTours().subscribe({
      next: (result: Tour[]) => {
        console.log('GET /authoring/tours response', result);
        this.draftTours = [];
        this.confirmedTours = [];
        (result || []).forEach(t => {
          if (t.status === TourStatus.Draft) {
            this.draftTours.push(t);
          } else {
            this.confirmedTours.push(t);
          }
        });
      },
      error: (err) => { console.error('Failed to load tours', err); }
    })
  }

  deleteTour(id: number): void {
    this.service.deleteTour(id).subscribe({ next: () => this.getTours() });
  }

  onEditClicked(t: Tour): void {
    this.router.navigate(['/author-tours', 'form', t.id]);
  }

  onAddClicked(): void {
    this.router.navigate(['/author-tours/form']);
  }

  confirmTour(t: Tour): void {
    t.status = TourStatus.Confirmed;
    this.service.updateTour(t).subscribe({
        next: (res) => { console.log('Confirmation success', res); this.getTours();},
        error: (err) => { console.error('Confirmation failed', err); }
      });
  }

}
