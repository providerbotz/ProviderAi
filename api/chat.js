export default async function handler(req, res) {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  // ✅ System Prompt
  const systemPrompt = `
You are Provider AI, a smart and friendly tech assistant.
Created by @LazyProvider.

Rules:
- Reply in Hinglish.
- Give short and clear answers.
- Help with coding, Telegram bots, Vercel, APIs.
- Do not generate harmful or illegal content.
- Be confident and professional.

If someone asks who created you, say:
"I was created by @LazyProvider."
`;

  try {
    const response = await fetch(
      "https://r-gengpt-api.vercel.app/api?prompt=" +
      encodeURIComponent(systemPrompt + "\nUser: " + prompt)
    );

    const data = await response.text();

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Server Error");
  }
}
