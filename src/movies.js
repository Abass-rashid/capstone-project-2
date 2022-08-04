/* /*eslint-disable */
const baseUrl = 'https://api.tvmaze.com/shows';
const likeUrl =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/OfwDnSwkDuWyZ8m9hUY4/likes/';

export default class Movies {
  constructor() {
    this.movieList = [];
  }

  async getMovie(id) {
    const request = await fetch(`${baseUrl}/${id}`);
    const data = await request.json();
    return data;
  }

  async getLikes() {
    const request = await fetch(likeUrl);
    const data = await request.json();
    return data;
  }

  async getMovies() {
    const likesList = await this.getLikes();
    for (let i = 0; i < 6; i += 1) {
      const film = await this.getMovie(i + 8);
      this.movieList[i] = film;
      this.movieList[i].likes = 0;
    }
    likesList.forEach((like) => {
      const i = parseInt(like.item_id, 10);
      this.movieList.forEach((movie) => {
        if (movie.id === i) {
          movie.likes = like.likes;
        }
      });
    });
  }
}
