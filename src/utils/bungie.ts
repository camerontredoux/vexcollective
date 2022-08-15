export default class Bungie {
  private apiKey: string;
  private basePath: string = "https://www.bungie.net/Platform";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchAPI(endpoint: string, body?: any): Promise<any> {
    const init: RequestInit = {
      headers: {
        "X-API-Key": this.apiKey,
      },
    };

    if (body) {
      init.method = "POST";
      init.body = body;
    }

    return await fetch(`${this.basePath}/${endpoint}`, init);
  }
}
