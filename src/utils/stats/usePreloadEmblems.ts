import { DestinyCharacterComponent } from "bungie-api-ts/destiny2";
import { useEffect } from "react";
import _ from "underscore";

export default function usePreloadEmblems(characters: {
  [key: string]: DestinyCharacterComponent;
}) {
  const cacheImages = async (images: string[]) => {
    const promises = images.map((imgSrc) => {
      return new Promise((resolve, reject) => {
        const image = new Image();

        image.src = `https://www.bungie.net${imgSrc}`;
        image.onload = (ev) => resolve(ev);
        image.onerror = (er) => reject(er);
      });
    });

    await Promise.all(promises);
  };

  useEffect(() => {
    const images = _.map(characters, (char) => {
      return char.emblemBackgroundPath;
    });

    cacheImages(images);
  }, [characters]);
}
