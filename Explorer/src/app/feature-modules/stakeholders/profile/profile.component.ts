import { Component, OnInit } from '@angular/core';
import { StakeholdersService } from '../stakeholders.service';
import { UserProfileDto } from '../model/user-profile.model';

@Component({
  selector: 'xp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  profile: UserProfileDto;
  isEditing: boolean = false;

  constructor(
    private stakeholdersService: StakeholdersService
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.stakeholdersService.getProfile().subscribe({
      next: (profile: UserProfileDto) => {
        this.profile = profile;
      },
      error: (err) => {
        console.error('Failed to get profile', err);
      }
    });
  }

  onEdit(): void {
    this.isEditing = true;
  }

  onCancel(): void {
    this.isEditing = false;
    this.getProfile();
  }

  onSave(): void {
    this.stakeholdersService.updateProfile(this.profile).subscribe({
      next: (updatedProfile) => {
        this.profile = updatedProfile;
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Failed to update profile', err);
      }
    });
  }
}
