# Conversation Generation System

This project uses a carefully crafted prompt system to generate realistic conversation snippets. The system is designed to create two types of content:

## Personal Conversations (98%)
- Random snippets from ongoing conversations
- Context-dependent messages that feel incomplete
- Natural language with typos and casual tone
- 1-7 messages per conversation

## Business Messages (2%)
- Realistic spam/promotional content
- Based on actual business message patterns
- Uses CAPS and urgent tone
- Includes real-world company references

## Implementation
The prompt system is maintained in `src/prompts.js` and uses the OpenAI API to generate JSON-structured responses that are then rendered in an iMessage-style interface. 