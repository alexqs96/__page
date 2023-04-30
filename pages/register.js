import { useRef, useState } from "react";
import Image from "next/image";

const Register = () => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState(undefined)

  const handleSignUp = async (e) =>{
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    }).then(res => res.json())

    setMessage(res.message)
  }

  return (
    <>
    {
      message?.welcome?
      <h1 className="loading">{message.welcome}</h1>
      :
      <>
      <form className="flex flex-col gap-2 w-[300px] mx-auto border p-10 rounded-lg border-black/20 dark:border-white/20" method="post" onSubmit={handleSignUp}>
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
          Nombre
          <input
            className="w-full border border-black/20 bg-white/5 dark:border-white/20 p-1.5 rounded"
            type="text"
            ref={nameRef}
          />
        </label>    

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
        
        <button type="submit" className="p-2 transition rounded border border-black bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black hover:dark:bg-black hover:dark:text-white hover:dark:border-white font-semibold">Unirme</button>
      </form>
      {
        message?
        <h6 className="msgError">{JSON.stringify(message)}</h6>
        :
        null
      }
      </>
    }
    </>
  )
}

export default Register;
