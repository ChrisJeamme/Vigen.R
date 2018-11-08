

// Trouve la longueur de la clé de cryptage
const findKeyLength = function(message)
{
    let cutSize = 30;
    let possibleKeyLengths = [];

    while(cutSize > 2 && possibleKeyLengths.length !== 1)
    {
        console.log("cutSize = ", cutSize);
        let sequences = {};
        let interestingSequences = {};
    
        findRepetition(cutSize, message, sequences, interestingSequences);
    
        // console.log(sequences);
        // console.log("Séquences intéréssantes = ");
        // console.log(interestingSequences);
    
        for(seq in interestingSequences)
        {
            // console.log(seq);
            // console.log("Longueur = "+interestingSequences[seq].index.length);
            interestingSequences[seq].indexSeparation = [];
    
            for(let i=0; i<interestingSequences[seq].index.length-1; i++)
            {
                let seperationLength = interestingSequences[seq].index[i+1]-interestingSequences[seq].index[i];
                interestingSequences[seq].indexSeparation.push(seperationLength);
            }

            //console.log("Sépération des index = " + interestingSequences[seq].indexSeparation);

            interestingSequences[seq].indexSeparation.forEach(
                (seperationLength)=>
                {
                    if (possibleKeyLengths.length === 0)
                    {
                        possibleKeyLengths = findDividers(seperationLength);
                    }
                    possibleKeyLengths = intersect(possibleKeyLengths, findDividers(seperationLength));
                    // addNewPossibleKeyLength(possibleKeyLengths, seperationLength);
                    console.log(possibleKeyLengths);
                }
            )
        }
        cutSize--;
    }
    console.log("Longueur de la clé :", possibleKeyLengths[possibleKeyLengths.length-1]);

};

// Ajoute (si pas déjà présent) un nombre et ses diviseurs à la liste des longueurs de clé possible
const addNewPossibleKeyLength = function(possibleKeyLengths, seperationLength)
{
    let dividers = findDividers(seperationLength);

    possibleKeyLengths = intersect(possibleKeyLengths, dividers); 
}

// Découpe le message et trouve les séquences qui se répètent
const findRepetition = function(size, message, sequences, interestingSequences)
{
    let interestingSequencesNames = [];

    // Découpage
    for (let i=0; i<message.length-size-1; i++)
    {
        let substr = message.substring(i, i+size);
        if (sequences[substr] && !interestingSequencesNames.includes(substr)) //On a déjà vu une séquence identique && pas déjà ajouté
        {
            interestingSequencesNames.push(substr);
        }
        else 
        {
            if(!sequences[substr]) //Nouvelle séquence
            {
                sequences[substr] = {"index":[]};
            }
        }
        sequences[substr].index.push(i);
    }

    // Elimination des séquences à 1 occurrence
    console.log("size:",size);
    console.log("interestingSequences:",interestingSequences);
    
    interestingSequencesNames.forEach((seq)=>
    {
        if(!isSequenceInInterestingSequences(seq, interestingSequences))
        {
            interestingSequences[seq] = sequences[seq];
            interestingSequences[seq].occurrency = interestingSequences[seq].index.length;
        }
    });

};

const isSequenceInInterestingSequences = function(sequence, interestingSequences)
{
    Object.keys(interestingSequences).forEach(element => 
        {
            if(element.includes(sequence))
            {
                return true;
            }
        });
    return false;
}

const findDividers = function(integer)
{
    let dividers = [];    
    for (let i=2; i<=integer/2; i++)
    {
        if (integer%i === 0)
        {
            dividers.push(i);                        
        }
    }
    dividers.push(integer);   
    return dividers;
};

const isPrimeNumber = function(integer)
{
    return findDividers(integer).length==1;
};

const intersect = function(array1, array2)
{
    return array1.filter(value => {
        return -1 !== array2.indexOf(value)}
    );
}

const canWeStop = function(array)
{
    if (array.length === 0)
    {
        return false;
    }
    let last = array[array.length-1];
    for (let i=0; i<array.length-1; i++)
    {
        if (last % array[i] !== 0)
        {
            return false;
        }
    }
    console.log(array)
    return true;
}
