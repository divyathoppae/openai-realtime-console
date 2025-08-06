import { useEffect, useState } from "react";
import ExamplePrompts from './ExamplePrompts';
import { handleCustomerInput, sessionUpdate } from "../utils/jsonParser";

// Define multiple function tools for practice
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

// Component to display color palette output
function ColorPaletteOutput({ functionCallOutput }) {
  const { theme, colors } = JSON.parse(functionCallOutput.arguments);

  const colorBoxes = colors.map((color) => (
    <div
      key={color}
      className="w-full h-16 rounded-md flex items-center justify-center border border-gray-200"
      style={{ backgroundColor: color }}
    >
      <p className="text-sm font-bold text-black bg-slate-100 rounded-md p-2 border border-black">
        {color}
      </p>
    </div>
  ));

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">Theme: {theme}</p>
      {colorBoxes}
    </div>
  );
}

// Component to display weather output
function WeatherOutput({ functionCallOutput }) {
  const { location, temperature, condition, humidity } = JSON.parse(functionCallOutput.arguments);

  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
      <h3 className="font-bold text-lg mb-2">🌤️ Weather for {location}</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Temperature: <span className="font-semibold">{temperature}°F</span></div>
        <div>Condition: <span className="font-semibold">{condition}</span></div>
        <div>Humidity: <span className="font-semibold">{humidity}%</span></div>
      </div>
    </div>
  );
}

// Component to display calculation output
function CalculationOutput({ functionCallOutput }) {
  const { expression, result } = JSON.parse(functionCallOutput.arguments);

  return (
    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
      <h3 className="font-bold mb-2">🧮 Calculator</h3>
      <div className="text-sm">
        <div>Expression: <code className="bg-gray-100 px-2 py-1 rounded">{expression}</code></div>
        <div className="mt-2">Result: <span className="font-bold text-lg text-green-700">{result}</span></div>
      </div>
    </div>
  );
}

