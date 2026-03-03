export default async function handler(req, res) {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const imageUrl =
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent(prompt);

  return res.status(200).json({
    success: true,
    image: imageUrl
  });
}
