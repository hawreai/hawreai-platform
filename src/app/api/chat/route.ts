import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, agentRole, agentName, language } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ text: "🚨 API Key Missing" }, { status: 400 });
    }

    // هک پرامپت برای مجبور کردن مدل به رعایت زبان انتخاب شده با سخت‌گیری بالا
    let langInstruction = "";
    if (language === "ku") {
      langInstruction = "CRITICAL RULE: You MUST reply ONLY in Kurdish language using Kurdish/Arabic alphabet. Never use English or Persian words. Even if the user says Hi, reply in Kurdish.";
    } else if (language === "fa") {
      langInstruction = "CRITICAL RULE: You MUST reply ONLY in Persian (Farsi) language. Never use English or Kurdish words. Even if the user says Hi, reply in Persian.";
    } else {
      langInstruction = "CRITICAL RULE: You MUST reply ONLY in English.";
    }

    // ترکیب هویت ایجنت و قانون زبان
    let systemPrompt = `You are a professional AI assistant. Name: ${agentName}. Business Role: ${agentRole}. 

${langInstruction}

Maintain the role behavior perfectly:
- If Support: Be polite, step-by-step, and solving.
- If Sales: Be energetic, high-converting, and persuasive.
- If Internal: Be highly analytical, precise, and corporate.`;

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
        temperature: 0.3, // کاهش دما به 0.3 باعث می‌شود مدل دقیقاً از دستورات زبان تبعیت کند و خلاقیت اشتباه به خرج ندهد
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