let frequencies;
let occurencies;
let frenchFrequency = [0.084, 0.0713, 0.0106, 0.0526, 0.0303, 0.0301, 0.0418, 0.0099, 0.1726, 0.0655, 0.0112, 0.0808, 0.0127, 0.0707, 0.0092, 0.0574, 0.0734, 0.0132, 0.0031, 0.0004, 0.0005, 0.0045, 0.0601, 0.0030, 0.0296, 0.0012];

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

// Donne un tableau de tableau de fréquence pour chaque lettre de la clé
const frequency = function(text, keyLength)
{
    // Calcul des occurences
    occurencies = [];

    for(let shift=0; shift<keyLength; shift++)
    {
        let occurrency = [];
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(
            (letter)=>{occurrency[letter] = 0;});
    
        for(let i=shift; i<text.length; i+=keyLength)
        {
            occurrency[text[i]]++;
        }
        occurencies.push(occurrency);
    }
    console.log(occurencies)

    // Affichage des graphiques
    resetCharts();
    occurencies.forEach(createFrequencyChart);
    
    // Transformation en fréquences

    frequencies = [];
    occurencies.forEach(
        occurrency =>
        {
            let frequency = [];
            let numberOfLetters = Object.keys(occurrency).length;

            "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(
                (letter)=>
                {                    
                    frequency.push(occurrency[letter]/numberOfLetters);
                });
            frequencies.push(frequency);
        });

    return frequencies;
}

const findShiftLength = function()
{
    
    frequencies.forEach(
        frequency=>
        {
            let scores = [];
            for(let i=0; i<26; i++)
            {
                console.log('Test avec '+shift(frequency,i));
                scores.push(frequenceComparison(shift(frequency,i), frenchFrequency));
                console.log('Résultat = '+scores[i]+'\n');
            }
            console.log(scores);
        }
    )

}

// Donne un score à la diférrence entre 2 tableaux de fréquence
// Score minimum = 0
// Score maximum (tableau de 26) = 26
const frequenceComparison = function(frequence1, frequence2)
{
    let score = 26;

    frequence1.forEach(
        (freq1, i)=>
        {
            score -= Math.abs(frequence2[i]-freq1);
            // console.log(Math.abs(frequence2[i]-freq1))
        }
    )
    console.log(score);
}

// Décale un tableau vers la gauche shiftLength fois
const shift = function(array, shiftLength)
{
    let array2 = JSON.parse(JSON.stringify(array));
    let shift = shiftLength;
    while(shift-->0)
        array2 = shiftOne(array2);
    return array2;
}

// Décale un tableau vers la gauche une fois
const shiftOne = function(array)
{
    let array2 = JSON.parse(JSON.stringify(array));
    return array2.splice(1).concat(array2[0]);
}