import "dotenv/config";

import { HfInference } from "@huggingface/inference";
import { MODEL } from "./shared.js";

const endpoints = {
  "codellama/CodeLlama-7b-hf":
    "https://ce5wjdvaod3s7uq6.eu-west-1.aws.endpoints.huggingface.cloud",
  "codellama/CodeLlama-13b-hf":
    "https://d5ht9s3sseewr2p1.us-east-1.aws.endpoints.huggingface.cloud",
  "BohdanPetryshyn/codellama-7b-openapi-completion-merged":
    "https://io15kbfmkmya9cyu.us-east-1.aws.endpoints.huggingface.cloud",
  "BohdanPetryshyn/codellama-7b-clone":
    "https://z6rp06xawwzv2n7u.us-east-1.aws.endpoints.huggingface.cloud",
  "BohdanPetryshyn/codellama-7b-openapi-completion-merged-ctx-lvl-fim-no-spm":
    "https://h9bpmw1gvje4gpop.us-east-1.aws.endpoints.huggingface.cloud",
  "BohdanPetryshyn/codellama-7b-openapi-completion-merged-ctx-lvl-fim-doc-split":
    "https://zthx6zizvphdkbrl.us-east-1.aws.endpoints.huggingface.cloud",
  "BohdanPetryshyn/codellama-7b-openapi-completion-merged-ctx-lvl-fim-no-spm-inf-seq-a-32":
    "https://om0e3ddfawypt3ul.us-east-1.aws.endpoints.huggingface.cloud",
  "BohdanPetryshyn/codellama-7b-openapi-completion-merged-ctx-lvl-fim-no-spm-5120":
    "https://dz1ry3b67syklvql.us-east-1.aws.endpoints.huggingface.cloud",
  "BohdanPetryshyn/codellama-7b-openapi-completion-merged-ctx-lvl-fim-no-spm-inf-seq-4096":
    "https://yh090tbpajn0qodi.us-east-1.aws.endpoints.huggingface.cloud",
  "BohdanPetryshyn/codellama-7b-openapi-completion-merged-ctx-lvl-fim-no-spm-inf-seq-5120-r-64":
    "https://s8z4lgp8ikk4w0jn.us-east-1.aws.endpoints.huggingface.cloud",
  "BohdanPetryshyn/codellama-7b-openapi-completion-merged-ctx-lvl-fim-05-spm":
    "https://kv1yf2m29epctwdp.us-east-1.aws.endpoints.huggingface.cloud",
  "BohdanPetryshyn/codellama-7b-openapi-completion-merged-ctx-lvl-fim-no-spm-doc-split-1-08-12":
    "https://giemgschx1mz8wo4.us-east-1.aws.endpoints.huggingface.cloud",
  "BohdanPetryshyn/codellama-7b-openapi-completion-merged-ctx-lvl-fim-05-spm-2048":
    "https://ksrtud8rmi16mfdv.us-east-1.aws.endpoints.huggingface.cloud",
  "BohdanPetryshyn/codellama-7b-openapi-completion-merged-ctx-lvl-fim-05-spm-5120":
    "https://h9gl8koc24k4jn6y.us-east-1.aws.endpoints.huggingface.cloud",
  "BohdanPetryshyn/codellama-7b-openapi-completion-merged-ctx-lvl-fim-05-spm-doc-split-1-08-12":
    "https://lha98s52gaztyq5r.us-east-1.aws.endpoints.huggingface.cloud",
};

let hfClient = new HfInference(process.env.HF_API_KEY);
hfClient = await hfClient.endpoint(endpoints[MODEL]);

export const hf = hfClient;
