import "dotenv/config";

import { HfInference } from "@huggingface/inference";
import { ENDPOINT } from "./shared.js";

let hfClient = new HfInference(process.env.HF_API_KEY);
hfClient = hfClient.endpoint(ENDPOINT);

export const hf = hfClient;
