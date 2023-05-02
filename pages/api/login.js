import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/firebase";
import connectMongo from "./utils/mongo";
import User from "./models/User";
import { updateToken } from "./utils/updateToken";

export default async function Login(req, res) {
  await connectMongo();

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Llena el Formulario",
      success: false,
    });
  }

  try {
    const userFound = await signInWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );

    if (userFound?.user?.uid) {
      const user = await User.findOne({ id: userFound.user.uid });

      const token = await updateToken(user);

      res.setHeader("Set-Cookie", token);

      return res.status(200).json({
        message: "Bienvenido",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Usuario no Encontrado en MongoDB",
        success: false,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: err.code,
      success: false,
    });
  }
}
