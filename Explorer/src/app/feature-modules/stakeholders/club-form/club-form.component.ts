import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StakeholdersService } from '../stakeholders.service';
import { Club } from '../model/club.model';

@Component({
  selector: 'xp-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.css']
})
export class ClubFormComponent implements OnChanges {

  @Input() club: Club;
  @Input() shouldEdit: boolean = false;
  @Output() clubUpdated = new EventEmitter<null>();

  constructor(private service: StakeholdersService) { }

  clubForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageUris: new FormControl('', [Validators.required])
  });

  ngOnChanges(): void {
    this.clubForm.reset();
    if (this.shouldEdit) {
      const clubToPatch = {
        name: this.club.name,
        description: this.club.description,
        imageUris: this.club.imageUris.join(', ') 
      };
      this.clubForm.patchValue(clubToPatch);
    }
  }

  addClub(): void {
    const club: Club = {
      name: this.clubForm.value.name || "",
      description: this.clubForm.value.description || "",
      imageUris: (this.clubForm.value.imageUris || "").split(',').map((uri: string) => uri.trim()),
      ownerId: 0 
    };
    
    this.service.addClub(club).subscribe({
      next: () => {
        this.clubUpdated.emit();
        this.clubForm.reset(); 
      }
    });
  }

  updateClub(): void {
    const club: Club = {
      id: this.club.id,
      name: this.clubForm.value.name || "",
      description: this.clubForm.value.description || "",
      imageUris: (this.clubForm.value.imageUris || "").split(',').map((uri: string) => uri.trim()),
      ownerId: this.club.ownerId
    };
    
    this.service.updateClub(club).subscribe({
      next: () => {
        this.clubUpdated.emit();
        this.clubForm.reset(); 
      }
    });
  }
}