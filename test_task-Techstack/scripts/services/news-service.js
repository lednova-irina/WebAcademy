import { EventObserver } from "../helpers/observer.js";
import { store } from "../store/news-store.js";

export class NewsService {
  constructor(url) {
    this.url = url;
    this.newsLoaded = new EventObserver();
  }
  getNews(pageSize, category) {
    return fetch(
      `${this.url}search?q=${category}&show-tags=all&page-size=${pageSize}&show-fields=all&order-by=relevance&api-key=5ef33414-1934-47dc-9892-5d09ab7c00da`
    ).then((response) => response.json());
  }

  loadNews(reload = false) {
    const { pageSize, category } = store.filterOptions;
    return this.getNews(pageSize, category).then((result) => {
      reload === true
        ? (store.news = result.response.results)
        : store.news.push(...result.response.results);
      this.newsLoaded.publish();
    });
  }

  reloadNews() {
      return this.loadNews(true);
  }
}

const instance = new NewsService("https://content.guardianapis.com/");
export default instance;
