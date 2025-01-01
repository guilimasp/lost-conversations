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
      console.log("OpenAI Response:", response);

      const jsonResponse = JSON.parse(response);
      console.log("Parsed JSON:", jsonResponse);

      if (!jsonResponse.messages || !Array.isArray(jsonResponse.messages)) {
        console.error("Invalid response format:", jsonResponse);
        return;
      }

      renderHeader(jsonResponse.contact_name);
      renderMessages(jsonResponse.messages);
    } catch (parseError) {
      console.error("Error processing response:", parseError);
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

  // 30% de chance de usar verde em vez de azul para mensagens normais
  const useGreen = Math.random() < 0.3;
  const messageColor = useGreen ? "green" : "blue";

  let lastSender = null;

  messages.forEach((msg) => {
    const messageDiv = document.createElement("div");
    const isNewSender = lastSender !== msg.sender;
    lastSender = msg.sender;

    // Para mensagens de empresa, sempre usar received
    const isBusinessMessage =
      document.querySelector(".business-avatar") !== null;
    const isSender = isBusinessMessage ? false : msg.sender === 1;

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
