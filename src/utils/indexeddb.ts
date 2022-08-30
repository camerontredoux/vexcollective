import {
  DestinyManifestSlice,
  getDestinyManifest,
  getDestinyManifestSlice,
} from "bungie-api-ts/destiny2";
import Dexie, { Table } from "dexie";
import { httpClient } from "./misc";

export type ManifestDefinitions = DestinyManifestSlice<
  (
    | "DestinyStatDefinition"
    | "DestinyClassDefinition"
    | "DestinyRecordDefinition"
    | "DestinyRaceDefinition"
  )[]
>;

interface IManifestDb {
  version: string;
  definitions: DestinyManifestSlice<any>;
}

export class ManifestDb extends Dexie {
  manifest!: Table<IManifestDb, string>;

  constructor() {
    super("ManifestDb");
    this.version(1).stores({
      manifest: "version",
    });
  }
}

export const manifestDb = new ManifestDb();

manifestDb.on("ready", async () => {
  const manifest = (await getDestinyManifest(httpClient)).Response;
  const version = manifest.version;

  await manifestDb.manifest.get(version).then((m) => {
    if (m?.version === version) {
      console.log(`Manifest exists for version ${version}`);
    } else {
      console.log(
        `Manifest version ${version} is new. Download manifest from Bungie...`
      );

      return new Promise<ManifestDefinitions>(async (resolve, reject) => {
        getDestinyManifestSlice(httpClient, {
          destinyManifest: manifest,
          language: "en",
          tableNames: [
            "DestinyStatDefinition",
            "DestinyClassDefinition",
            "DestinyRecordDefinition",
            "DestinyRaceDefinition",
          ],
        })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
        .then((data) => {
          console.log("Manifest found. Populating database...");

          return manifestDb.manifest.add({ version, definitions: data });
        })
        .then(() => console.log("Finished populating database with manifest."));
    }
  });
});
