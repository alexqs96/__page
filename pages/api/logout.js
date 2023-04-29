import { serialize } from "cookie";

export default function logOut(req, res) {
  const { pageUser } = req.cookies;
  if (!pageUser) {
    return res
      .status(401)
      .json({
        message: "Error: no se encontro ninguna sesion abierta",
        success: false,
      });
  }

  const serialized = serialize("pageUser", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  return res.status(200).json(null);
}
