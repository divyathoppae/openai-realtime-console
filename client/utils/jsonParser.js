import { readFileSync } from 'fs';

const jsonData = JSON.parse(readFileSync(new URL('../BP.json', import.meta.url)));

import '../components/ToolPanel';




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



const testRequest = "Member Date of Birth"; // Example of a generic request
const result = findCaseForRequest(testRequest, jsonData);
console.log(result);

// Function to simulate a tool call for case suggestion
export function suggestCaseToolCall(request, jsonData) {
  console.log("suggestCaseToolCall invoked with request:", request);
  const caseDetails = findCaseForRequest(request, jsonData);
  if (caseDetails) {
    console.log("Tool call: suggest_case", caseDetails);
    return caseDetails;
  } else {
    console.log("No matching case found for request:", request);
    return null;
  }
}

// Updated handler for customer input to trigger both tool call and entity mapping
export function handleCustomerInput(input, sendClientEvent) {
  console.log("handleCustomerInput invoked with input:", input);

  // Trigger the tool call for case suggestion
  const caseDetails = suggestCaseToolCall(input, jsonData);

  if (caseDetails) {
    console.log("Emitting suggest_case event with case details:", caseDetails);
    sendClientEvent({
      type: "suggest_case",
      case: caseDetails,
    });
  } else {
    console.log("No case details to emit for input:", input);
  }

  // Emit a map entity event for the input
  console.log("Emitting map_entity event for input:", input);
  mapEntity("customer_request", input, sendClientEvent);
}

// Example usage of the handler with a mock sendClientEvent function
const mockSendClientEvent = (event) => {
  console.log("Event emitted:", event);
};

const exampleInput = "Member Date of Birth";
handleCustomerInput(exampleInput, mockSendClientEvent);

