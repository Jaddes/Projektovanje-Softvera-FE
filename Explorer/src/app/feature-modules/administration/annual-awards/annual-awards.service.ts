import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../env/environment';
import { PagedResults } from '../../../shared/model/paged-results.model';
import { AnnualAward } from '../model/annual-awards.model';

@Injectable({
  providedIn: 'root'
})
export class AnnualAwardsService {

  private readonly baseUrl = environment.apiHost + 'administration/annual-awards';
  
    constructor(private http: HttpClient) { }
  
    getAnnualAwards(page: number, pageSize: number): Observable<PagedResults<AnnualAward>>
    {
      const params = new HttpParams().set('page', page).set('pageSize', pageSize);
      return this.http.get<PagedResults<AnnualAward>>(this.baseUrl, {params});
    }
  
    getAnnualAward(id: number): Observable<AnnualAward>
    {
      return this.http.get<AnnualAward>(`${this.baseUrl}/${id}`);
    }
  
    createAnnualAward(award: AnnualAward): Observable<AnnualAward>
    {
      return this.http.post<AnnualAward>(this.baseUrl, award);
    }
  
    updateAnnualAward(award: AnnualAward): Observable<AnnualAward> {
      return this.http.put<AnnualAward>(`${this.baseUrl}/${award.id}`, award);
    }
  
    deleteAward(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
