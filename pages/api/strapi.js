export default async function strapi(req, res) {


  const strapi = await fetch("https://strapi-production-0d4e.up.railway.app/api/empleados",{
    method: "GET",
    headers: {
      'Authorization': `Bearer ${process.env.STRAPI}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  return res.status(200).json(strapi)
}
