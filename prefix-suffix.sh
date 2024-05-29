PREFIXES=( "0.3" "0.4" "0.5" "0.6" "0.7" "0.8" "0.9" "1.0" )
SUFFIXES=( "0.7" "0.6" "0.5" "0.4" "0.3" "0.2" "0.1" "0.0" )

echo "Running experiments"

for i in "${!EXPERIMENTS[@]}"; do
    PREFIX="${PREFIXES[$i]}"
    SUFFIX="${SUFFIXES[$i]}"

    EXPERIMENT="$PREFIX-$SUFFIX-$CONTEXT_SIZE-$EXPERIMENT_NAME"
    
    echo "Running experiment $EXPERIMENT"
    PREFIX="$PREFIX" SUFFIX="$SUFFIX" EXPERIMENT_NAME="$EXPERIMENT" node src/infill-test-cases.js

    echo "Evaluating experiment $EXPERIMENT"
    PREFIX="$PREFIX" SUFFIX="$SUFFIX" EXPERIMENT_NAME="$EXPERIMENT" node src/evaluate-results.js
done