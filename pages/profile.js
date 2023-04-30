import { AppContext } from "@/context/auth"
import Head from "next/head"
import { useContext } from "react"

const Profile = () => {

  const { user } = useContext(AppContext)

  return (
    <>
    <Head>
      <title>Perfil</title>
    </Head>
    <div>
      Hola {user.name}
    </div>
    </>
  )
}

export default Profile
