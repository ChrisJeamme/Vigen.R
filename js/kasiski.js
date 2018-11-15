

// Trouve la longueur de la clé de cryptage
const findKeyLength = function(message)
{
    let cutSize = 30;
    let possibleKeyLengths = [];
    let savedSequences = [];
    let numberOfIntersection = 0;
    
    while(cutSize > 2 && possibleKeyLengths.length !== 1 && numberOfIntersection<5)
    {
        // console.log("cutSize = ", cutSize);
        let interestingSequences = {};
        
        findRepetition(cutSize, message, interestingSequences, savedSequences);
    
        // console.log(sequences);
        // console.log("Séquences intéréssantes = ");
        // console.log(interestingSequences);
    
        for(seq in interestingSequences) //On parcourt les séquences intéressantes trouvées de cette longueur
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
                    numberOfIntersection++;
                    // addNewPossibleKeyLength(possibleKeyLengths, seperationLength);
                    //console.log(possibleKeyLengths);
                }
            )
        }
        cutSize--;
        // console.log("SavedSequences :", savedSequences);
        // console.log("possibleKeyLength :", possibleKeyLengths);
    }
    // console.log("Longueur de la clé :", possibleKeyLengths[possibleKeyLengths.length-1]);
    return possibleKeyLengths[possibleKeyLengths.length-1];
};

// Ajoute (si pas déjà présent) un nombre et ses diviseurs à la liste des longueurs de clé possible
const addNewPossibleKeyLength = function(possibleKeyLengths, seperationLength)
{
    let dividers = findDividers(seperationLength);

    possibleKeyLengths = intersect(possibleKeyLengths, dividers); 
}

// Découpe le message et trouve les séquences qui se répètent
const findRepetition = function(size, message, interestingSequences, savedSequences)
{
    let interestingSequencesNames = [];
    let sequences = {};

    // Découpage
    for (let i=0; i<message.length-size-1; i++)
    {
        let substr = message.substring(i, i+size);
        if (sequences[substr] && !isSequenceInSavedSequences(substr,savedSequences)) //On a déjà vu une séquence identique && pas déjà ajouté
        {
            interestingSequencesNames.push(substr);
            savedSequences.push(substr);
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
    interestingSequencesNames.forEach((seq)=>
    {
        interestingSequences[seq] = sequences[seq];
        interestingSequences[seq].occurrency = interestingSequences[seq].index.length;
    });

};

const isSequenceInSavedSequences = function(sequence, savedSequences)
{
    for (let i=0; i<savedSequences.length; i++)
    {
        if (savedSequences[i].includes(sequence))
        {
            return true;
        }
    }
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
    let inter = array1.filter(value => {
        return -1 !== array2.indexOf(value)}
    );
    if (inter.length === 0)
        return array1;
    else 
        return inter;
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
    return true;
}

const frequency = function(text, keyLength)
{
    // Calcul des occurences
    let frequencies = [];

    for(let shift=0; shift<keyLength; shift++)
    {
        let frequency = [];
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(
            (letter)=>{frequency[letter] = 0;});
    
        for(let i=shift; i<text.length; i+=keyLength)
        {
            frequency[text[i]]++;
        }
        frequencies.push(frequency);
    }
    console.log(frequencies)

    // TODO : passer en fréquences

    // Affichage des graphiques
    resetCharts();
    frequencies.forEach(displayFrequencyChart);

    return frequencies;
}