import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { ResponseTopHeadlines, Article } from '../../interfaces/interfaces';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

	categories: any = ['health', 'entertainment', 'science', 'sports', 'technology'];
	news: Article[] = [];
	category: string = this.categories[0];

	constructor(private newsService: NewsService) { }

	
	ngOnInit() {	
		this.loadNews(this.category)
	}
	
	segmentChanged(event: any) { 
		this.news = [];
		this.category = event.detail.value;
		this.loadNews(this.category);
	}

	loadNews(categoria: string, event? : any) {
		this.newsService.getTopHeadlinesCategory(categoria)
		.subscribe((data: ResponseTopHeadlines) => {
			
			if(data.articles.length === 0) {
				event.target.disabled = true;
			}

			this.news.push(... data.articles);

			if(event) {
				event.target.complete();
			}
			
		});
	}

	loadData(event: any) {
		this.loadNews(this.category, event);
	}
}
