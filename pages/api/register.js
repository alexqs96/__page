import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/firebase";
import connectMongo from "./utils/mongo";
import User from "./models/User";

export default async function Register(req, res) {
  await connectMongo();

  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({
      message: "Llena el formulario",
      success: false,
    });
  }

  try {
    const firebaseUser = await createUserWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );

    if (firebaseUser?.user?.uid) {
      const newUser = new User({
        id: firebaseUser.user.uid,
        email: firebaseUser.user.email,
        name: req.body.name,
      });

      await newUser.save();

      return res.status(200).json({
        message: "Bienvenido",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Hubo un error al guardar en MongoDB",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: err.code,
      success: false,
    });
  }
}
