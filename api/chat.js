export default async function handler(req, res) {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  try {
    const response = await fetch(
      "https://r-gengpt-api.vercel.app/api?prompt=" +
      encodeURIComponent(prompt)
    );

    const data = await response.text();

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Server Error");
  }
}
