import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Monument } from './model/monuments.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Injectable({
  providedIn: 'root'
})
export class MonumentsService {

  constructor(private http: HttpClient) { }

  getMonuments(): Observable<PagedResults<Monument>> {
    return this.getMonumentsPaged(1, 100);
  }

  getMonumentsPaged(page: number, pageSize: number): Observable<PagedResults<Monument>> {
    const url = `${environment.apiHost}administration/monuments?page=${page}&pageSize=${pageSize}`;
    return this.http.get<PagedResults<Monument>>(url);
  }

  getMonument(id: number): Observable<Monument> {
    return this.http.get<Monument>(`${environment.apiHost}administration/monuments/${id}`);
  }

  deleteMonument(id: number): Observable<Monument> {
    return this.http.delete<Monument>(`${environment.apiHost}administration/monuments/${id}`);
  }

  addMonument(monument: Monument): Observable<Monument> {
    const payload: any = {
      Name: monument.name,
      Description: monument.description,
      YearOfOrigin: monument.yearOfOrigin,
      Status: monument.status || 'active',
      LocationLatitude: monument.locationLatitude,
      LocationLongitude: monument.locationLongitude
    };
    console.log('POST payload', { monument: payload });
    return this.http.post<Monument>(`${environment.apiHost}administration/monuments`, payload);
  }

  updateMonument(monument: Monument): Observable<Monument> {
    const payload: any = {
      Id: monument.id,
      Name: monument.name,
      Description: monument.description,
      YearOfOrigin: monument.yearOfOrigin,
      Status: monument.status,
      LocationLatitude: monument.locationLatitude,
      LocationLongitude: monument.locationLongitude
    };
    console.log('PUT payload', { monument: payload });
    return this.http.put<Monument>(`${environment.apiHost}administration/monuments/${monument.id}`, payload);
  }

}
