import { useRef, useState, useContext } from "react";
import Image from "next/image";
import { AppContext } from "@/context/auth";
import { Button, Card, Input } from "@geist-ui/core";

const Login = () => {

  
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState(undefined)

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
      setMessage(res.message);
      location.replace("/")
    } else {
      setMessage(res.message);
    }
  }

  return (
    <>
    {
      message?.welcome?
      <h1 className="loading">{message.welcome}</h1>
      :
      <>
      <form className="flex flex-col gap-2 w-[300px] mx-auto border p-10 rounded-lg border-black/20 dark:border-white/20" method="post" onSubmit={HandleLogin}>
        <Image
          className="mx-auto"
          src="/img/logo.png"
          width={80}
          height={80}
          alt="Logo Linx"
          unoptimized
          priority
        />
        <Input
          htmlType="email"
          width="100%"
          ref={emailRef}
        >
          Email
        </Input>

        <Input.Password
          width="100%"
          ref={passwordRef}
        >
          Contraseña
        </Input.Password>
        <Button htmlType="submit" type="secondary">
          <span className="font-semibold">Iniciar Sesión</span>
        </Button>
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

export default Login;
