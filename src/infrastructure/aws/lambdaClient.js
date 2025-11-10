import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const lambdaClient = new LambdaClient({ region: "us-east-1" }); 

export const invokeSendEmailLambda = async ({ username, body, targetEmail }) => {
  try {
    const payload = JSON.stringify({ username, body, targetEmail });

    const command = new InvokeCommand({
      FunctionName: "sendEmailMatch",
      InvocationType: "Event",
      Payload: new TextEncoder().encode(payload),
    });

    const response = await lambdaClient.send(command);

    if (!response.Payload) {
      console.log("Lambda invoked asynchronously (no payload). Response:", response);
      return response;
    }

    const decoded = new TextDecoder().decode(response.Payload);
    if (!decoded) {
      console.log("Lambda returned empty payload");
      return null;
    }

    let responsePayload;
    try {
      responsePayload = JSON.parse(decoded);
    } catch (parseErr) {
      console.warn("Could not parse lambda payload as JSON, returning raw decoded string:", decoded);
      responsePayload = decoded;
    }

    console.log("Lambda response:", responsePayload);
    return responsePayload;
  } catch (error) {
    console.error("Error invocando Lambda:", error);
    throw error;
  }
};
