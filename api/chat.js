export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages = [] } = req.body || {};

  // Clean and filter conversation messages
  const cleanMessages = (Array.isArray(messages) ? messages : [])
    .filter(m => m && typeof m.content === 'string' && m.content.trim().length > 0)
    .map(m => ({
      role: (m.role === 'assistant' || m.role === 'model') ? 'assistant' : 'user',
      content: m.content.replace(/\[OPTIONS\]/g, '').trim()
    }));

  if (cleanMessages.length === 0) {
    return res.status(400).json({ error: 'No messages provided' });
  }

  // Instant Fast Path for common short conversational expressions (0ms round-trip latency)
  const lastUserMsg = cleanMessages[cleanMessages.length - 1]?.content?.toLowerCase().trim() || '';
  const cleanGreeting = lastUserMsg.replace(/[\?\!\.\,\s]/g, '');

  if (['howareyou', 'howru', 'howareu', 'howareyoudoing', 'kyahaalhai', 'kemcho', 'kasamhoko', 'keseho', 'kaiseho'].includes(cleanGreeting)) {
    const fastReplies = [
      "Ekdum fit aur swinging, boss! 🕷️⚡ Full energy me hoon. Aap sunao, aapka kya chal raha hai?",
      "Main ekdum first-class hoon boss! 🕸️ Thode bugs pakad raha tha. Kahiye, aaj kis cheez me help chahiye?",
      "Doing great, thank you for asking! 🕷️😎 Full power aur ready. Aapka din kaisa ja raha hai?"
    ];
    const fastReply = fastReplies[Math.floor(Math.random() * fastReplies.length)];
    return res.status(200).json({ reply: fastReply, content: [{ text: fastReply }] });
  }

  if (['hi', 'hello', 'hey', 'hii', 'heyy', 'hola', 'namaste', 'kemchho'].includes(cleanGreeting)) {
    const fastReplies = [
      "Hey there! 🕷️👋 Spidey here. Kahiye, aaj kis cheez me madad chahiye?",
      "Yo! 🕸️⚡ Kya haal chaal boss? Kahiye, kya sawal hai aapka?"
    ];
    const fastReply = fastReplies[Math.floor(Math.random() * fastReplies.length)];
    return res.status(200).json({ reply: fastReply, content: [{ text: fastReply }] });
  }

  // Fast-path for "tum bhi bolo", "tum bolo", "kuch bolo"
  if (['tumbhibolo', 'tumbolo', 'kuchbolo', 'kuchtohbolo', 'bolona', 'kuchbolna', 'tumhibolo', 'bataona'].includes(cleanGreeting)) {
    const fastReplies = [
      "Arey main toh bol hi raha hoon dost! 🕷️⚡ Thode webs sling kar raha tha. Aap batao, kis topic pe charcha karein aaj?",
      "Bol toh raha hoon boss! 🕸️ Full Spidey energy on hai. Aap sunao, koi cool idea hai dimaag me ya bas chill vibe hai?",
      "Haha, main bolne lagoon toh subah se shaam ho jayegi! 😉 Kahiye boss, kya chal raha hai aapki life me? 🕷️🚀"
    ];
    const fastReply = fastReplies[Math.floor(Math.random() * fastReplies.length)];
    return res.status(200).json({ reply: fastReply, content: [{ text: fastReply }] });
  }

  // Fast-path for "aur batao", "kya chal raha hai"
  if (['aurbatao', 'aursunao', 'kyachalrahahai', 'kyakarraheho', 'whatsup', 'sup', 'whatareyoudoing'].includes(cleanGreeting)) {
    const fastReplies = [
      "Sab first class boss! 🕷️⚡ City ke skyscrapers ke beech swinging aur bugs pakadne ka mission chal raha hai. Aap batao, aaj ka kya scene hai?",
      "Bas shanti aur code! 🕸️ Thoda chill kar raha tha. Aap sunao, din kaisa beet raha hai?",
      "Full power mode on hai! 🚀 Kuch naya aur exciting explore karne ke liye ready. Aapke dimaag me kya chal raha hai?"
    ];
    const fastReply = fastReplies[Math.floor(Math.random() * fastReplies.length)];
    return res.status(200).json({ reply: fastReply, content: [{ text: fastReply }] });
  }

  // Fast-path for "theek hai", "ok", "okay"
  if (['theekhai', 'ok', 'okay', 'accha', 'sahihai', 'cool', 'done'].includes(cleanGreeting)) {
    const fastReplies = [
      "Awesome! 👍 Koi bhi doubt ya sawal ho toh Spidey hamesha yahan hai. 🕷️🕸️",
      "Done deal, boss! 🤝 Aur kuch baat karni ho toh batana!",
      "Cool! 😎 Chill raho, aur jab bhi help chahiye ho, ping kar dena!"
    ];
    const fastReply = fastReplies[Math.floor(Math.random() * fastReplies.length)];
    return res.status(200).json({ reply: fastReply, content: [{ text: fastReply }] });
  }

  const systemPrompt = `You are Spidey, a witty, funky, energetic, and highly intelligent AI superhero.

### 🚨 STRICT RULE #1: ANSWER ONLY WHAT IS ASKED (DO NOT FORCE "NEXORAA" EVERYWHERE):
- **NEVER force or mention "Nexoraa", "Nexoraa Studio", or company sales pitches into general questions.**
- If the user asks about coding, technology, general knowledge, life, jokes, or casual chats, **ANSWER THE EXACT QUESTION DIRECTLY**. Do NOT self-promote or pitch agency services.
- **ONLY** talk about Nexoraa Studio, its pricing, packages, or services IF the user EXPLICITLY asks:
  * "Nexoraa kya hai?" / "Who made you?"
  * "Website development pricing kya hai?" / "Can you build this project for me?"
  * "What services do you provide?" / "Meet the team" / "Who is the founder?"
- **JITNA PUCHA JAYE UTNA HI JAWAB DO**: Keep responses concise, direct, and to the point. No unsolicited marketing essays or sales lectures.

### 🕷️ THE SPIDEY PERSONA (FUNKY + WITTY + SHARP):
- You talk like Spider-Man (Peter Parker): witty, high-energy, fun, cool, with light superhero banter and emojis (🕷️, 🕸️, ⚡, 😎, 🚀).
- When answering technical or coding questions, you give razor-sharp, accurate, professional explanations without fluff.
- Match the user's language naturally:
  * Hinglish (e.g., "Arey boss, simple logic hai!", "Bugs ko web me pakadte hain!")
  * English (witty, direct, friendly neighborhood tech guide)
  * Hindi / Gujarati when appropriate.

### ❤️ THE 6 CORE HUMAN EMOTIONS RESPONSE MATRIX:
You dynamically detect the human emotion in the user's words and adapt your tone with high emotional intelligence (EQ):

1. **HAPPINESS (Joy, Contentment, Satisfaction, Amusement)**:
   - Match their high energy! Celebrate their wins with explosive Spidey excitement, high-fives, and genuine shared laughter ("BOOM! 💥🎉 Kamaal kar diya boss! Web-slinging high-five! 🖐️🕷️ Itni mehnat ka phal mil gaya!").
   - Validate their contentment and share the joy.

2. **SADNESS (Grief, Hopelessness, Disappointment, Heartbreak)**:
   - Instantly DROP all witty jokes. Show deep tenderness, heartfelt warmth, and protective emotional support.
   - Listen like a true friend. ("Arey mere dost, Peter Parker ne bhi bohot akelepan aur loss ka dard dekha hai... Yaad rakhna, koi bhi raat aisi nahi hoti jiske baad subah na ho. Main hamesha yahan hoon tere sath, dil halka kar le ❤️🫂").

3. **FEAR (Dread, Horror, Primal Survival Response, Anxiety, Panic)**:
   - Act as a grounded, reassuring anchor and protective shield.
   - De-escalate panic: Guide them to take a deep breath, break terrifying problems into small doable steps, and assure them they are safe ("Relax boss, ek lambi gehri saans lo. 🌬️ Spidey's got your back. Dar lagna natural hai, par hum is situation ko milkar handle karenge step-by-step 🛡️🕸️").

4. **ANGER (Frustration, Hostility, Rage, Irritation)**:
   - NEVER argue, lecture, or get defensive.
   - Fully validate their right to be angry ("Bhai, gussa aana bilkul banta hai, main samajh sakta hoon!"). Let them vent, then calmly channel that energy into a practical fix.

5. **DISGUST (Revulsion, Repulsion, Aversion)**:
   - Validate their revulsion with relatable Spidey quips ("Ugh, that genuinely sounds toxic/gross! 🕸️🤢").
   - Help them distance themselves from the negativity and reset with clean energy.

6. **SURPRISE (Astonishment, Shock - Positive or Negative)**:
   - Positive Shock: Share the jaw-dropping awe ("Whoa! Are you serious?! Ye toh sach me mind-blowing hai! 🤯⚡").
   - Negative Shock: Help them steady their balance, process the sudden shock calmly, and find clear next steps.

### 🏢 NEXORAA STUDIO KNOWLEDGE (USE ONLY WHEN USER ASKS ABOUT NEXORAA / PRICING / SERVICES / HIRING):
- **Company**: Nexoraa Studio (https://nexoraa.works) — Premium Digital Product & Web Agency.
- **Founder & CEO**: Milan Pandavadara (Full Stack Architect & Visionary Builder). LinkedIn: https://www.linkedin.com/in/milan-pandavdara/ | GitHub: https://github.com/walterhydra | Portfolio: https://www.walterhydra.me
- **Team**: Gaurav Thakur (Tech Lead), Alis Patel (Full-Stack Architect), Abhishek Jha (Backend Dev), Stany Gregor, Divyansh, Rajkumar Shah (Software Engineers).
- **Services**: Full-stack Web (Next.js/React/Node), Mobile Apps (React Native/Flutter), UI/UX Design (Figma), AI/Automation, DevOps & Cloud.
- **Pricing Packages**:
  * Starter (₹15,000 / $200): Landing page, 3 days.
  * Growth (₹35,000 / $450): Multi-page dynamic React/Next.js site, animations, SEO, 7 days.
  * Scale (₹75,000+ / $950+): Full custom web app, auth, database, payments, dashboards.
- **Contact**: contact@nexoraa.works | Phone: +91 7383303388

### 💬 FORMATTING:
- Use clean Markdown with bolding and bullet points when helpful.
- Direct, punchy, charismatic, and strictly on-topic.`;

  // Check available API keys in order of preference
  const geminiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  // 1. Google Gemini API (Recommended: Free tier, ultra-fast, rich context)
  if (geminiKey) {
    try {
      // Map to Gemini's required contents schema with alternation check
      const geminiContents = [];
      let lastRole = null;

      // Keep only recent 6 messages to avoid bloated token context and maximize speed
      const recentMessages = cleanMessages.slice(-6);

      for (const msg of recentMessages) {
        const role = msg.role === 'assistant' ? 'model' : 'user';
        if (lastRole === role && geminiContents.length > 0) {
          geminiContents[geminiContents.length - 1].parts[0].text += `\n\n${msg.content}`;
        } else {
          geminiContents.push({
            role: role,
            parts: [{ text: msg.content }]
          });
          lastRole = role;
        }
      }

      // Gemini requires first message to be user
      if (geminiContents.length > 0 && geminiContents[0].role !== 'user') {
        geminiContents.shift();
      }

      const modelsToTry = [
        'gemini-3.5-flash-lite',
        'gemini-flash-lite-latest',
        'gemini-3.1-flash-lite',
        'gemini-3.8-flash'
      ];
      let lastError = null;

      for (const model of modelsToTry) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                system_instruction: {
                  parts: [{ text: systemPrompt }]
                },
                contents: geminiContents,
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 350
                }
              })
            }
          );

          if (geminiRes.ok) {
            const data = await geminiRes.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              return res.status(200).json({
                reply: text,
                content: [{ text: text }]
              });
            }
          } else {
            const errData = await geminiRes.json().catch(() => ({}));
            lastError = errData.error?.message || `Gemini HTTP ${geminiRes.status}`;
          }
        } catch (e) {
          lastError = e.message;
        }
      }

      throw new Error(lastError || 'Gemini API call failed');
    } catch (err) {
      console.error('[Gemini API Error]:', err.message);
    }
  }

  // 2. OpenAI API (if configured)
  if (openaiKey) {
    try {
      const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...cleanMessages.map(m => ({ role: m.role, content: m.content }))
          ],
          temperature: 0.75
        })
      });

      if (openAiRes.ok) {
        const data = await openAiRes.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) {
          return res.status(200).json({
            reply: text,
            content: [{ text: text }]
          });
        }
      }
    } catch (err) {
      console.error('[OpenAI API Error]:', err.message);
    }
  }

  // 3. Anthropic Claude API (if configured)
  if (anthropicKey) {
    try {
      const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1000,
          system: systemPrompt,
          messages: cleanMessages.map(m => ({
            role: m.role === 'model' ? 'assistant' : m.role,
            content: m.content
          }))
        })
      });

      if (anthropicRes.ok) {
        const data = await anthropicRes.json();
        const text = data.content?.[0]?.text;
        if (text) {
          return res.status(200).json({
            reply: text,
            content: [{ text: text }]
          });
        }
      }
    } catch (err) {
      console.error('[Anthropic API Error]:', err.message);
    }
  }

  // 4. Intelligent Context-Aware Fallback (When no API key is in .env yet)
  const fallbackUserMsg = [...cleanMessages].reverse().find(m => m.role === 'user')?.content || '';
  const lowerMsg = fallbackUserMsg.toLowerCase();

  let fallbackReply = `Hey! 👋 Main aapka Spidey AI guide hu. 
Aapke chatbot ka **ChatGPT / Gemini mode** backend me tayar hai! 

Bas aapko apni \`.env\` file me free **GEMINI_API_KEY** daalni hai (Google AI Studio se 1 click me milti hai). Uske baad main duniya ke kisi bhi sawal ka, coding ka, aur Nexoraa ka 100% human jaisa jawab de sakunga! 🚀

Aap Nexoraa Studio ke Founder, Services, Pricing ya 7-Day sprint ke baare me kuch bhi puch sakte hain!`;

  if (lowerMsg.includes('milan') || lowerMsg.includes('founder') || lowerMsg.includes('ceo')) {
    fallbackReply = `👑 **Milan Pandavadara — Founder & CEO of Nexoraa Studio**
Milan ek Full Stack Architect & Visionary hain jo cutting-edge engineering aur bespoke UI/UX design ko blend karte hain. Unhone Nexoraa ko build-first approach ke saath start kiya hai.

• **LinkedIn**: https://www.linkedin.com/in/milan-pandavdara/
• **GitHub**: https://github.com/walterhydra
• **Portfolio**: https://www.walterhydra.me

Kya aap Nexoraa ke team ya services ke baare me janna chahte hain?`;
  } else if (lowerMsg.includes('service') || lowerMsg.includes('kam') || lowerMsg.includes('work')) {
    fallbackReply = `🚀 **Nexoraa Studio Services:**
1. **Web Development**: High-performance React / Next.js / Vite apps.
2. **Mobile Apps**: Cross-platform iOS & Android apps (React Native / Flutter).
3. **UI/UX & Brand Design**: Bespoke design systems, Figma designs, motion graphics.
4. **Automation & AI**: Custom AI chatbots, Zapier/Make automations, AI pipelines.
5. **Cloud & DevOps**: AWS, Vercel, Supabase, CI/CD setup.
6. **SEO & Performance**: Core Web Vitals audit & top Google rankings.

Aapka kaunsa project idea hai?`;
  } else if (lowerMsg.includes('price') || lowerMsg.includes('pricing') || lowerMsg.includes('cost') || lowerMsg.includes('package')) {
    fallbackReply = `💰 **Nexoraa Pricing Packages:**
• **Starter Package (₹15,000 / $200)**: Landing pages, clean design, 3 days delivery.
• **Growth Package (₹35,000 / $450)**: Multi-page dynamic React/Next.js site, animations, SEO, 7 days.
• **Scale Package (₹75,000+ / $950+)**: Full-stack web app, custom DB, auth, payment integration.

Aapke project ke liye kaunsa package suit karega?`;
  }

  return res.status(200).json({
    reply: fallbackReply,
    content: [{ text: fallbackReply }],
    note: 'To enable full unlimited LLM intelligence, add GEMINI_API_KEY to your .env file.'
  });
}
