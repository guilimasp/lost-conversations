export const CONVERSATION_PROMPT = `Generate and return a JSON object containing EITHER a personal conversation (98%) OR a business message (2% chance).

Choose ONE type:

OPTION 1 - PERSONAL CHAT (98% chance):
- contact_name: A casual name or nickname
- Messages can be sent or received (sender: 1 or 2)
- Messages should feel like a random snippet of conversation
- Context should be unclear to outsiders
- Can include typos, slang, emojis
- Can be about anything (drama, jokes, plans, etc.)
- 1-7 messages in total

OPTION 2 - BUSINESS MESSAGE (2% chance):
- contact_name: Must be a random 9-digit number
- ALL messages must be received (always sender: 2)
- Must be from real-looking businesses like:
  * Banks (Chase, Wells Fargo style)
  * Credit Cards (Amex, Capital One style)
  * Telecoms (Verizon, T-Mobile style)
  * Retailers (Walmart, Target style)
  * Food Delivery (DoorDash, UberEats style)
  * Airlines (United, Delta style)
- Messages should:
  * Be mostly in CAPS LOCK
  * Include realistic company names (not generic/example names)
  * Use real-looking domains (like macys.com, not examplestore.com)
  * Have urgent/promotional tone
  * Include realistic order numbers, account numbers (partially masked)
  * Reference actual services/products
Examples:
  * "🔥 NORDSTROM EXCLUSIVE: YOUR PRIVATE SALE ACCESS ENDS TONIGHT! Shop at nordstrom.com/privatesale"
  * "CHASE ALERT: Unusual sign-in attempt detected on acct ending in *****6723. Call 1-800-955-9900 if not you."
  * "Your DoorDash order #DH8391 from McDonald's is on the way! Track at dd.com/track"
- 1-3 messages total

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
}

IMPORTANT: 
- The 'messages' array MUST contain at least one message
- All field names must match exactly as shown above
- Use proper JSON format with English field names
- Business messages should look like real spam from actual companies`;
