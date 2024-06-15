# OpenAPI Completion Benchmark

This repository contains the code and data for the paper "Optimizing Large Language Models for OpenAPI Code Completion" by [Bohdan Petryshyn](https://orcid.org/0009-0003-4030-4842) and [Mantas Lukoševičius](https://orcid.org/0000-0001-7963-285X).

## Abstract

Recent advancements in Large Language Models (LLMs) and their utilization in code generation tasks have significantly reshaped the field of software development. Despite the remarkable efficacy of code completion solutions in mainstream programming languages, their performance lags when applied to less ubiquitous formats such as OpenAPI definitions. This study evaluates the OpenAPI completion performance of GitHub Copilot, a prevalent commercial code completion tool, and proposes a set of task-specific optimizations leveraging Meta's open-source model Code Llama. A semantics-aware OpenAPI completion benchmark proposed in this research is used to perform a series of experiments through which the impact of various prompt-engineering and fine-tuning techniques on the Code Llama model's performance is analyzed. The fine-tuned Code Llama model reaches a peak correctness improvement of 55.2% over GitHub Copilot despite utilizing 25 times fewer parameters than the commercial solution's underlying Codex model. Additionally, this research proposes an enhancement to a widely used code infilling training technique, addressing the issue of underperformance when the model is prompted with context sizes smaller than those used during training.

## Citation

If you found the benchmark the fine-tuning code helpful, please reference the original paper:

**BibTeX:**

```
@misc{petryshyn2024optimizing,
      title={Optimizing Large Language Models for OpenAPI Code Completion}, 
      author={Bohdan Petryshyn and Mantas Lukoševičius},
      year={2024},
      eprint={2405.15729},
      archivePrefix={arXiv},
      primaryClass={id='cs.SE' full_name='Software Engineering' is_active=True alt_name=None in_archive='cs' is_general=False description='Covers design tools, software metrics, testing and debugging, programming environments, etc. Roughly includes material in all of ACM Subject Classes D.2, except that D.2.4 (program verification) should probably have Logics in Computer Science as the primary subject area.'}
}
```

**APA:**

```
Petryshyn, B., & Lukoševičius, M. (2024). Optimizing Large Language Models for OpenAPI Code Completion. arXiv preprint arXiv:2405.15729.
```

## Dataset

The OpenAPI definitions dataset used in this study is available in the `apis` directory. The dataset consists of 10 large OpenAPI definitions. The `src/prepare-test-cases.js` script can be used to generate test cases from the dataset. By default, 10 tests are generated from each OpenAPI definition. The generated test cases are stored in the `tests` directory which currently contains 100 test cases used in the original evaluation.

The `apis-json` and `tests-json` directories contain the same OpenAPI definitions converted to JSON format and the corresponding test cases in JSON format.

The following command can be used to generate test cases from the OpenAPI definitions:

```bash
export DEFINITIONS_DIR="<Original definitions. Default: apis>"
export TEST_CASES_DIR="<Test cases output dir. Default: tests>"
export FORMAT="<JSON or YAML. Default: YAML>"

node src/prepare-test-cases.js
```

## Benchmark

The benchmarking consists of two steps: infilling and evaluation. The infilling step generates completions for the test cases using the models. The evaluation step compares the generated completions with the ground truth definitions and calculates the accuracy and validity metrics.

### Infilling

The input of this step is a directory with masked OpenAPI definitions (tets cases) and the output is a directory with completed definitions. The infilling can be done manually if the evaluated solution doesn't support programmatic access like in the case of GitHub Copilot which was evaluated in the original study. The `src/infill-test-cases.js` script can be used to infill the test cases using the Code Llama model.

The following command can be used to infill the test cases using the Code Llama model hosted on Hugging Face:

```bash
export TEST_CASES_DIR="<Test cases output dir. Default: tests>"

export HF_API_KEY="<Your Hugging Face API key>"
export MODEL="<Your model name. Default: codellama/CodeLlama-7b-hf>"
export ENDPOINT="<Your Hugging Face Inference Endpoint.>"
export PROMPT_BUILDER="<naive, naive-asymmetrical, naive-asymmetrical-spm, or with-components. Default: naive>"
export PREFIX="<Prefix ratio. Default: 0.5>"
export SUFFIX="<Suffix ratio. Default: 0.5>"
export CONTEXT_SIZE="<Context size, tokens. Default: 4096>"
export EXPERIMENT_NAME="<Experiment name for the output directory. Default: current timestamp>"

node src/infill-test-cases.js
```

The script will take the test cases from the directory specified in the `TEST_CASES_DIR` environment variable and output the completed test cases to the `runtime/results/<MODEL>/<PROMPT_BUILDER>/<EXPERIMENT_NAME>` directory. For the source code of the prompt builders, see the `src/prompt-builders` directory.

### Evaluation

The input of this step is a directory with completed OpenAPI definitions and the directory with the original OpenAPI definitions. The output is a directory with the evaluation results. The results contain the diffs generated with the [oasdiff](https://github.com/Tufin/oasdiff) tool and the output log file (`output.log`) which contains the accuracy and validity metrics.

The following command can be used to evaluate the completed test cases:

```bash
export DEFINITIONS_DIR="<Original definitions. Default: apis>"
export RESULTS_DIR="<Completed definitions output dir. Default: runtime/results>"

export MODEL="<codellama/CodeLlama-7b-hf or codellama/CodeLlama-13b-hf. Default: codellama/CodeLlama-7b-hf>"
export PROMPT_BUILDER="<naive, naive-asymmetrical, naive-asymmetrical-spm, or with-components. Default: naive>"
export EXPERIMENT_NAME="<Experiment name for the output directory. Default: current timestamp>"

node src/evaluate-results.js
```

The script will take the completed test cases from the directory specified in the `RESULTS_DIR` environment variable and the original OpenAPI definitions from the directory specified in the `DEFINITIONS_DIR` environment variable. The evaluation results will be stored in the `runtime/evaluations/<MODEL>/<PROMPT_BUILDER>/<EXPERIMENT_NAME>` directory.

### Repetitive Experiments

For all repetitive experiments from the original study, the helper bash scripts can be used.

```bash
export DEFINITIONS_DIR="<Original definitions. Default: apis>"
export TEST_CASES_DIR="<Test cases output dir. Default: tests>"
export FORMAT="<JSON or YAML. Default: YAML>"
export HF_API_KEY="<Your Hugging Face API key>"
export MODEL="<Your model name. Default: codellama/CodeLlama-7b-hf>"
export ENDPOINT="<Your Hugging Face Inference Endpoint.>"
export PROMPT_BUILDER="<naive, naive-asymmetrical, naive-asymmetrical-spm, or with-components. Default: naive>"
export PREFIX="<Prefix ratio. Default: 0.5>"
export SUFFIX="<Suffix ratio. Default: 0.5>"
export CONTEXT_SIZE="<Context size, tokens. Default: 4096>"

# Infills and evaluates the test cases for a range of prefix to suffix ratios
# Automatically sets the PREFIX and SUFFIX environment variables during experiments
bash prefix-suffix.sh

# Infills and evaluates the test cases for a range of context sizes
# Automatically sets the CONTEXT_SIZE environment variable during experiments
bash context-size.sh
```
