import { Component, OnInit } from '@angular/core';
import { AnnualAwardsService } from './annual-awards.service';
import { AnnualAward } from '../model/annual-awards.model';


@Component({
  selector: 'xp-annual-awards',
  templateUrl: './annual-awards.component.html',
  styleUrls: ['./annual-awards.component.css']
})
export class AnnualAwardsComponent implements OnInit{

  awards: AnnualAward[] = [];
  totalCount = 0;

  page = 0;
  pageSize = 10;

  shouldRenderAwardForm = false;
  shouldEdit = false;
  selectedAward: AnnualAward | null = null;

  constructor(private annualAwardsService: AnnualAwardsService) {}

  ngOnInit(): void {
    this.loadAwards();
  }

  loadAwards() : void {
    this.annualAwardsService.getAnnualAwards(this.page, this.pageSize).subscribe({
      next: (res) => {
        this.awards = res.results;       
        this.totalCount = res.totalCount;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  
  getStatusLabel(status: number): string {
    switch (status) {
      case 0: return 'Draft';
      case 1: return 'Open for voting';
      case 2: return 'Closed';
      default: return status?.toString() ?? '';
    }
  }

  onAddClicked(): void {
    this.selectedAward = null;
    this.shouldEdit = false;
    this.shouldRenderAwardForm = true;
  }

  onEditClicked(award: AnnualAward): void {
    this.selectedAward = { ...award };
    this.shouldEdit = true;
    this.shouldRenderAwardForm = true;
  }

  deleteAward(id: number): void {
    this.annualAwardsService.deleteAward(id).subscribe({
      next: () => {
        this.loadAwards();
      },
      error: (err) => {
        console.error('Error while deleting annual award', err);
      }
    });
  }
}
