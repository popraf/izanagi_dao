import { getUser } from "./auth/[...thirdweb]";

export default async function handler(req, res) {
  const user = await getUser(req);

  if (!user) return res.status(401).json({ message: "unauthorized" });

  res.json({ walletAddress: user.address });
}
