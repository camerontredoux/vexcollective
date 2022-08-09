import type { NextApiRequest, NextApiResponse } from "next";
import Bungie from "../../utils/bungie";

const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  const bungie = new Bungie(process.env.X_API_KEY!);
  const manifest = await bungie.getDestinyManifest();

  res.status(200).json(manifest);
};

export default endpoint;
