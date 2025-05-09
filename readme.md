# JSON Generator

A powerful tool for generating, editing, and validating JSON data using AI and visual tools.

## Features

- **Code Editor**: Edit JSON directly with syntax highlighting and validation
- **Visual Builder**: Create and modify JSON using a visual interface
- **AI Generation**: Generate JSON data using Google Gemini AI
- **Templates**: Save and load JSON templates

## 🔑 API Key Setup (Required for AI Features)

To use the AI generation features, you need to set up a Google Gemini API key:

1. Visit [Google MakerSuite](https://makersuite.google.com/app/apikey) to get your API key
2. Create a `.env.local` file in the root directory of the project
3. Add your API key to the file:
   ```
   GOOGLE_API_KEY=your-api-key-here
   ```
4. Restart the development server

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Using the JSON Generator

### 💬 Direct AI Generation
Use the prompt bar at the top to generate complete JSON data structures. Try inputs like:
- "restaurants in Pune"
- "user profiles with addresses"
- "product catalog for electronics"

### 🔄 Visual Structure Builder
1. Switch to the "Visual Builder" tab
2. Add properties and define types to create a JSON structure
3. Click "Generate Data" to fill the structure with realistic data

### 🤖 AI Assistant
Switch to the AI Assistant tab for:
- Help with JSON concepts
- Fixing errors in your JSON
- Generating specific JSON formats with explanations

## Development

- Built with Next.js, TypeScript, and Tailwind CSS
- Uses the Google Gemini API for AI features

## License

MIT
