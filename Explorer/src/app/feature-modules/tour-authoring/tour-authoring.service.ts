import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tour } from './authoring/model/tour.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Injectable({
	providedIn: 'root'
})
export class TourAuthoringService {

	constructor(private http: HttpClient) { }

	getTours(): Observable<Tour[]> {
  return this.http.get<Tour[]>(`${environment.apiHost}authoring/tours/`);
	}

	getToursPaged(page: number, pageSize: number): Observable<PagedResults<Tour>> {
		const url = `${environment.apiHost}authoring/tours?page=${page}&pageSize=${pageSize}`;
		return this.http.get<PagedResults<Tour>>(url);
	}

	getTour(id: number): Observable<Tour> {
		return this.http.get<Tour>(environment.apiHost + 'authoring/tours/' + id);
	}

	deleteTour(id: number): Observable<Tour> {
		return this.http.delete<Tour>(environment.apiHost + 'authoring/tours/' + id);
	}

	addTour(tour: Tour): Observable<Tour> {
		const payload: any = {
			Name: tour.name,
			Description: tour.description,
			Difficulty: tour.difficulty,
			Status: tour.status,
			Tags: tour.tags,
			Price: tour.price
		};
		console.log('POST payload', { tour: payload });
		return this.http.post<Tour>(environment.apiHost + 'authoring/tours', payload);
	}

	updateTour(tour: Tour): Observable<Tour> {
		const payload: any = {
			Id: tour.id,
			Name: tour.name,
			Description: tour.description,
			Difficulty: tour.difficulty,
			Status: tour.status,
			Tags: tour.tags,
			Price: tour.price
		};
		console.log('PUT payload', { tour: payload });
		return this.http.put<Tour>(environment.apiHost + 'authoring/tours/' + tour.id, payload);
	}

}

