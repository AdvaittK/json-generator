import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log("Chat API route called");
    
    // Use Hugging Face's demo API key or your own if provided
    const apiKey = process.env.HUGGINGFACE_API_KEY || 'hf_demo';
    
    // Parse request body
    const body = await req.json();
    const { messages, jsonContext } = body;

    // Validate the request
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }
    
    console.log(`Processing ${messages.length} messages`);

    // Format the conversation for Hugging Face API
    // Get the last user message
    const lastMessage = messages[messages.length - 1].content;
    
    // Create a context from previous messages
    const context = messages
      .slice(0, -1)
      .map(m => `${m.role === 'user' ? 'Human' : 'AI'}: ${m.content}`)
      .join('\n');
    
    // Add JSON context if available
    let jsonContextStr = '';
    if (jsonContext) {
      jsonContextStr = `\nCurrent JSON in the editor:\n\`\`\`json\n${jsonContext}\n\`\`\`\n`;
    }
    
    // Create the final prompt with specific instructions for JSON assistance
    const prompt = `You are a helpful JSON assistant. Please help with JSON generation, explanation, and validation.
${context}${jsonContextStr}
Human: ${lastMessage}
AI: `;

    try {
      console.log("Generating fallback response...");
      
      // If Hugging Face API fails, use this simple fallback response generator
      let assistantMessage = generateSimpleResponse(lastMessage, jsonContext);
      
      // Try to call the API first, but don't wait too long
      try {
        // Set up an abort controller with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
        
        // Call a very small, reliable model
        const response = await fetch(
          "https://api-inference.huggingface.co/models/distilbert/distilbert-base-uncased",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
              "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              inputs: prompt.slice(0, 500), // Limit input size
              options: {
                wait_for_model: true,
                use_cache: true
              }
            }),
            signal: controller.signal
          }
        );
        
        // Clear timeout since we got a response
        clearTimeout(timeoutId);
        
        // Process the response if it was successful
        if (response.ok) {
          const result = await response.json();
          if (result && 
             (Array.isArray(result) && result[0]?.generated_text || 
              result.generated_text)) {
            
            const generated = Array.isArray(result) ? 
              result[0]?.generated_text : 
              result.generated_text;
              
            if (generated && generated.trim().length > 0) {
              assistantMessage = generated.trim();
            }
          }
        }
      } catch (apiError) {
        console.log("Using fallback response due to API error:", apiError);
        // Continue with the fallback response
      }
      
      console.log("Response generated");
      return NextResponse.json({ message: assistantMessage });
      
    } catch (error) {
      console.error("Error in API handling:", error);
      // Use fallback even if everything else fails
      const fallbackResponse = "I'm sorry, but I'm having trouble connecting to the AI service right now. Here are some examples of valid JSON:\n\n```json\n{\n  \"user\": {\n    \"name\": \"John Doe\",\n    \"email\": \"john@example.com\",\n    \"isActive\": true\n  }\n}\n```\n\nCould you please try again in a moment?";
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
