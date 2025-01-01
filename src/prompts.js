export const CONVERSATION_PROMPT = `Generate and return a JSON object containing a conversation snippet.

OPTION 1 - PERSONAL CHAT:
First, determine the chat style (use Math.random() for probability):

A. Regular Chat (90% chance):
   - 1-7 messages
   - Can include:
     * One person being completely ignored (multiple unanswered messages)
     * Inside jokes or references
     * Mid-argument snippets
     * Someone being passive-aggressive
     * Random questions without context
     * Emotional outbursts
     * Typos and slang
   - Messages can be sent or received (sender: 1 or 2)
   - contact_name: A casual name or nickname

B. Long Message (10% chance):
   - Single message, one paragraph (200-400 characters)
   - Topics can be:
     * Personal drama or rants
     * Conspiracy theories
     * Technical explanations
     * Life stories
     * Random thoughts
     * Philosophical questions
     * Emotional confessions
   - Can be either sent or received (sender: 1 or 2)
   - Should feel like catching the middle of a longer conversation
   - contact_name: A casual name or nickname

/* OPTION 2 - BUSINESS MESSAGE:
   Temporarily disabled to force personal chats only
*/

IMPORTANT RULES:
1. Always generate personal chats (business messages disabled)
2. For personal chats, use Math.random() < 0.1 for long message probability
3. Personal chats must have name-based contact_name
4. Messages can be sent or received (sender: 1 or 2)

Return EXACTLY this JSON structure:
{
  "contact_name": string,
  "messages": [
    {
      "order": number (starting at 1),
      "sender": number (1 or 2),
      "time": string (HH:mm format),
      "message": string
    }
  ]
}`;
