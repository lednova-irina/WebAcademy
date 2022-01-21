import { store } from '../store/news-store.js';
import NewsServiceInstance from '../services/news-service.js';
import { EventObserver } from '../helpers/observer.js';

export class Header {
	constructor() {
		this.titleClick = new EventObserver();
	}
	init() {
		const categories = document.querySelector('.header__categories-list').children;

		const title = document.getElementById('main-title');
		title.addEventListener('click', () => this.titleClick.publish());

		const trendingNews = document.querySelector('#trending-news__btn');

		const categoryItems = [ ...categories, trendingNews ];

		for (let i = 0; i < categoryItems.length; i++) {
			const categoryItem = categoryItems[i];
			categoryItem.addEventListener('click', (event) => {
				event.preventDefault();
				this.setCategory(categoryItem.dataset.category);
				NewsServiceInstance.reloadNews();
			});
		}
		this.categoriesIsVisible();
	}

	categoriesIsVisible() {
		const menuBtn = document.querySelector('.header__btn--toggle');
		const toggleBtn = document.getElementById('toggle');
		let menuIsOpen = document.querySelector('.news__categories');
		menuBtn.addEventListener('click', () => {
			if (toggleBtn.checked) {
				menuIsOpen.classList.add('open');
			} else {
				menuIsOpen.classList.remove('open');
			}
		});
	}

	setCategory(category) {
		store.filterOptions.category = category;
	}
}
