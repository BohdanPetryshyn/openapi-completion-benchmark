EXPERIMENTS=( "1024" "2048" "3072" "4096")
CONTEXT_SIZES=( "1024" "2048" "3072" "4096")

echo "Running experiments"

for i in "${!EXPERIMENTS[@]}"; do
    EXPERIMENT="${EXPERIMENTS[$i]}"
    CONTEXT_SIZE="${CONTEXT_SIZES[$i]}"
    
    echo "Running experiment $EXPERIMENT"
    MODEL="codellama/CodeLlama-13b-hf" PROMPT_BUILDER=naive-asymmetrical PREFIX="0.5" SUFFIX="0.5" CONTEXT_SIZE="$CONTEXT_SIZE" EXPERIMENT_NAME="50-50-$EXPERIMENT-no-overfilling" node src/infill-test-cases.js

    echo "Evaluating experiment $EXPERIMENT"
    MODEL="codellama/CodeLlama-13b-hf" PROMPT_BUILDER=naive-asymmetrical PREFIX="0.5" SUFFIX="0.5" CONTEXT_SIZE="$CONTEXT_SIZE" EXPERIMENT_NAME="50-50-$EXPERIMENT-no-overfilling" node src/evaluate-results.js
done