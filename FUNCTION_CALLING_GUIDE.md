# Function Calling with OpenAI Realtime API

This guide explains how function calling works in this OpenAI Realtime Console project and how to extend it for your own use cases.

## Overview

Function calling allows the AI model to execute specific functions based on user requests. The model analyzes the conversation and decides when to call functions, what parameters to pass, and how to use the results.

## How It Works

### 1. Function Definition

Functions are defined in `client/components/ToolPanel.jsx` with this structure:

```javascript
const tools = {
  function_name: {
    type: "function",
    name: "function_name",
    description: "Clear description of when to call this function",
    parameters: {
      type: "object",
      strict: true,
      properties: {
        parameter_name: {
          type: "string", // or "number", "array", etc.
          description: "Description of this parameter",
          // Optional: enum: ["option1", "option2"] for restricted values
        }
      },
      required: ["parameter_name"] // Array of required parameters
    }
  }
}
```

### 2. Session Configuration

Functions are registered with the model during session initialization:

```javascript
const sessionUpdate = {
  type: "session.update",
  session: {
    tools: Object.values(tools),
    tool_choice: "auto" // "auto", "none", "required", or specific function
  }
}
```

### 3. Function Call Detection

The system monitors for `response.done` events and checks for function calls:

```javascript
if (output.type === "function_call" && tools[output.name]) {
  // Handle the function call
  setFunctionCallOutputs(prev => [output, ...prev]);
}
```

### 4. Function Output Display

Each function type has its own display component that renders the results appropriately.

## Available Functions

### 1. Color Palette Generator (`display_color_palette`)
- **Purpose**: Generate themed color palettes
- **Parameters**: 
  - `theme` (string): Description of the color theme
  - `colors` (array): Array of 5 hex color codes
- **Example**: "Create an ocean-themed color palette"

### 2. Weather Information (`get_weather`)
- **Purpose**: Get weather information for a location
- **Parameters**:
  - `location` (string): City and state/country
  - `temperature` (number): Temperature in Fahrenheit
  - `condition` (string): Weather condition
  - `humidity` (number): Humidity percentage
- **Example**: "What's the weather like in San Francisco?"

### 3. Calculator (`calculate`)
- **Purpose**: Perform mathematical calculations
- **Parameters**:
  - `expression` (string): The mathematical expression
  - `result` (number): The calculated result
- **Example**: "What's 25 * 4 + 12?"

### 4. Todo Creator (`create_todo`)
- **Purpose**: Create todo items
- **Parameters**:
  - `task` (string): Task description
  - `priority` (enum): "low", "medium", or "high"
  - `due_date` (string, optional): Due date in YYYY-MM-DD format
- **Example**: "Create a high priority task to finish the project"

### 5. QR Code Generator (`generate_qr_code`)
- **Purpose**: Generate QR codes for text or URLs
- **Parameters**:
  - `content` (string): Text or URL to encode
  - `size` (number): Size in pixels
- **Example**: "Generate a QR code for https://openai.com"

## Adding New Functions

To add a new function:

### 1. Define the Function Schema

Add to the `tools` object in `ToolPanel.jsx`:

```javascript
my_new_function: {
  type: "function",
  name: "my_new_function",
  description: "Description of when to call this function",
  parameters: {
    type: "object",
    strict: true,
    properties: {
      // Define your parameters here
    },
    required: ["required_param"]
  }
}
```

### 2. Create a Display Component

Add a new component to handle the output:

```javascript
function MyNewFunctionOutput({ functionCallOutput }) {
  const args = JSON.parse(functionCallOutput.arguments);
  
  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
      <h3 className="font-bold mb-2">🔧 My New Function</h3>
      {/* Render your function output here */}
    </div>
  );
}
```

### 3. Register the Component

Add to the `components` object in `FunctionCallOutput`:

```javascript
const components = {
  // ...existing components...
  my_new_function: MyNewFunctionOutput,
};
```

### 4. Add Example Prompts

Update `client/examples/functionCallingExamples.js`:

```javascript
export const examplePrompts = {
  // ...existing prompts...
  myNewFunction: [
    "Example prompt for my new function",
    "Another example prompt",
  ],
};
```

## Best Practices

### Function Descriptions
- Be specific about when the function should be called
- Include examples in descriptions when helpful
- Mention any constraints or limitations

### Parameter Design
- Use descriptive parameter names
- Provide clear descriptions for each parameter
- Use appropriate data types (string, number, array, object)
- Use enums for restricted values
- Mark required parameters correctly

### Error Handling
- Validate function parameters
- Handle edge cases gracefully
- Provide meaningful error messages
- Log errors for debugging

### UI/UX Considerations
- Create visually appealing output components
- Show both processed and raw data when helpful
- Use appropriate colors and icons for different function types
- Make outputs scannable and easy to understand

## Testing Your Functions

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open the application** at http://localhost:3000

3. **Start a session** and try example prompts

4. **Test edge cases**:
   - Invalid parameters
   - Missing required parameters
   - Unusual input formats

5. **Check the browser console** for any errors

## Advanced Patterns

### Sequential Function Calls
The model can call multiple functions in sequence:
- User: "Plan a trip to San Francisco"
- Model calls: `get_weather("San Francisco")` → `create_todo("Pack for SF weather")` → `generate_qr_code("SF Trip Info")`

### Conditional Logic
Functions can be called based on conditions:
- If weather is sunny → suggest outdoor activities
- If weather is rainy → suggest indoor activities

### Data Pipeline
Use function outputs as inputs to other functions:
- Calculate result → Create todo with result → Generate QR code with result

## Debugging Tips

1. **Check the Event Log**: View raw function call data in the left panel
2. **Use Browser DevTools**: Check console for errors and network requests
3. **Validate JSON**: Ensure function parameters match the schema exactly
4. **Test Incrementally**: Add one function at a time and test thoroughly

## Resources

- [OpenAI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)
- [OpenAI Realtime API Documentation](https://platform.openai.com/docs/guides/realtime)
- [JSON Schema Documentation](https://json-schema.org/)

## Next Steps

1. Try the existing functions with different prompts
2. Modify existing functions to suit your needs
3. Add new functions for your specific use case
4. Experiment with different `tool_choice` strategies
5. Build more complex multi-function workflows
