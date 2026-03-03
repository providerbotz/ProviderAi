export default async function handler(req, res) {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  try {
    const imageUrl =
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(prompt);

    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!response.ok) {
      return res.status(response.status).send("Image fetch failed");
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", "image/jpeg");
    return res.status(200).send(buffer);

  } catch (error) {
    return res.status(500).send("Image generation failed");
  }
}
