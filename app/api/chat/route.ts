import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    console.log("Chat API route called");
    
    // Validate Gemini API key - only use your personal key, no fallback
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("Gemini API key is not set in environment variables");
      return NextResponse.json(
        { error: 'Please add your Gemini API key to the .env.local file' },
        { status: 500 }
      );
    }
    console.log("Using your personal API key");
    
    // Parse request body
    const body = await req.json();
    const { messages, jsonContext } = body;

    // Validate the request
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }
    
    console.log(`Processing ${messages.length} messages`);

    try {      console.log("Calling Gemini API...");

      // Initialize the Gemini client with your personal key
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro", // Use gemini-pro which is more widely available
      });

      // Create system prompt with JSON context
      let systemPrompt = "You are a helpful JSON assistant. Help users with JSON generation, validation, and explanation. Always format JSON output with triple backticks and the json language identifier.";
      
      if (jsonContext) {
        systemPrompt += `\n\nThe user is currently working with this JSON in their editor:\n\`\`\`json\n${jsonContext}\n\`\`\``;
      }

      // Get the current user message
      const userMessage = messages[messages.length - 1].content;
      
      // Create a simplified approach that works reliably
      let prompt = `${systemPrompt}\n\n`;
      
      // Add conversation history
      if (messages.length > 1) {
        // Add up to 5 previous messages for context
        const contextMessages = messages.slice(Math.max(0, messages.length - 6), messages.length - 1);
        for (const msg of contextMessages) {
          prompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n\n`;
        }
      }
      
      // Add the current message
      prompt += `User: ${userMessage}\n\nAssistant: `;

      // Generate content with simple prompt
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const assistantMessage = response.text();
      
      console.log("Received response from Gemini");
      
      return NextResponse.json({ message: assistantMessage });
    } catch (apiError) {
      console.error("Gemini API error details:", apiError);
      
      // Create appropriate error message based on error type
      let errorMessage = 'Failed to get response from Gemini';
      
      if (apiError instanceof Error) {
        if (apiError.message.includes('API key')) {
          errorMessage = 'Invalid Gemini API key provided';
        } else if (apiError.message.includes('quota')) {
          errorMessage = 'Gemini API quota exceeded';
        } else if (apiError.message.includes('rate limit')) {
          errorMessage = 'API rate limit exceeded, please try again later';
        }
      }
      
      // Generate fallback response for all errors
      const fallbackResponse = generateSimpleResponse(messages[messages.length - 1].content, jsonContext);
      console.log("Using fallback response due to error:", errorMessage);
      return NextResponse.json({ message: fallbackResponse });
    }
  } catch (error) {
    console.error('General error in chat API route:', error);
    return NextResponse.json(
      { error: 'Internal server error processing chat request' },
      { status: 500 }
    );
  }
}

// Fallback function to generate simple responses when the API fails
function generateSimpleResponse(userMessage: string, jsonContext?: string): string {
  userMessage = userMessage.toLowerCase();
  
  if (userMessage.includes("hello") || userMessage.includes("hi ")) {
    return "Hello! I'm your JSON assistant. How can I help you today?";
  }
  
  if (userMessage.includes("generate") || userMessage.includes("create")) {
    if (userMessage.includes("user") || userMessage.includes("profile")) {
      return "Here's a simple user profile in JSON format:\n\n```json\n{\n  \"user\": {\n    \"id\": 123,\n    \"name\": \"John Doe\",\n    \"email\": \"john@example.com\",\n    \"isActive\": true,\n    \"roles\": [\"user\", \"admin\"],\n    \"preferences\": {\n      \"theme\": \"dark\",\n      \"notifications\": true\n    }\n  }\n}\n```\n\nYou can click 'Apply to Editor' to use this JSON.";
    }
    
    if (userMessage.includes("product")) {
      return "Here's a simple product structure in JSON format:\n\n```json\n{\n  \"product\": {\n    \"id\": \"p123\",\n    \"name\": \"Wireless Headphones\",\n    \"price\": 99.99,\n    \"inStock\": true,\n    \"categories\": [\"electronics\", \"audio\"],\n    \"specs\": {\n      \"color\": \"black\",\n      \"batteryLife\": \"20 hours\"\n    }\n  }\n}\n```\n\nYou can click 'Apply to Editor' to use this JSON.";
    }
    
    return "I can help you generate JSON. What kind of structure do you need? For example, I can create user profiles, product listings, configuration files, etc.";
  }
  
  if (userMessage.includes("explain") || userMessage.includes("what is")) {
    return "JSON (JavaScript Object Notation) is a lightweight data interchange format. It's easy for humans to read and write and easy for machines to parse and generate. JSON has the following structure:\n\n- Objects are enclosed in curly braces {}\n- Arrays are enclosed in square brackets []\n- Name/value pairs are separated by a colon\n- Each pair is separated by commas\n- Strings must use double quotes\n\nFor example:\n```json\n{\n  \"name\": \"John\",\n  \"age\": 30,\n  \"isActive\": true,\n  \"hobbies\": [\"reading\", \"cycling\"]\n}\n```";
  }
  
  if (userMessage.includes("fix") || userMessage.includes("validate") || userMessage.includes("error")) {
    if (jsonContext) {
      return "I notice you have some JSON in the editor. Some common JSON errors include missing commas between properties, unclosed brackets or braces, and missing quotes around property names. Would you like me to help fix any specific issues?";
    }
    return "To validate JSON, I'll need to see the code you're working with. Common JSON errors include:\n\n1. Missing commas between properties\n2. Unclosed brackets or braces\n3. Missing quotes around property names\n4. Trailing commas in arrays or objects";
  }
  
  // Default response
  return "I'm your JSON assistant. I can help you generate, validate, or explain JSON structures. What would you like to do today?";
}
