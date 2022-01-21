export class NewsItem {
	constructor(newsItem, renderMethod) {
		this.renderMethod = renderMethod;
		this.id = newsItem.id;
		this.title = newsItem.webTitle;
		this.img = newsItem.fields.thumbnail;
		this.description = newsItem.fields.trailText;
		this.date = newsItem.fields.firstPublicationDate;
	}

	renderNewsItem() {
		const articleEl = document.createElement('article');
		articleEl.classList.add('news-item');

		const imgEl = document.createElement('img');
		imgEl.classList.add('news-img');
		imgEl.src = `${this.img}`;
    imgEl.addEventListener('click', () => this.renderMethod(this.id));
	
		const titleEl = document.createElement('h3');
		titleEl.classList.add('news-item__title');

		let titleMaxLength = 34;
		if (this.title.length > titleMaxLength) {
			let shortTitle = this.title.slice(0, 32);
			titleEl.innerHTML = `${shortTitle}...`;
		} else {
			titleEl.innerHTML = `${this.title}`;
		}
    titleEl.addEventListener('click', () => this.renderMethod(this.id));

		const descriptionEl = document.createElement('p');
		descriptionEl.classList.add('news-item__description');
		descriptionEl.innerHTML = `${this.description}`;

		const dateEl = document.createElement('time');
		dateEl.classList.add('news-item__date');
		dateEl.innerHTML = `${new Date(this.date).toDateString()}`;

		const buttonEl = document.createElement('button');
		buttonEl.classList.add('read__more--btn');
		buttonEl.innerHTML = 'Read more';
    buttonEl.addEventListener('click', () => this.renderMethod(this.id));

		articleEl.appendChild(imgEl);
		articleEl.appendChild(titleEl);
		articleEl.appendChild(descriptionEl);
		articleEl.appendChild(dateEl);
		articleEl.appendChild(buttonEl);
		return articleEl;
	}
}
