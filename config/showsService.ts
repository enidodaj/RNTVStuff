import { Api } from "./api";

class ShowsService extends Api {
  public getShowResults = (q: string) => this.instance.get('search/shows', {
    params: {
      q
    }
  });

  public getSeasons = (showId: string | number) => this.instance.get(`shows/${showId}/seasons`);

  public getEpisodes = (showId: string | number) => this.instance.get(`shows/${showId}/episodes`);
}

export {ShowsService};