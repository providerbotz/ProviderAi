export default async function handler(req, res) {

  const rc = req.query.rc

  if (!rc) {
    return res.status(400).json({
      error: "RC number required"
    })
  }

  try {

    const api = await fetch(
      `https://cyber-api-pack.vercel.app/vehicle?key=CYBER_FREE&rc=${rc}`
    )

    const data = await api.json()

    res.status(200).json({
      developer: "@LazyProvider",
      results: data
    })

  } catch (err) {

    res.status(500).json({
      error: "API failed"
    })

  }
}
