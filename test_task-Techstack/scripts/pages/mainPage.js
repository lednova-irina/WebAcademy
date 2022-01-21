import NewsServiceInstance from '../services/news-service.js';
import { store } from '../store/news-store.js';
import { ArticleItem } from './articleItem.js';
import { Header } from './header.js';
import { NewsItem } from './newsItem.js';

export class MainPage {
	constructor() {}

	init() {
		this.header = new Header();
		this.header.titleClick.subscribe(() => {
      this.showArcticle(false);
      this.showNews(true);
		});
		this.header.init();
		NewsServiceInstance.newsLoaded.subscribe(() => {
			this.renderNewsList();
		});
		NewsServiceInstance.loadNews();
	}

	showNews(isVisible) {
		const articleEl = document.querySelector('.news__page');

		if (!isVisible) {
			articleEl.classList.add('hidden');
		} else {
			articleEl.classList.remove('hidden');
		}
	}

	showArcticle(isVisible) {
		const newsEl = document.querySelector('.article__page');
		if (!isVisible) {
			newsEl.classList.add('hidden');
		} else {
			newsEl.classList.remove('hidden');
		}
	}

	renderNewsList() {
		this.showArcticle(false);
		this.showNews(true);

		const topNewsEl = document.querySelector('.top-news');
		const newsListEl = document.querySelector('.news-list');
		const news = store.news;
		newsListEl.replaceChildren([]);
		topNewsEl.replaceChildren([]);

		const topItemData = news[0];
		topNewsEl.appendChild(new NewsItem(topItemData, this.renderArticle.bind(this)).renderNewsItem());

		for (let i = 1; i < news.length; i++) {
			const newsItemData = news[i];
			newsListEl.appendChild(new NewsItem(newsItemData, this.renderArticle.bind(this)).renderNewsItem());
		}
	}

	renderArticle(id) {
		this.showNews(false);
		this.showArcticle(true);

		const article = store.news.find((item) => item.id === id);
		const topNewsEl = document.querySelector('.article__page');
    topNewsEl.replaceChildren([]);
		if (article) {
			const articleEl = new ArticleItem(article).renderArticleItem();
			topNewsEl.appendChild(articleEl);
		}
	}
}
