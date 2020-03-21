import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

	public news: Article[] = [];

	constructor(private storage: Storage) {
		
	}

	saveNew(newsItem: Article) {
		
		const exists = this.news.find(news => news.title === newsItem.title )
		if(exists) return;
		this.news.unshift(newsItem);
		this.storage.set('favorites',  this.news);
	}

	deleteNew( newsItem: Article) {
		this.news = this.news.filter(news => news.title !== newsItem.title);
		this.storage.set('favorites',  this.news);
	}

	async loadFavorites(){
		const favorites = await this.storage.get('favorites');
		if(favorites) {
			this.news = favorites;
		}
	}


}
