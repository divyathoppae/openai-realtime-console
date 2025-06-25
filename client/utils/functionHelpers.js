// Helper functions for demonstration purposes
// In a real application, these would connect to actual APIs or services

export const functionHelpers = {
  // Simulate getting weather data
  getWeather: async (location) => {
    // In a real app, you'd call a weather API
    const mockWeatherData = {
      "San Francisco, CA": { temperature: 65, condition: "Foggy", humidity: 78 },
      "New York, NY": { temperature: 72, condition: "Sunny", humidity: 45 },
      "London, UK": { temperature: 58, condition: "Cloudy", humidity: 82 },
      "Tokyo, Japan": { temperature: 77, condition: "Partly Cloudy", humidity: 60 },
    };

    return mockWeatherData[location] || {
      temperature: Math.floor(Math.random() * 40) + 40,
      condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 60) + 30,
    };
  },

  // Perform mathematical calculations
  calculate: (expression) => {
    try {
      // WARNING: In a real app, NEVER use eval() with user input
      // This is just for demonstration. Use a proper math parser like math.js
      const result = eval(expression.replace(/[^0-9+\-*/().\s]/g, ''));
      return { expression, result };
    } catch (error) {
      return { expression, result: "Error: Invalid expression" };
    }
  },

  // Generate color palettes
  generateColorPalette: (theme) => {
    const palettes = {
      ocean: ["#006994", "#4A90E2", "#87CEEB", "#E0F6FF", "#B8E6FF"],
      sunset: ["#FF6B35", "#F7931E", "#FFD23F", "#06FFA5", "#B19CD9"],
      forest: ["#228B22", "#32CD32", "#90EE90", "#ADFF2F", "#7CFC00"],
      autumn: ["#D2691E", "#FF8C00", "#FFD700", "#DC143C", "#8B4513"],
      winter: ["#4169E1", "#87CEEB", "#E6E6FA", "#F0F8FF", "#B0C4DE"],
      desert: ["#DEB887", "#F4A460", "#D2691E", "#CD853F", "#A0522D"],
    };

    const colors = palettes[theme.toLowerCase()] || [
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
    ];

    return { theme, colors };
  },

  // Create todo items
  createTodo: (task, priority = "medium", due_date = null) => {
    const todo = {
      id: Date.now(),
      task,
      priority,
      due_date,
      created_at: new Date().toISOString(),
      completed: false,
    };

    // In a real app, you'd save to a database
    console.log("Todo created:", todo);
    return todo;
  },

  // Generate QR code (mock)
  generateQRCode: (content, size = 200) => {
    // In a real app, you'd use a QR code library
    return {
      content,
      size,
      url: `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(content)}`,
    };
  },
};

// Function to validate function call parameters
export const validateFunctionCall = (functionName, args) => {
  const validators = {
    display_color_palette: (args) => {
      return args.theme && Array.isArray(args.colors) && args.colors.length === 5;
    },
    get_weather: (args) => {
      return args.location && typeof args.temperature === 'number' && args.condition;
    },
    calculate: (args) => {
      return args.expression && typeof args.result === 'number';
    },
    create_todo: (args) => {
      return args.task && ['low', 'medium', 'high'].includes(args.priority);
    },
    generate_qr_code: (args) => {
      return args.content && typeof args.size === 'number';
    },
  };

  const validator = validators[functionName];
  return validator ? validator(args) : false;
};
