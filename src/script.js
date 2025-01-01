import OpenAI from "openai";
import config from "./config.js";
import { CONVERSATION_PROMPT } from "./prompts.js";

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
  baseURL: "https://api.openai.com/v1",
  dangerouslyAllowBrowser: true,
});

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function renderHeader(contactName) {
  const contactContainer = document.querySelector(".contact-container");
  contactContainer.innerHTML = "";

  const avatarElement = document.createElement("div");
  avatarElement.className = "contact-avatar";

  // Se for um número de 9 dígitos (anúncio), use o ícone de perfil genérico
  if (/^\d{9}$/.test(contactName)) {
    avatarElement.className += " business-avatar";
    avatarElement.innerHTML = `
      <svg viewBox="0 0 45 45">
        <circle cx="22.5" cy="17" r="6.5" fill="white"/>
        <circle cx="22.5" cy="38" r="12" fill="white"/>
      </svg>`;
  } else {
    avatarElement.textContent = getInitials(contactName);
  }

  const nameElement = document.createElement("div");
  nameElement.className = "contact-name";
  nameElement.textContent = contactName;

  contactContainer.appendChild(avatarElement);
  contactContainer.appendChild(nameElement);
}

function updateTime() {
  const now = new Date();
  const timeElement = document.querySelector(".time");
  timeElement.textContent = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

async function generateConversation() {
  updateTime();
  document.body.classList.add("loading");

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a JSON generator for message snippets. Always return valid JSON format responses.",
        },
        {
          role: "user",
          content: `Return a JSON response with the following conversation snippet: ${CONVERSATION_PROMPT}`,
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 500,
      temperature: 1.3,
    });

    try {
      const response = completion.choices[0].message.content;
      const jsonResponse = JSON.parse(response);

      if (!jsonResponse.messages || !Array.isArray(jsonResponse.messages)) {
        return;
      }

      // Verifica se é uma conversa de empresa (número de 9 dígitos)
      const isBusinessChat = /^\d{9}$/.test(jsonResponse.contact_name);

      // Valida se todas as mensagens seguem o padrão correto
      const isValidConversation = jsonResponse.messages.every((msg) => {
        if (isBusinessChat) {
          // Mensagens de empresa devem sempre ser recebidas (sender: 2)
          return msg.sender === 2;
        } else {
          // Mensagens pessoais podem ser enviadas ou recebidas
          return msg.sender === 1 || msg.sender === 2;
        }
      });

      if (!isValidConversation) {
        // Se a conversa não seguir o padrão, gera uma nova
        generateConversation();
        return;
      }

      renderHeader(jsonResponse.contact_name);
      renderMessages(jsonResponse.messages);
    } catch (parseError) {
      // Silently fail
    }
  } catch (error) {
    // Silently fail
  } finally {
    document.body.classList.remove("loading");
  }
}

function renderMessages(messages) {
  const chatContainer = document.getElementById("chatContainer");
  chatContainer.innerHTML = "";

  const isBusinessChat = document.querySelector(".business-avatar") !== null;

  // Só usa cores diferentes para conversas pessoais
  const useGreen = !isBusinessChat && Math.random() < 0.3;
  const messageColor = useGreen ? "green" : "blue";

  let lastSender = null;

  messages.forEach((msg) => {
    const messageDiv = document.createElement("div");
    const isNewSender = lastSender !== msg.sender;
    lastSender = msg.sender;

    // Se for empresa, todas as mensagens são received
    // Se for pessoal, segue o sender do JSON
    const isSender = isBusinessChat ? false : msg.sender === 1;

    messageDiv.className = `message ${
      isSender ? `sent ${messageColor}` : "received"
    }`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    contentDiv.textContent = msg.message;

    const timeSpan = document.createElement("span");
    timeSpan.className = "message-time";
    timeSpan.textContent = msg.time;

    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeSpan);

    if (isNewSender) {
      messageDiv.style.marginTop = "16px";
    }

    chatContainer.appendChild(messageDiv);
  });
}

// Apenas carrega quando a página inicia
window.addEventListener("load", generateConversation);

// Remova o event listener de clique
// document.addEventListener("click", generateConversation);

// Adicione ao início do arquivo
window.addEventListener("load", updateTime);
