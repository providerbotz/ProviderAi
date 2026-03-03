export default async function handler(req, res) {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  try {
    const imageUrl =
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(prompt);

    const response = await fetch(imageUrl);

    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(buffer));

  } catch (error) {
    res.status(500).send("Image generation failed");
  }
}
