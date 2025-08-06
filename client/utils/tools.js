export const tools = {
  display_color_palette: {
    type: "function",
    name: "display_color_palette",
    description: "Call this function when a user asks for a color palette.",
    parameters: {
      type: "object",
      strict: true,
      properties: {
        theme: {
          type: "string",
          description: "Description of the theme for the color scheme.",
        },
        colors: {
          type: "array",
          description: "Array of five hex color codes based on the theme.",
          items: {
            type: "string",
            description: "Hex color code",
          },
        },
      },
      required: ["theme", "colors"],
    },
  },
  get_weather: {
    type: "function",
    name: "get_weather",
    description: "Get current weather information for a location.",
    parameters: {
      type: "object",
      strict: true,
      properties: {
        location: {
          type: "string",
          description: "The city and state/country, e.g. 'San Francisco, CA'",
        },
        temperature: {
          type: "number",
          description: "Temperature in Fahrenheit",
        },
        condition: {
          type: "string",
          description: "Weather condition (e.g., sunny, cloudy, rainy)",
        },
        humidity: {
          type: "number",
          description: "Humidity percentage",
        },
      },
      required: ["location", "temperature", "condition", "humidity"],
    },
  },
  calculate: {
    type: "function",
    name: "calculate",
    description: "Perform mathematical calculations.",
    parameters: {
      type: "object",
      strict: true,
      properties: {
        expression: {
          type: "string",
          description: "The mathematical expression to evaluate",
        },
        result: {
          type: "number",
          description: "The result of the calculation",
        },
      },
      required: ["expression", "result"],
    },
  },
  create_todo: {
    type: "function",
    name: "create_todo",
    description: "Create a new todo item.",
    parameters: {
      type: "object",
      strict: true,
      properties: {
        task: {
          type: "string",
          description: "The task description",
        },
        priority: {
          type: "string",
          enum: ["low", "medium", "high"],
          description: "Priority level of the task",
        },
        due_date: {
          type: "string",
          description: "Due date in YYYY-MM-DD format",
        },
      },
      required: ["task", "priority"],
    },
  },
  generate_qr_code: {
    type: "function",
    name: "generate_qr_code",
    description: "Generate a QR code for given text or URL.",
    parameters: {
      type: "object",
      strict: true,
      properties: {
        content: {
          type: "string",
          description: "The text or URL to encode in the QR code",
        },
        size: {
          type: "number",
          description: "Size of the QR code in pixels",
        },
      },
      required: ["content", "size"],
    },
  },
  suggest_case: {
    type: "function",
    name: "suggest_case",
    description: "Suggest a case to the customer based on their request.",
    parameters: {
      type: "object",
      strict: true,
      properties: {
        case_name: {
          type: "string",
          description: "The name of the case to suggest.",
        },
        case_description: {
          type: "string",
          description: "A brief description of the case.",
        },
      },
      required: ["case_name", "case_description"],
    },
  },
};
