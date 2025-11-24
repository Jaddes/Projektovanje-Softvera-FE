import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileDto } from './model/user-profile.model';
import { environment } from 'src/env/environment';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Club } from './model/club.model';

@Injectable({
  providedIn: 'root'
})
export class StakeholdersService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfileDto> {
    return this.http.get<UserProfileDto>(environment.apiHost + 'profile');
  }

  updateProfile(profile: UserProfileDto): Observable<UserProfileDto> {
    return this.http.put<UserProfileDto>(environment.apiHost + 'profile', profile);
  }

 getClubs(): Observable<Club[]> {
  return this.http.get<Club[]>(environment.apiHost + 'community/clubs');
}

  deleteClub(id: number): Observable<Club> {
    return this.http.delete<Club>(environment.apiHost + 'community/clubs/' + id);
  }

  addClub(club: Club): Observable<Club> {
    return this.http.post<Club>(environment.apiHost + 'community/clubs', club);
  }

  updateClub(club: Club): Observable<Club> {
    return this.http.put<Club>(environment.apiHost + 'community/clubs/' + club.id, club);
  }
}
