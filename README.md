# Lost Conversations

A web application that simulates an iMessage interface displaying randomly generated conversation snippets. Built with Vite and OpenAI API.

## Overview
Lost Conversations generates random chat snippets that feel like glimpses into ongoing conversations. Sometimes confusing, sometimes intriguing, these message fragments appear as if you're looking at someone else's chat history.

## Features
- iMessage-style interface with accurate iOS design
- Random conversation generation (98% personal chats, 2% business messages)
- Dynamic message bubbles (blue/green for sent messages)
- Realistic business spam messages
- Contextless conversations that feel like real chat snippets

## Tech Stack
- Vite
- OpenAI API (GPT-3.5 Turbo)
- Vanilla JavaScript
- CSS3

## Live Demo
Visit [Lost Conversations](https://guilimasp.github.io/lost-conversations/)

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
4. Run development server:
```bash
npm run dev
```

## Build
```bash
npm run build
```
