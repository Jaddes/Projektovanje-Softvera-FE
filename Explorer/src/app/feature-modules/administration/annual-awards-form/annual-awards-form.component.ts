import { Component, EventEmitter, OnChanges, Output, Input } from '@angular/core';
import { AnnualAward } from '../model/annual-awards.model';
import { AnnualAwardsService } from '../annual-awards/annual-awards.service';
import { FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'xp-annual-awards-form',
  templateUrl: './annual-awards-form.component.html',
  styleUrls: ['./annual-awards-form.component.css']
})
export class AnnualAwardsFormComponent {

  annualAwardForm = new FormGroup({
  id: new FormControl,
  name: new FormControl('', Validators.required),
  description: new FormControl(''),
  year: new FormControl(new Date().getFullYear()),
  status: new FormControl(0),
  votingStartDate: new FormControl<string | null>(null),
  votingEndDate: new FormControl<string | null>(null)
});

  @Input() shouldEdit = false;
  @Input() award: AnnualAward;
  @Output() annualAwardUpdated = new EventEmitter<null>();

  constructor(
    private annualAwardsService: AnnualAwardsService
  ) {}

  ngOnChanges(): void {
    this.annualAwardForm.reset();
    if(this.shouldEdit) {
      this.annualAwardForm.patchValue(this.award);
    }
  }

  onSubmit() {
    if (this.annualAwardForm.invalid) return;
    
    const raw = this.annualAwardForm.getRawValue(); 
    const { id, ...rest } = raw;

    if (this.shouldEdit) {
      this.updateAward({...rest, id});
    } else {
      this.addAward(rest);
    }
  }

  addAward(dto: any): void {
  console.log('Add DTO:', dto);

  this.annualAwardsService.createAnnualAward(dto).subscribe({
    next: () => {
      this.annualAwardForm.reset({
        name: '',
        description: '',
        year: new Date().getFullYear(),
        status: 0,
        votingStartDate: null,
        votingEndDate: null
      });

      this.shouldEdit = false;
    },
    error: (err) => {
      console.error('Greška prilikom kreiranja nagrade', err);
    }
  });
}

updateAward(dto: any): void {
  console.log('Update DTO:', dto);

  if (!dto.id) {
    console.error('Nema ID-a za update!');
    return;
  }

  this.annualAwardsService.updateAnnualAward(dto).subscribe({
    next: () => {

      this.annualAwardForm.reset({
        id: null,
        name: '',
        description: '',
        year: new Date().getFullYear(),
        status: 0,
        votingStartDate: null,
        votingEndDate: null
      });

      this.shouldEdit = false;
    },
    error: (err) => {
      console.error('Greška prilikom ažuriranja nagrade', err);
    }
  });
}
  
}
