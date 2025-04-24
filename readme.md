# JSON Generator & Editor

## Overview
This project is a fully functional and modern Capstone Project website built using React and Tailwind CSS. It provides users with an intuitive platform to generate, customize, validate, and download JSON files effortlessly.

## Features

### Core Features
- **Live JSON Generator**
  - A code editor (like Monaco Editor) where users can:
    - Write or paste JSON.
    - Use templates to autofill sample JSON structures (e.g., resume, user data, API response).
    - Validate and format JSON in real-time.

- **Visual JSON Builder (New Feature)**
  - Drag-and-drop interface to visually build JSON objects and arrays without code.
  - Users can:
    - Add/edit/delete keys and values.
    - Choose value types (string, number, boolean, object, array, null).

- **AI Chat Assistant (New Feature)**
  - Integrated chat using OpenAI’s GPT-4 via an API key (provided by the user).
  - Features:
    - Help generate or correct JSON.
    - Auto-suggest fixes if JSON is invalid.
    - Provide real-time feedback or answer technical questions.

- **Download & Copy**
  - Buttons to copy the JSON to clipboard or download it as a `.json` file.

- **Dark/Light Mode**
  - Toggle for aesthetic and accessibility.

### UI/UX Design
- Built with Tailwind CSS for styling.
- Clean, minimal, and professional design with soft shadows and rounded corners.
- Responsive grid layout for desktop, mobile, and tablet support.
- Icons from Lucide or Heroicons.
- Smooth animations using Framer Motion.

### Libraries & Tech
- React (with hooks).
- Tailwind CSS.
- Monaco Editor or CodeMirror for code editing.
- Framer Motion for animations.
- OpenAI API (via GPT-4) for AI chat.
- Zod or Ajv for JSON validation.

### Bonus Features
- JSON schema support.
- Save/load templates locally using localStorage or IndexedDB.
- Export/import JSON files.
- Markdown documentation for each feature.

## Development Setup

### Prerequisites
- Node.js and npm installed.
- A `.env` file to store the OpenAI API Key.

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd json-generator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Add your OpenAI API Key to the `.env` file:
   ```env
   REACT_APP_OPENAI_API_KEY=your-api-key
   ```
5. Start the development server:
   ```bash
   npm start
   ```

### Build for Production
To create a production build, run:
```bash
npm run build
```

## Folder Structure
```
json-generator/
├── app/                # Application pages
├── components/         # Reusable components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and templates
├── public/             # Static assets
├── styles/             # Global styles
├── package.json        # Project metadata and dependencies
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.