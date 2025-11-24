import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Component, OnInit } from '@angular/core';
import { StakeholdersService } from '../stakeholders.service'; 
import { Club } from '../model/club.model'; 
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-club', 
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})

export class ClubComponent implements OnInit {

  clubs: Club[] = [];
  user: User;
  selectedClub: Club;
  shouldRenderClubForm: boolean = false;
  shouldEdit: boolean = false;

  constructor(private service: StakeholdersService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getClubs(); 
  }

  getClubs(): void {
    this.service.getClubs().subscribe({
      next: (result: Club[]) => {
        this.clubs = result; 
      },
      error: (err: any) => {
        console.log(err); 
      }
    });
  }
  deleteClub(id: number): void {
  this.service.deleteClub(id).subscribe({
    next: () => {
      this.getClubs(); 
    },
    error: (err: any) => {
      console.log(err);
    }
  });
}
isOwner(ownerId: number): boolean {
  return this.user?.id === ownerId;
}
onEditClicked(club: Club): void {
  this.selectedClub = club;
  this.shouldRenderClubForm = true;
  this.shouldEdit = true;
}

onAddClicked(): void {
  this.shouldEdit = false;
  this.shouldRenderClubForm = true;
}
}