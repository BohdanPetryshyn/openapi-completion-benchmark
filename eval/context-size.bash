EXPERIMENTS=( "1024" "2048" "3072" "4096" "5120" "6144" "7168" )
CONTEXT_SIZES=( "1024" "2048" "3072" "4096" "5120" "6144" "7168" )

echo "Running experiments"

for i in "${!EXPERIMENTS[@]}"; do
    EXPERIMENT="${EXPERIMENTS[$i]}"
    CONTEXT_SIZE="${CONTEXT_SIZES[$i]}"
    
    echo "Running experiment $EXPERIMENT"
    MODEL="codellama/CodeLlama-7b-hf" PROMPT_BUILDER=naive-asymmetrical PREFIX="0.6" SUFFIX="0.4" CONTEXT_SIZE="$CONTEXT_SIZE" EXPERIMENT_NAME="60-40-$EXPERIMENT-no-overfilling" node src/infill-test-cases.js

    echo "Evaluating experiment $EXPERIMENT"
    MODEL="codellama/CodeLlama-7b-hf" PROMPT_BUILDER=naive-asymmetrical PREFIX="0.6" SUFFIX="0.4" CONTEXT_SIZE="$CONTEXT_SIZE" EXPERIMENT_NAME="60-40-$EXPERIMENT-no-overfilling" node src/evaluate-results.js
done