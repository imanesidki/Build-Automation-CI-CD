require('dotenv').config();
const axios = require('axios');

// Load environment variables
const {
  AZURE_ORG,
  AZURE_PROJECT,
  AZURE_PIPELINE_ID,
  AZURE_PAT
} = process.env;

if (!AZURE_ORG || !AZURE_PROJECT || !AZURE_PIPELINE_ID || !AZURE_PAT) {
  console.error('Missing one or more environment variables.');
  process.exit(1);
}

const url = `https://dev.azure.com/${AZURE_ORG}/${AZURE_PROJECT}/_apis/pipelines/${AZURE_PIPELINE_ID}/runs?api-version=7.1-preview.1`;

const auth = Buffer.from(`:${AZURE_PAT}`).toString('base64');

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${auth}`
};

const data = {
  // Add any required variables here
  // "templateParameters": {
  //   "variable1": "value1",
  //   "variable2": "value2"
  // }
};

axios.post(url, data, { headers })
  .then(response => {
    console.log('Pipeline triggered successfully:', response.data);
  })
  .catch(error => {
    console.error('Error triggering pipeline:', error.response ? error.response.data : error.message);
  });
