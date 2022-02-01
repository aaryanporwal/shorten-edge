import { setUrl } from "../../lib/redis";

export default async function handler(req, res) {
  const url = req.body.url;

  const short = await setUrl(url);

  res.status(200).json({ url, short });
}
