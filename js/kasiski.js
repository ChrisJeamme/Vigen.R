const findKeyLength = function(message) {
    let sequences = {};
    let interestingSequences = [];
    for (let i=0; i<message.length-2; i++){
        let substr = message.substring(i, i+3);
        if (sequences[substr]){ //On a déjà vu une séquence identique
            interestingSequences.push(substr);
        }
        else {
            sequences[substr] = []
        }
        sequences[substr].push(i);
    }
    console.log(sequences);
    console.log(interestingSequences);
}
