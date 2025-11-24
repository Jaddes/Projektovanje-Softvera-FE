import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { EquipmentComponent } from '../../feature-modules/administration/equipment/equipment.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { AnnualAwardsComponent } from '../../feature-modules/administration/annual-awards/annual-awards.component';
import { ClubComponent } from 'src/app/feature-modules/stakeholders/club/club.component';
import { BlogListComponent } from 'src/app/feature-modules/blog/blog-list/blog-list.component';
import { BlogDetailsComponent } from 'src/app/feature-modules/blog/blog-details/blog-details.component';
import { TourComponent } from 'src/app/feature-modules/tour-authoring/authoring/tours/tour.component';
import { TourFormComponent } from 'src/app/feature-modules/tour-authoring/authoring/tour-form/tour-form.component';
import { MonumentsComponent } from 'src/app/feature-modules/administration/monuments/monuments.component';
import { MonumentDetailsComponent } from 'src/app/feature-modules/administration/monuments/monument-details/monument-details.component';
import { ProblemListComponent } from 'src/app/feature-modules/tour-execution/problem-list/problem-list.component';
import { AuthorQuizListComponent } from 'src/app/feature-modules/tour-authoring/authoring/quizzes/author-quiz-list.component';
import { AuthorQuizEditComponent } from 'src/app/feature-modules/tour-authoring/authoring/quizzes/author-quiz-edit.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'stakeholders', loadChildren: () => import('../../feature-modules/stakeholders/stakeholders-module').then(m => m.StakeholdersModule)},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard]},
  {path: 'annual-awards', component: AnnualAwardsComponent, canActivate: [AuthGuard] },
  {path: 'clubs', component: ClubComponent, canActivate: [AuthGuard]},
  {path: 'blog', component: BlogListComponent, canActivate: [AuthGuard],},
  { path: 'blog/:id', component: BlogDetailsComponent, canActivate: [AuthGuard],}, 
  { path: 'author-tours', component: TourComponent, canActivate: [AuthGuard] },
  { path: 'author-tours/form', component: TourFormComponent, canActivate: [AuthGuard] },
  { path: 'author-tours/form/:id', component: TourFormComponent, canActivate: [AuthGuard] },
  { path: 'author/quizzes', component: AuthorQuizListComponent, canActivate: [AuthGuard] },
  { path: 'author/quizzes/create', component: AuthorQuizEditComponent, canActivate: [AuthGuard] },
  { path: 'author/quizzes/:id/edit', component: AuthorQuizEditComponent, canActivate: [AuthGuard] },
  { path: 'monuments', component: MonumentsComponent, canActivate: [AuthGuard] },
  { path: 'monuments/:id', component: MonumentDetailsComponent, canActivate: [AuthGuard] },

  {path: 'problems', component: ProblemListComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }