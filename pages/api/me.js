import jwt from "jsonwebtoken";

export default async function me(req, res) {
  const { pageUser } = req.cookies;

  if (!pageUser) {
    return res.json(null);
  }

  try {
    const { user } = jwt.verify(pageUser, process.env.JWT_SECRET);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(null);
  }
}