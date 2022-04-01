const dialogflow = require("dialogflow");

const { SessionsClient } = require("@google-cloud/dialogflow-cx");
/**
 * Example for regional endpoint:
 *   const location = 'us-central1'
 *   const client = new SessionsClient({apiEndpoint: 'us-central1-dialogflow.googleapis.com'})
 */

const dialogflowConfig = require("./config");
// const projectId = dialogflowConfig.projectId;
const configuration = {
  credentials: {
    private_key: dialogflowConfig.private_key,
    client_email: dialogflowConfig.client_email,
  },
};

console.log(configuration);

// const sessionId = "987654";
const sessionId = Math.random().toString(36).substring(7);

// const languageCode = "en";
const projectId = "alb-poc-338505";
const location = "us-central1";
const agentId = "0f6b1470-9a2a-4938-b67b-d76fb502b54b";
const query = "hi peter good evening";
const languageCode = "en";
// const sessionClient = new dialogflow.SessionsClient(configuration);

const sessionClient = new SessionsClient({
  configuration,
  apiEndpoint: "us-central1-dialogflow.googleapis.com",
});

// const sessionPath = sessionClient.sessionPath(projectId, sessionId);
const sessionPath = sessionClient.projectLocationAgentSessionPath(
  projectId,
  location,
  agentId,
  sessionId
);

sessionClient.projectLocationAgentSessionPath(
  projectId,
  location,
  agentId,
  sessionId
);

async function talkToChatbot(message) {
  console.log("message " + message);
  const botRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
      },
      languageCode,
    },
  };

  const response = await sessionClient
    .detectIntent(botRequest)
    .then((responses) => {
      console.log(JSON.stringify(responses));
      const requiredResponse = responses[0].queryResult;
      return requiredResponse;
    })
    .catch((error) => {
      console.log("ERROR: " + error);
    });

  return response;
}

module.exports = talkToChatbot;
