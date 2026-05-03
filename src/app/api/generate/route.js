import OpenAI from "openai";

export async function POST(req) {
  try {
    const body = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Create a detailed ${body.days}-day ${body.tripType} trip plan for ${body.people} people
traveling from ${body.from} to ${body.to}.

Include:
- Travel options
- Stay suggestions
- Day-wise itinerary
- Estimated budget
- Travel tips
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return new Response(
      JSON.stringify({
        result: completion.choices[0].message.content,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
