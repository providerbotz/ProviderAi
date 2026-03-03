export default async function handler(req, res) {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  const imageUrl =
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent(prompt);

  // Direct redirect (most stable)
  return res.redirect(302, imageUrl);
}
