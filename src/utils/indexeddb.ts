import {
  DestinyManifest,
  getDestinyManifest,
  getDestinyManifestSlice,
} from "bungie-api-ts/destiny2";
import Dexie, { Table } from "dexie";
import { httpClient } from "./misc";

interface IManifest {
  hash: string;
  [key: string]: any;
}

interface IManifestVersion {
  manifestVersion: string;
}

export class Manifest extends Dexie {
  stat!: Table<IManifest, string>;
  record!: Table<IManifest, string>;
  race!: Table<IManifest, string>;
  class!: Table<IManifest, string>;

  constructor() {
    super("Manifest");
    this.version(1).stores({
      stat: "hash",
      record: "hash",
      race: "hash",
      class: "hash",
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

manifestDb.on("ready", async () => {
  const manifest = (await getDestinyManifest(httpClient)).Response;

  return manifestDb.stat.count((count) => {
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
              ...statsDefinitions.DestinyStatDefinition[+key]
                ?.displayProperties,
            };
          });

          return manifestDb.stat.bulkAdd(stats);
        })
        .then(() => {
          console.log("Done populating manifest database");
        });
    }
  });
});
