export default async function handler(req, res) {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Pollinations Image URL
    const imageUrl =
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(prompt) +
      "?width=1024&height=1024&model=flux&nologo=true";

    // Direct image redirect
    return res.redirect(imageUrl);

  } catch (error) {
    return res.status(500).json({ error: "Image generation failed" });
  }
}
