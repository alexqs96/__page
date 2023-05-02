import { useRef, useState, useContext } from "react";
import Image from "next/image";

const Login = () => {
  
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [message, setMessage] = useState(null)

  const HandleLogin = async (e) =>{
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
    }).then(res => res.json())

    if (res.success) {
      setMessage(res.message)
      location.replace("/")
    } else {
      setMessage(res.message)
    }
  }

  return (
    <>
      <form className="flex flex-col gap-3 w-[300px] mx-auto border p-8 rounded-lg border-black/20 dark:border-white/20" method="post" onSubmit={HandleLogin}>
        <Image
          className="mx-auto"
          src="/img/logo.png"
          width={100}
          height={100}
          alt="Logo Linx"
          unoptimized
          priority
        />
        <label className="text-black/80 dark:text-white/80">
          Email
          <input
            className="w-full border border-black/20 bg-white/5 dark:border-white/20 p-1.5 rounded"
            type="email"
            ref={emailRef}
          />
        </label>

        <label className="text-black/80 dark:text-white/80">
          Contraseña
          <input
            className="w-full border border-black/20 bg-white/5 dark:border-white/20 p-1.5 rounded"
            type="password"
            ref={passwordRef}
          />
        </label>
        
        <button type="submit" className="p-2 transition rounded border border-black bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black hover:dark:bg-black hover:dark:text-white hover:dark:border-white font-semibold">Ingresar</button>
      </form>

      {
        message?
        <h6 className="msgError">{JSON.stringify(message)}</h6>
        :
        null
      }
    </>
  )
}

export default Login;
