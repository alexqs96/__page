import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export function updateToken(user){
  const token = sign({ user }, process.env.JWT_SECRET, { expiresIn: '7d' });

  const serialized = serialize("pageUser", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: "/",
  });

  return serialized
}