CONTEXT_SIZES=( "1024" "2048" "3072" "4096" "5120" "6144" "7168" )

echo "Running experiments"

for i in "${!CONTEXT_SIZES[@]}"; do
    CONTEXT_SIZE="${CONTEXT_SIZES[$i]}"

    EXPERIMENT="$PREFIX-$SUFFIX-$CONTEXT_SIZE-$EXPERIMENT_NAME"
    
    echo "Running experiment $EXPERIMENT"
    CONTEXT_SIZE="$CONTEXT_SIZE" EXPERIMENT_NAME="$EXPERIMENT" node src/infill-test-cases.js

    echo "Evaluating experiment $EXPERIMENT"
    CONTEXT_SIZE="$CONTEXT_SIZE" EXPERIMENT_NAME="$EXPERIMENT" node src/evaluate-results.js
done