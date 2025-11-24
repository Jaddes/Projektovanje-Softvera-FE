import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { StakeholdersRoutingModule } from './stakeholders-routing.module';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClubComponent } from './club/club.component';
import { ClubFormComponent } from './club-form/club-form.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ClubComponent,
    ClubFormComponent
  ],
  imports: [
    CommonModule,
    StakeholdersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
    ],
  exports: [
    ClubComponent
  ]
})
export class StakeholdersModule { }
