export default async function strapi(req, res) {

  const strapi = await fetch(process.env.STRAPI_URL,{
    method: "GET",
    headers: {
      'Authorization': `Bearer ${process.env.STRAPI}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  if (!strapi) {
    return res.status(400).json(null)  
  }

  return res.status(200).json(strapi)
}
