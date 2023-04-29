import jwt from "jsonwebtoken";

export default function me(req, res) {
  const { pageUser } = req.cookies;

  if (!pageUser) {
    return res.json(null);
  }

  const { user } = jwt.verify(pageUser, process.env.JWT_SECRET);

  return res.status(200).json(user);
}
