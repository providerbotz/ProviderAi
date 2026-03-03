export default async function handler(req, res) {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  try {
    const imageUrl =
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(prompt) +
      "?width=1024&height=1024&model=flux&nologo=true";

    const response = await fetch(imageUrl);

    if (!response.ok) {
      return res.status(500).send("Image fetch failed");
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");

    return res.status(200).send(buffer);

  } catch (error) {
    return res.status(500).send("Image generation failed");
  }
}
