import { AppContext } from "@/context/auth"
import Head from "next/head"
import { useContext } from "react"

const Profile = () => {

  const { user, loading } = useContext(AppContext)

  if (loading) {
    return <p>Cargando</p>
  }

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
