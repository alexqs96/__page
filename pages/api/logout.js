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

  const serialized = serialize("pageUser", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
    path: "/",
    domain: process.env.PAGE_URL || "localhost",
  });

  res.setHeader("Set-Cookie", serialized);
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  return res.status(200).json(null);

}
