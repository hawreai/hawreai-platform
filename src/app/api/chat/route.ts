import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, agentRole, agentName } = await req.json();

    // تعریف رفتار و پرسونای ایجنت بر اساس نقش آن
    let systemPrompt = `You are an AI assistant named ${agentName}. Your business role is: ${agentRole}.`;
    
    if (agentRole.includes("Support")) {
      systemPrompt += " Be extremely polite, helpful, and focused on solving customer problems step-by-step.";
    } else if (agentRole.includes("Sales")) {
      systemPrompt += " Be persuasive, energetic, and focus on converting the user into a qualified business lead or sale.";
    } else if (agentRole.includes("Internal")) {
      systemPrompt += " Be analytical, formal, and precise. Focus on organizational guidelines and technical clarity.";
    }

    // ارسال درخواست به سرور Groq
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // استفاده از یکی از قوی‌ترین مدل‌های باز و سریع در سال 2026
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m: any) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text
          }))
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({ text: reply });
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ text: "Error connecting to my neural core. Please check configuration." }, { status: 500 });
  }
}