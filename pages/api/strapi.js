export default async function strapi(req, res) {

  let url = process.env.STRAPI_URL

  if (req.query.producto) {
    url = process.env.STRAPI_USER_URL+req.query.producto+"?populate=foto"
  }

  const strapi = await fetch(url,{
    method: "GET",
    headers: {
      'Authorization': `Bearer ${process.env.STRAPI}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(err => {
    return null
  })

  if (!strapi) {
    return res.status(400).json(null)  
  }

  return res.status(200).json(strapi)
}
