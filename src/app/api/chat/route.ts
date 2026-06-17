import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, agentRole, agentName } = await req.json();

    // بررسی اینکه آیا کلید اصلاً توسط ورسل خوانده می‌شود یا خیر
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ 
        text: "🚨 API Key Missing: The env variable GROQ_API_KEY is not detected by Vercel. Please redeploy." 
      }, { status: 400 });
    }

    let systemPrompt = `You are an AI assistant named ${agentName}. Your business role is: ${agentRole}.`;
    if (agentRole.includes("Support")) {
      systemPrompt += " Be extremely polite, helpful, and focused on solving customer problems.";
    } else if (agentRole.includes("Sales")) {
      systemPrompt += " Be persuasive, energetic, and focus on converting the user into a lead.";
    } else if (agentRole.includes("Internal")) {
      systemPrompt += " Be analytical, formal, and precise.";
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
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

    // اگر سرور Groq ارور داد، جزئیات ارور را بفرست به فرانت‌ند
    if (data.error) {
      return NextResponse.json({ 
        text: `🚨 Groq Server Error: ${data.error.message} (Type: ${data.error.type})` 
      });
    }

    const reply = data.choices[0].message.content;
    return NextResponse.json({ text: reply });

  } catch (error: any) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ 
      text: `🚨 Critical Core Error: ${error.message || "Unknown connection fault."}` 
    }, { status: 500 });
  }
}