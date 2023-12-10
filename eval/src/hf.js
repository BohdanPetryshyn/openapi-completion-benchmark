import "dotenv/config";

import { HfInference } from "@huggingface/inference";

let hfClient = new HfInference(process.env.HF_API_KEY);
hfClient = await hfClient.endpoint(
  "https://a5469lb6kfjvxan8.eu-west-1.aws.endpoints.huggingface.cloud"
);

export const hf = hfClient;
