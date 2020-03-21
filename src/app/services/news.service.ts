import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
	'X-Api-key': apiKey
})

@Injectable({
  providedIn: 'root'
})
export class NewsService {

	constructor(private http: HttpClient) { }

	page = 0;

	actualCategory = '';
	categoryPage = 0;

	private execQuery<T>(query: string) {
		return this.http.get<T>(`${ apiUrl + query}`, { headers })
	}

	public getTopHeadlines() {
		this.page ++;
		return this.execQuery<ResponseTopHeadlines>(`/top-headlines?country=us&page=${this.page}`)
	}
   
	public getTopHeadlinesCategory(category: string) {
		if(category === this.actualCategory) {
			this.categoryPage++;
		} else {
			this.categoryPage = 1;
			this.actualCategory = category;
		}
		return this.execQuery<ResponseTopHeadlines>(`/top-headlines?country=us&category=${category}&page=${this.categoryPage}`)
	}
}
