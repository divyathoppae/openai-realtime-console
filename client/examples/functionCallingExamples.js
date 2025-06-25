// Example prompts to test function calling with OpenAI Realtime API
// You can copy these into the chat to test different function calling scenarios

export const examplePrompts = {
  // Color palette examples
  colorPalette: [
    "Can you create a color palette with an ocean theme?",
    "I need colors for a sunset design",
    "Generate a forest-inspired color scheme",
    "Create an autumn color palette",
    "I want winter colors for my website",
  ],

  // Weather examples
  weather: [
    "What's the weather like in San Francisco?",
    "Tell me about the weather in New York",
    "How's the weather in London today?",
    "Get me weather information for Tokyo",
  ],

  // Calculator examples
  calculation: [
    "What's 25 * 4 + 12?",
    "Calculate 150 / 3 - 20",
    "What's the result of (45 + 35) * 2?",
    "Calculate 234 + 567 - 123",
    "What's 15% of 200?", // This would be "200 * 0.15"
  ],

  // Todo examples
  todo: [
    "Create a todo item: Finish the project presentation with high priority, due tomorrow",
    "Add a medium priority task: Buy groceries",
    "Create a low priority todo: Organize desk",
    "Add a high priority task: Call dentist for appointment due on 2025-06-30",
  ],

  // QR Code examples
  qrCode: [
    "Generate a QR code for https://openai.com",
    "Create a QR code for my email: john@example.com",
    "Make a 300px QR code for 'Hello World!'",
    "Generate a QR code for my phone number: +1-555-123-4567",
  ],

  // Combined examples (multiple functions in one conversation)
  combined: [
    "Create an ocean color palette and then generate a QR code for https://ocean-theme.com",
    "Calculate 45 * 12 and then create a todo to review the result",
    "Get weather for San Francisco and create a color palette inspired by the weather",
  ],
};

// Function calling best practices and tips
export const functionCallingTips = {
  // Parameter validation
  validation: `
    Always validate function parameters:
    - Check required fields are present
    - Validate data types match schema
    - Ensure enum values are within allowed options
    - Handle edge cases gracefully
  `,

  // Error handling
  errorHandling: `
    Implement proper error handling:
    - Catch and handle function execution errors
    - Provide meaningful error messages
    - Log errors for debugging
    - Fallback to alternative responses when functions fail
  `,

  // Response formatting
  responseFormatting: `
    Format function responses effectively:
    - Make outputs visually appealing
    - Include relevant context
    - Show both processed and raw data when helpful
    - Use appropriate UI components for different data types
  `,

  // Tool choice strategies
  toolChoice: `
    Configure tool_choice appropriately:
    - "auto" - Let the model decide when to use functions
    - "none" - Disable function calling
    - "required" - Force the model to call a function
    - {"type": "function", "function": {"name": "specific_function"}} - Force specific function
  `,

  // Function descriptions
  descriptions: `
    Write clear function descriptions:
    - Be specific about when to call the function
    - Include examples in descriptions when helpful
    - Describe expected input formats
    - Mention any limitations or constraints
  `,

  // Testing strategies
  testing: `
    Test function calling thoroughly:
    - Test with various input formats
    - Test edge cases and error conditions
    - Verify parameter validation works
    - Test function calling in different conversation contexts
    - Test with multiple functions called in sequence
  `,
};

// Advanced function calling patterns
export const advancedPatterns = {
  // Sequential function calls
  sequential: `
    Example: User asks to "plan a trip to San Francisco"
    1. get_weather("San Francisco, CA") - Check current weather
    2. create_todo("Pack clothes for SF weather", "high", "2025-06-28")
    3. generate_qr_code("SF Trip Checklist", 200)
  `,

  // Conditional function calls
  conditional: `
    Example: Based on weather, suggest activities
    1. get_weather(location)
    2. If sunny -> suggest_outdoor_activities()
    3. If rainy -> suggest_indoor_activities()
  `,

  // Data transformation chains
  transformation: `
    Example: Process data through multiple functions
    1. calculate(complex_expression)
    2. create_todo("Review calculation: " + result)
    3. generate_qr_code("Result: " + result)
  `,

  // User preference adaptation
  adaptation: `
    Example: Learn from user preferences
    1. display_color_palette(user_preferred_theme)
    2. Store user feedback
    3. Adapt future suggestions based on feedback
  `,
};

export default {
  examplePrompts,
  functionCallingTips,
  advancedPatterns,
};
