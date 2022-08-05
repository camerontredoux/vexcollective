export default class Bungie {
  private apiKey: string;
  private basePath: string = "https://www.bungie.net/Platform";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async fetchAPI(
    endpoint: string,
    method: string,
    body?: any
  ): Promise<any> {
    const init: RequestInit = {
      method,
      headers: {
        "X-API-Key": this.apiKey,
      },
    };

    if (body) {
      init.body = JSON.stringify(body);
    }

    return await fetch(`${this.basePath}/${endpoint}`, init);
  }

  /**
   * Returns the current version of the manifest as a json object.
   *
   * DestinyManifest is the external-facing contract for just the properties needed by those calling the Destiny Platform.
   * */
  async getDestinyManifest() {
    const data = await this.fetchAPI("Destiny2/Manifest/", "GET");
    const manifest = await data.json();

    return manifest;
  }
}
