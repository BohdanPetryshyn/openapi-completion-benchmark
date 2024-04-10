# OpenAPI Completion Benchmark

This repository contains the code and data for the paper "Optimizing Large Language Models for OpenAPI Completion: A Comparative Analysis of Code Llama and GitHub Copilot" by [Bohdan Petryshyn](https://www.linkedin.com/in/bpetryshyn/) and [Mantas Lukoševičius](https://www.linkedin.com/in/lukosevicius/).

## Abstract

Recent advancements in Large Language Models (LLMs) and their utilization in code generation tasks have significantly reshaped the field of software development. Despite their remarkable efficacy in mainstream programming languages, their performance lags when applied to less ubiquitous tasks such as OpenAPI definitions. This study evaluates the OpenAPI completion performance of GitHub Copilot, a prevalent commercial code completion tool, and proposes an alternative solution leveraging Meta's open-source model Code Llama. An OpenAPI completion benchmark proposed in this research is used to evaluate the performance of both solutions. Through a series of over thirty experiments, the impact of various factors and prompt-engineering techniques on the Code Llama model's performance is analyzed. The suggested solution surpasses GitHub Copilot in accurate OpenAPI completion generation by 34\%, despite utilizing a model with 25 times fewer parameters.

## Dataset

The OpenAPI definitions dataset used in this study is available in the `eval/apis` directory. The dataset consists of 10 large OpenAPI definitions. The `eval/src/prepare-test-cases.js` script can be used to generate test cases from the dataset. By default, 10 tests are generated from each OpenAPI definition. The generated test cases are stored in the `eval/tests` directory which currently contains 100 test cases used in the original evaluation.

The `eval/apis-json` and `eval/tests-json` directories contain the same OpenAPI definitions converted to JSON format and the corresponding test cases in JSON format.

The following command can be used to generate test cases from the OpenAPI definitions:

```bash
export DEFINITIONS_DIR="<Your definitions. Default: eval/apis>"
export TEST_CASES_DIR="<Your test cases output dir. Default: eval/tests>"
export FORMAT="<JSON or YAML. Default: YAML>"

node eval/src/prepare-test-cases.js
```

## Benchmark
