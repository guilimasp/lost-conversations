import OpenAI from "openai";
import config from "./config.js";
import { CONVERSATION_PROMPT } from "./prompts.js";

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
  baseURL: "https://api.openai.com/v1",
  dangerouslyAllowBrowser: true,
});

async function generateConversation() {
  document.body.classList.add("loading");

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are generating realistic adult conversations. Focus on ambiguous, context-dependent exchanges that feel like glimpses into complex situations.",
        },
        {
          role: "user",
          content: CONVERSATION_PROMPT,
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 300,
      temperature: 1.2,
    });

    try {
      const response = completion.choices[0].message.content;
      console.log("Resposta da API:", response); // Log para debug

      const jsonResponse = JSON.parse(response);

      if (!jsonResponse.mensagens || !Array.isArray(jsonResponse.mensagens)) {
        throw new Error("Formato de resposta inválido");
      }

      const messages = jsonResponse.mensagens.map((msg) => ({
        sender: msg.sender,
        content: msg.mensagem,
        time: msg.time,
      }));

      renderMessages(messages);
    } catch (parseError) {
      console.error("Erro ao processar resposta:", parseError);
      console.log("Resposta recebida:", completion.choices[0].message.content);
    }
  } catch (error) {
    console.error("ERRO:", error);
  } finally {
    document.body.classList.remove("loading");
  }
}

function renderMessages(messages) {
  const chatContainer = document.getElementById("chatContainer");
  chatContainer.innerHTML = "";

  // 30% de chance de usar verde em vez de azul
  const useGreen = Math.random() < 0.3;
  const messageColor = useGreen ? "green" : "blue";

  let lastSender = null;

  messages.forEach((message) => {
    const messageDiv = document.createElement("div");
    const isNewSender = lastSender !== message.sender;
    lastSender = message.sender;

    // Define se é sender ou receiver baseado no campo sender do JSON
    const isSender = message.sender === 1;

    messageDiv.className = `message ${
      isSender ? `sent ${messageColor}` : "received"
    }`;

    // Cria o container para o conteúdo e horário
    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    contentDiv.textContent = message.content || message.mensagem; // Aceita ambos os formatos

    const timeSpan = document.createElement("span");
    timeSpan.className = "message-time";
    timeSpan.textContent = message.time;

    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeSpan);

    // Adiciona margem extra se for uma nova pessoa falando
    if (isNewSender) {
      messageDiv.style.marginTop = "16px";
    }

    chatContainer.appendChild(messageDiv);
  });

  // Log para debug
  console.log("Mensagens renderizadas:", messages);
}

// Gera conversa inicial quando a página carrega
window.addEventListener("load", generateConversation);

// Gera nova conversa ao clicar em qualquer lugar da página
document.addEventListener("click", generateConversation);
