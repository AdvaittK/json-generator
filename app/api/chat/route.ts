import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with API key
const apiKey = process.env.GOOGLE_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!apiKey || apiKey === '') {
      return NextResponse.json(
        { 
          error: 'API key missing', 
          details: 'GOOGLE_API_KEY is not set in environment variables. Create a .env.local file with your API key.'
        },
        { status: 403 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { messages, jsonContext } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array' },
        { status: 400 }
      );
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Create chat history from messages
    const chatHistory = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Get the last user message
    const lastMessage = messages[messages.length - 1];

    // Create a prompt with guidance for JSON generation and the last message
    let prompt = lastMessage.content;
    
    // Add JSON context if available
    if (jsonContext) {
      prompt = `Current JSON in editor:\n\`\`\`json\n${jsonContext}\n\`\`\`\n\n${prompt}`;
    }

    // Add specific instructions for JSON tasks
    const systemPrompt = `
You are a helpful JSON generator assistant. Follow these guidelines:
- When generating JSON, always wrap it in a code block with \`\`\`json and \`\`\` tags
- Produce valid, properly formatted JSON according to specifications
- If fixing errors, explain what was wrong and show the corrected JSON
- Keep explanations clear and concise, focusing on JSON best practices
- For complex structures, explain the key components briefly
- Format JSON with proper indentation (2 spaces)

If the user asks for specific data structures or examples, provide them in proper JSON format.
`;

    // Start a chat session
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 4096,
      },
    });

    // Send message to the chat
    const result = await chat.sendMessage([
      { text: systemPrompt },
      { text: prompt }
    ]);
    
    const response = result.response;
    const responseText = response.text();

    // Return the response
    return NextResponse.json({ message: responseText });
  } catch (error) {
    console.error('Error in chat API:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process the request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
