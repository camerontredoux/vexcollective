import type { NextApiRequest, NextApiResponse } from "next";
import Bungie from "../../utils/bungie";

const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const referer = new URL(req.headers.referer as string);
  const endpoint = referer.searchParams.get("endpoint");

  console.log(req.query);

  console.log(endpoint);

  const bungie = new Bungie(process.env.X_API_KEY!);
  const manifest = await bungie.getDestinyManifest();

  res.status(200).json(manifest);
};

export default endpoint;
