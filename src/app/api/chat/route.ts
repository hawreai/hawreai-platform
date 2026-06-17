import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, agentRole, agentName, language } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ text: "🚨 API Key Missing" }, { status: 400 });
    }

    // تنظیم دستورالعمل زبان بر اساس انتخاب کاربر
    let langInstruction = "You must reply completely in English.";
    if (language === "ku") {
      langInstruction = "You must reply completely in Kurdish (Sorani/Kurmanji based on user style) using Kurdish alphabet.";
    } else if (language === "fa") {
      langInstruction = "You must reply completely in Persian (Farsi).";
    }

    let systemPrompt = `You are an AI assistant named ${agentName}. Your business role is: ${agentRole}. ${langInstruction}`;
    
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
        temperature: 0.6, // کاهش دما برای ثبات بیشتر در زبان انتخابی
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ text: `🚨 Groq Error: ${data.error.message}` });
    }

    return NextResponse.json({ text: data.choices[0].message.content });

  } catch (error: any) {
    return NextResponse.json({ text: "🚨 Connection fault." }, { status: 500 });
  }
}