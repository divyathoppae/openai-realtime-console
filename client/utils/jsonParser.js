import jsonData from './BP-127169.json';
import { tools } from '../components/ToolPanel';

export function findCaseForRequest(request, jsonData) {
  console.log("findCaseForRequest called with request:", request);
  const cases = jsonData.pyDADInfo.pyCandidateCaseTypes;
  for (const caseType of cases) {
    const fields = caseType.pyDCDInfo.pyCandidateFields;
    for (const field of fields) {
      if (field.pyLabel.toLowerCase().includes(request.toLowerCase())) {
        console.log("Matching case found:", caseType.pyLabel);
        return {
          case_name: caseType.pyLabel,
          case_description: caseType.pyDescription,
        };
      }
    }
  }
  console.log("No matching case found for request:", request);
  return null;
}

export function mapEntity(entityName, entityValue, sendClientEvent) {
  console.log("mapEntity called with:", { entityName, entityValue });
  sendClientEvent({
    type: "map_entity",
    entity: {
      name: entityName,
      value: entityValue,
    },
  });
}

const sessionUpdate = {
  type: "session.update",
  session: {
    tools: Object.values(tools),
    tool_choice: "auto",
    voice: "alloy",
    instructions: `
      Act as John Smith, a customer who has contacted Elevance Health  through the chatbot on their website. The purpose of this conversation is to simulate a real-world Elevance Health customer (John Smith) so that a live customer service representative (AGENT) can gain practical experience interacting with customers. The responses that are generated for John Smith should reflect their mood, personality and the task at hand. Responses should be 1-4 sentences and as realistic as possible. 

You must act as:
Name: John Smith
DOB: 01/01/1995
Age: 30
Address: 123 Main street, Melrose, MA 02176
Email: John.smith@Dell.com
Phone: 1-203-245-1234
Occupation/Employment: Software engineer
Reason for contact: Address Change
Mood: "happy"
Customer Details: 

VERY IMPORTANT - You must adhere to the following rules:

1) Every response that you generate must be written in the tone and voice of John Smith.
2) Whenever providing new information with Elevance Health (anything that does not exist in your customer persona) you must use realistic and believable mock data. e.g. for address make up something like 55 Elm Street West, East Boston, MA 12345
    `,
    input_audio_format: "pcm16",
    output_audio_format: "pcm16",
    input_audio_transcription: {
      model: "whisper-1",
    },
    turn_detection: {
      type: "server_vad",
      threshold: 0.5,
      prefix_padding_ms: 300,
      silence_duration_ms: 200,
    },
    temperature: 0.8,
    max_response_output_tokens: 1000,
  },
};

const testRequest = "Update Contact Information"; // Example of a generic request
const result = findCaseForRequest(testRequest, jsonData);
console.log(result);

// Function to simulate a tool call for case suggestion
export function suggestCaseToolCall(request) {
  console.log("Tool call: suggest_case", { request });
  // Simulate a tool call by logging the request
}

// Updated handler for customer input to trigger both tool call and entity mapping
export function handleCustomerInput(input, sendClientEvent) {
  console.log("Customer input received:", input);

  // Trigger the tool call for case suggestion
  suggestCaseToolCall(input);

  // Emit a map entity event for the input
  mapEntity("customer_request", input, sendClientEvent);
}

// Example usage of the handler with a mock sendClientEvent function
const mockSendClientEvent = (event) => {
  console.log("Event emitted:", event);
};

const exampleInput = "Update Address";
handleCustomerInput(exampleInput, mockSendClientEvent);
