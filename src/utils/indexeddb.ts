import {
  DestinyManifestSlice,
  getAllDestinyManifestComponents,
  getDestinyManifest,
} from "bungie-api-ts/destiny2";
import Dexie, { Table } from "dexie";
import _ from "underscore";
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
  const version = manifest.jsonWorldContentPaths.en;

  await manifestDb.manifest.get(version!).then((m) => {
    if (m?.version === version) {
      console.log(`Manifest exists for version ${version}`);
    } else {
      manifestDb.manifest.clear();

      console.log(
        `Manifest version ${version} is new. Downloading manifest from Bungie...`
      );

      return new Promise<ManifestDefinitions>(async (resolve, reject) => {
        getAllDestinyManifestComponents(httpClient, {
          destinyManifest: manifest,
          language: "en",
        })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
        .then((data) => {
          console.log("Manifest found. Populating database...");

          const requiredDefinitions = [
            "DestinyStatDefinition",
            "DestinyClassDefinition",
            "DestinyRecordDefinition",
            "DestinyRaceDefinition",
          ];

          const definitions = _.pick(data, requiredDefinitions);

          return manifestDb.manifest.add({
            version: version!,
            definitions: definitions,
          });
        })
        .then(() => console.log("Finished populating database with manifest."));
    }
  });
});
