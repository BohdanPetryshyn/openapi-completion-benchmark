import "dotenv/config";

import { HfInference } from "@huggingface/inference";
import { MODEL } from "./shared.js";

const endpoints = {
  "codellama/CodeLlama-7b-hf":
    "https://ce5wjdvaod3s7uq6.eu-west-1.aws.endpoints.huggingface.cloud",
  "codellama/CodeLlama-7b-hf-2":
    "https://n8rbdftzmxqrxv83.eu-west-1.aws.endpoints.huggingface.cloud",
  "codellama/CodeLlama-13b-hf":
    "https://d5ht9s3sseewr2p1.us-east-1.aws.endpoints.huggingface.cloud",
};

let hfClient = new HfInference(process.env.HF_API_KEY);
hfClient = await hfClient.endpoint(endpoints[MODEL]);

export const hf = hfClient;
