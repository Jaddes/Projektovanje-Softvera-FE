import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AnnualAwardsComponent } from './annual-awards/annual-awards.component';
import { AnnualAwardsFormComponent } from './annual-awards-form/annual-awards-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule} from '@angular/forms';
import { MonumentsComponent } from './monuments/monuments.component';
import { MonumentDetailsComponent } from './monuments/monument-details/monument-details.component';
import { EditMonumentComponent } from './edit-monuments/edit-monument.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    EquipmentFormComponent,
    EquipmentComponent,
    AnnualAwardsComponent,
    AnnualAwardsFormComponent,
    MonumentsComponent,
    MonumentDetailsComponent,
    EditMonumentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule
  ],
  exports: [
    EquipmentComponent,
    EquipmentFormComponent,
    AnnualAwardsComponent
  ]
})
export class AdministrationModule { }
