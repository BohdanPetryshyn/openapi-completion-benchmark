EXPERIMENTS=( "30-70" "40-60" "50-50" "60-40" "70-30" "80-20" "90-10" "100-0" )
PREFIXES=( "0.3" "0.4" "0.5" "0.6" "0.7" "0.8" "0.9" "1.0" )
SUFFIXES=( "0.7" "0.6" "0.5" "0.4" "0.3" "0.2" "0.1" "0.0" )

echo "Running experiments"

for i in "${!EXPERIMENTS[@]}"; do
    EXPERIMENT="${EXPERIMENTS[$i]}"
    PREFIX="${PREFIXES[$i]}"
    SUFFIX="${SUFFIXES[$i]}"
    
    echo "Running experiment $EXPERIMENT"
    MODEL="codellama/CodeLlama-7b-hf" PROMPT_BUILDER=naive-asymmetrical PREFIX="$PREFIX" SUFFIX="$SUFFIX" EXPERIMENT_NAME=$EXPERIMENT-no-overfilling node src/infill-test-cases.js

    echo "Evaluating experiment $EXPERIMENT"
    MODEL="codellama/CodeLlama-7b-hf" PROMPT_BUILDER=naive-asymmetrical PREFIX="$PREFIX" SUFFIX="$SUFFIX" EXPERIMENT_NAME=$EXPERIMENT-no-overfilling node src/evaluate-results.js
done