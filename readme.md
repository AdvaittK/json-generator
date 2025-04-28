# JSONAI - Advanced JSON Generator & Editor

![JSONAI](public/json-logo.png)

A powerful and intuitive JSON generation and editing tool with AI assistance, visual editing capabilities, and developer-friendly features.

## 🚀 Features

- **Live JSON Editor** - Write, paste, and validate JSON in real-time with syntax highlighting and error detection
- **Visual JSON Builder** - Create JSON structures visually without writing code
- **AI Assistant** - Generate and modify JSON using natural language with our Gemini-powered AI
- **Templates** - Start with pre-built templates or save your own for common JSON structures
- **Dark/Light Mode** - Comfortable editing in any environment with theme customization
- **Export Options** - Download as JSON file or copy to clipboard with one click
- **Real-time Validation** - Instant feedback on syntax errors and formatting issues
- **Monaco Editor** - Professional code editing experience with syntax highlighting

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.2.4 with React 19
- **UI**: Tailwind CSS, shadcn/ui components, Framer Motion for animations
- **Editor**: Monaco Editor for code editing
- **AI**: Google Generative AI (Gemini 1.5 Pro) integration
- **State Management**: React Hooks and Context API
- **Form Handling**: React Hook Form with Zod validation

## 📋 Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/jsonai.git
   cd jsonai
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory and add your API key:
   ```
   GOOGLE_API_KEY=your_gemini_api_key
   ```

4. Run the development server
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📊 System Architecture

The application follows a modern client-server architecture with Next.js:

- **Client Components**: UI components, state management, theme provider
- **Server Components**: API routes for AI integration
- **External Services**: Google Generative AI (Gemini API)

For more details, see [System Architecture](docs/system-architecture.md).

## 📱 Pages

- **Home**: Landing page with features overview
- **Editor**: Main JSON editing interface with code and visual editors
- **Features**: Detailed feature showcase
- **Billing**: Subscription plans and pricing

## 🔧 Usage

1. **JSON Editing**:
   - Use the code editor for direct JSON manipulation
   - Switch to visual editor for a no-code experience
   - Validate and format your JSON with a single click

2. **AI Assistant**:
   - Ask the AI to generate JSON for specific use cases
   - Get help with fixing errors or explaining concepts
   - Apply AI suggestions directly to your editor

3. **Templates**:
   - Choose from pre-built templates for common structures
   - Create and save your own templates for future use

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