// Component to display todo output
function TodoOutput({ functionCallOutput }) {
  const args = JSON.parse(functionCallOutput.arguments);
  const { task, priority, due_date } = args;

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
      <h3 className="font-bold mb-2">📝 Todo Created</h3>
      <div className="text-sm space-y-2">
        <div>Task: <span className="font-semibold">{task}</span></div>
        <div>Priority: <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityColors[priority]}`}>{priority.toUpperCase()}</span></div>
        {due_date && <div>Due: <span className="font-semibold">{due_date}</span></div>}
      </div>
    </div>
  );
}

// Component to display QR code output
function QRCodeOutput({ functionCallOutput }) {
  const { content, size } = JSON.parse(functionCallOutput.arguments);

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="font-bold mb-2">📱 QR Code Generated</h3>
      <div className="text-sm space-y-2">
        <div>Content: <span className="font-semibold break-all">{content}</span></div>
        <div>Size: <span className="font-semibold">{size}x{size} pixels</span></div>
        <div className="mt-3 p-4 bg-white border-2 border-dashed border-gray-300 rounded text-center">
          <div className="text-4xl mb-2">📱</div>
          <div className="text-xs text-gray-500">QR Code would appear here</div>
          <div className="text-xs text-gray-500">({size}x{size}px)</div>
        </div>
      </div>
    </div>
  );
}

// Component to display case suggestion output
function CaseSuggestionOutput({ functionCallOutput }) {
  const { case_name, case_description } = JSON.parse(functionCallOutput.arguments);

  return (
    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
      <h3 className="font-bold mb-2">💡 Case Suggestion</h3>
      <div className="text-sm space-y-2">
        <div>Case Name: <span className="font-semibold">{case_name}</span></div>
        <div>Description: <span className="font-semibold">{case_description}</span></div>
      </div>
    </div>
  );
}

// Main function output component that routes to specific outputs
function FunctionCallOutput({ functionCallOutput }) {
  const components = {
    display_color_palette: ColorPaletteOutput,
    get_weather: WeatherOutput,
    calculate: CalculationOutput,
    create_todo: TodoOutput,
    generate_qr_code: QRCodeOutput,
    suggest_case: CaseSuggestionOutput,
  };

  const Component = components[functionCallOutput.name];
  
  if (!Component) {
    return (
      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
        <p className="text-red-800">Unknown function: {functionCallOutput.name}</p>
        <pre className="text-xs bg-gray-100 rounded-md p-2 overflow-x-auto mt-2">
          {JSON.stringify(functionCallOutput, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Component functionCallOutput={functionCallOutput} />
      <details className="text-xs">
        <summary className="cursor-pointer text-gray-600 hover:text-gray-800">View raw function call data</summary>
        <pre className="bg-gray-100 rounded-md p-2 overflow-x-auto mt-2">
          {JSON.stringify(functionCallOutput, null, 2)}
        </pre>
      </details>
    </div>
  );
}

export default function ToolPanel({
  isSessionActive,
  sendClientEvent,
  sendTextMessage,
  events,
}) {
  const [functionAdded, setFunctionAdded] = useState(false);
  const [functionCallOutputs, setFunctionCallOutputs] = useState([]);
  const [customerInput, setCustomerInput] = useState("");

  const handleInputSubmit = () => {
    if (customerInput.trim()) {
      console.log("Tool call triggered with input:", customerInput); // Log the tool call
      handleCustomerInput(customerInput, sendClientEvent);
      setCustomerInput(""); // Clear the input field
    }
  };

  useEffect(() => {
    if (!events || events.length === 0) return;

    const firstEvent = events[events.length - 1];
    if (!functionAdded && firstEvent.type === "session.created") {
      sendClientEvent(sessionUpdate); // Use sessionUpdate when the session is created
      setFunctionAdded(true);
    }

    const mostRecentEvent = events[0];
    if (
      mostRecentEvent.type === "response.done" &&
      mostRecentEvent.response.output
    ) {
      mostRecentEvent.response.output.forEach((output) => {
        if (output.type === "function_call" && tools[output.name]) {
          // Add the new function call output to the list
          setFunctionCallOutputs((prev) => {
            // Check if this function call is already in the list
            const existingIndex = prev.findIndex(
              (item) => item.call_id === output.call_id
            );
            if (existingIndex >= 0) {
              // Update existing entry
              const newOutputs = [...prev];
              newOutputs[existingIndex] = output;
              return newOutputs;
            } else {
              // Add new entry at the beginning
              return [output, ...prev];
            }
          });

          // For color palette, ask for feedback
          if (output.name === "display_color_palette") {
            setTimeout(() => {
              sendClientEvent({
                type: "response.create",
                response: {
                  instructions: `
                  Ask for feedback about the color palette - don't repeat 
                  the colors, just ask if they like the colors.
                  `,
                },
              });
            }, 500);
          }
        }
      });
    }
  }, [events, functionAdded, sendClientEvent]);

  useEffect(() => {
    if (!isSessionActive) {
      setFunctionAdded(false);
      setFunctionCallOutputs([]);
    }
  }, [isSessionActive]);

  const getToolInstructions = () => {
    const toolNames = Object.keys(tools);
    return (
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Try asking for:</p>
        <ul className="text-sm space-y-1 text-gray-700">
          <li>• A color palette (ocean theme, sunset, etc.)</li>
          <li>• Weather information for a city</li>
          <li>• Mathematical calculations</li>
          <li>• Create a todo item</li>
          <li>• Generate a QR code</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">
          {toolNames.length} functions available: {toolNames.join(", ")}
        </p>
      </div>
    );
  };

  return (
    <section className="h-full w-full flex flex-col gap-4">
      <ExamplePrompts 
        sendTextMessage={sendTextMessage} 
        isSessionActive={isSessionActive} 
      />

      <div className="flex-1 bg-gray-50 rounded-md p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">🛠️ Function Calling Tools</h2>

        {!isSessionActive ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Start the session to use function calling</p>
            {getToolInstructions()}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={customerInput}
                onChange={(e) => setCustomerInput(e.target.value)}
                placeholder="Enter a request (e.g., Update Address)"
                className="flex-1 border border-gray-300 rounded-md p-2"
              />
              <button
                onClick={handleInputSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>

            {functionCallOutputs.length > 0 ? (
              <div className="space-y-4">
                {functionCallOutputs.map((output, index) => (
                  <div key={`${output.call_id}-${index}`} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <FunctionCallOutput functionCallOutput={output} />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">Functions are ready! Try asking for something...</p>
                {getToolInstructions()}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
