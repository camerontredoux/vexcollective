export default class Bungie {
  private apiKey: string;
  private basePath: string = "https://www.bungie.net/Platform";
  private carnageReportPath: string = "https://stats.bungie.net/Platform";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchAPI(endpoint: string, pcgr: boolean, body?: any): Promise<any> {
    const init: RequestInit = {
      headers: {
        "X-API-Key": this.apiKey,
        "cache-control": `s-maxage=60, stale-while-revalidate=${60 * 5}`,
      },
    };

    if (body) {
      init.method = "POST";
      init.body = JSON.stringify(body);
    }

    const url = `${pcgr ? this.carnageReportPath : this.basePath}${endpoint}`;

    return await fetch(url, init);
  }

  async getManifest() {
    return await this.fetchAPI("/Destiny2/Manifest", false);
  }
}
