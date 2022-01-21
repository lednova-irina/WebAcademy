export class ArticleItem {
	constructor(articleItem) {
		this.id = articleItem.id;
		this.img = articleItem.fields.thumbnail;
		this.title = articleItem.webTitle;
		this.writer = articleItem.fields.byline;
		this.date = articleItem.fields.firstPublicationDate;
		this.bodyText = articleItem.fields.bodyText;
	}

	renderArticleItem() {
		const articleEl = document.createElement('article');
		articleEl.classList.add('article-item');

		const imgEl = document.createElement('img');
		imgEl.classList.add('article-img');
		imgEl.src = `${this.img}`;

		const titleEl = document.createElement('h3');
		titleEl.classList.add('article-item__title');
		titleEl.innerHTML = `${this.title}`;

		const wrapperEl = document.createElement('div');
		wrapperEl.classList.add('article-item-data__wrapper');

		const writerEl = document.createElement('p');
		writerEl.classList.add('article-writer');
		writerEl.innerHTML = `${this.writer}`;

		const dateEl = document.createElement('time');
		dateEl.classList.add('article-item__date');
		dateEl.innerHTML = `${new Date(this.date).toDateString()}`;

        wrapperEl.appendChild(writerEl);
		wrapperEl.appendChild(dateEl);
		
		const descriptionEl = document.createElement('article');
		descriptionEl.classList.add('article-item__description');
		descriptionEl.innerHTML = `${this.bodyText}`;

		articleEl.appendChild(imgEl);
		articleEl.appendChild(titleEl);
		articleEl.appendChild(wrapperEl);
		articleEl.appendChild(descriptionEl);

		return articleEl;
	}
}
