# Lost Conversations

A web application that simulates an iMessage interface displaying randomly generated message snippets. Built with Vite and OpenAI API.

## Technical Details

- Uses OpenAI's GPT-3.5-turbo model to generate contextually ambiguous message sequences
- Conversation generation prompt is environment-dependent and not version controlled
- Messages can appear in iMessage blue or SMS green (30% chance)
- Supports 1-7 messages per conversation
- Click anywhere to generate new conversations

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your OpenAI API key:
   ```bash
   VITE_OPENAI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
