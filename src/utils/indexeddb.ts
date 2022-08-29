import {
  DestinyManifest,
  getDestinyManifest,
  getDestinyManifestSlice,
} from "bungie-api-ts/destiny2";
import Dexie, { Table } from "dexie";
import { httpClient } from "./misc";

interface IManifest {
  hash: string;
  value: any;
}

interface IManifestVersion {
  manifestVersion: string;
}

export class Manifest extends Dexie {
  stats!: Table<IManifest, string>;
  records!: Table<IManifest, string>;
  race!: Table<IManifest, string>;
  gender!: Table<IManifest, string>;

  constructor() {
    super("Manifest");
    this.version(1).stores({
      stats: "hash",
      records: "hash",
      race: "hash",
      gender: "hash",
    });
  }
}

export class ManifestVersion extends Dexie {
  manifestVersion!: Table<IManifestVersion, string>;

  constructor() {
    super("ManifestVersion");
    this.version(1).stores({
      manifestVersion: "manifestVersion",
    });
  }
}

export const manifestDb = new Manifest();
const manifestVersion = new ManifestVersion();

manifestDb.on("ready", async () => {
  const manifest = (await getDestinyManifest(httpClient)).Response;

  const version = manifest.version;

  return manifestDb.stats.count((count) => {
    if (count > 0) {
      console.log("Manifest exists for stats");
    } else {
      console.log(
        "Manifest is empty. Populating stats from Destiny Manifest..."
      );

      return new Promise(async (resolve, reject) => {
        getDestinyManifest(httpClient)
          .then((man) => resolve(man.Response))
          .catch((err) => reject(err));
      })
        .then(async (data) => {
          console.log("Received Manifest, pulling stats definitions...");

          const statsDefinitions = await getDestinyManifestSlice(httpClient, {
            destinyManifest: data as DestinyManifest,
            language: "en",
            tableNames: ["DestinyStatDefinition"],
          });

          const stats: IManifest[] = Object.keys(
            statsDefinitions.DestinyStatDefinition
          ).map((key) => {
            return {
              hash: key,
              value:
                statsDefinitions.DestinyStatDefinition[+key]?.displayProperties,
            };
          });

          return manifestDb.stats.bulkAdd(stats);
        })
        .then(() => {
          console.log("Done populating manifest database");
        });
    }
  });
});
