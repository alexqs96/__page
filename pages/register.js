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
          width={80}
          height={80}
          alt="Logo Linx"
          unoptimized
          priority
        />
        <label>
          Nombre
          <input
            className="w-full"
            type="text"
            ref={nameRef}
          />
        </label>    

        <label>
          Email
          <input
            className="w-full"
            type="email"
            ref={emailRef}
          />
        </label>

        <label>
          Contraseña
          <input
            className="w-full"
            type="password"
            ref={passwordRef}
          />
        </label>
        
        <button type="submit" className="bg-black text-black dark:bg-white dark:text-black font-semibold">Unirme</button>
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
