let frequencies;
let occurencies;
let frenchFrequency = [0.0840, 0.0106, 0.0302, 0.0418, 0.1726, 0.0112, 0.0127, 0.0092, 0.0733, 0.0031, 0.0005, 0.0601, 0.0296, 0.0713, 0.0526, 0.0301, 0.0098, 0.0655, 0.0808, 0.0707, 0.0574, 0.0132, 0.0004, 0.0045, 0.003, 0.0012];
let englishFrequency = [0.0812, 0.0149, 0.0271, 0.0432, 0.1202, 0.0230, 0.0203, 0.0592, 0.0731, 0.001, 0.0069, 0.0398, 0.0261, 0.0695, 0.0768, 0.0182, 0.0011, 0.0602, 0.0628, 0.0910, 0.0288, 0.0111, 0.0209, 0.0017, 0.0211, 0.0007];
let spanishFrequency = [0.1230, 0.0103, 0.0449, 0.0504, 0.1369, 0.0077, 0.0104, 0.0065, 0.0778, 0.0028, 0.0002, 0.0584, 0.0284, 0.0741, 0.0868, 0.0263, 0.0102, 0.0644, 0.0697, 0.0482, 0.0399, 0.0104, 0.0002, 0.0016, 0.0066, 0.0034];
let germanFrequency = [0.0628, 0.0199, 0.0298, 0.0504, 0.1692, 0.0162, 0.0312, 0.0451, 0.0742, 0.0030, 0.0146, 0.0356, 0.0254, 0.1020, 0.0287, 0.0077, 0.0002, 0.0744, 0.0662, 0.0595, 0.0439, 0.0107, 0.0152, 0.0003, 0.0010, 0.0124];

// Trouve la longueur de la clé de cryptage
const findKeyLength = function(message)
{
    let cutSize = 30;
    let possibleKeyLengths = [];
    let savedSequences = [];
    let sequencesToDisplay = [];
    let numberOfIntersection = 0;
    
    while(cutSize > 2 && possibleKeyLengths.length !== 1 && numberOfIntersection<5)
    {
        let interestingSequences = {};
        findRepetition(cutSize, message, interestingSequences, savedSequences);
    
        for(seq in interestingSequences) //On parcourt les séquences intéressantes trouvées de cette longueur
        {
            interestingSequences[seq].indexSeparation = [];
    
            for(let i=0; i<interestingSequences[seq].index.length-1; i++)
            {
                let seperationLength = interestingSequences[seq].index[i+1]-interestingSequences[seq].index[i];
                interestingSequences[seq].indexSeparation.push(seperationLength);
            }

            interestingSequences[seq].indexSeparation.forEach(
                (seperationLength)=>
                {
                    if (possibleKeyLengths.length === 0)
                    {
                        possibleKeyLengths = findDividers(seperationLength);
                    }
                    let dividers = findDividers(seperationLength);
                    let intersection = intersect(possibleKeyLengths, dividers);
                    if (intersection.length !== 0)
                    {
                        let newSeq = {};
                        newSeq.name = seq
                        newSeq.seperationLength = seperationLength;
                        newSeq.dividers = dividers;
                        sequencesToDisplay.push(newSeq);
                        possibleKeyLengths = intersection;
                    } else 
                    {
                        return {
                            keyLength: possibleKeyLengths[possibleKeyLengths.length-1],
                            sequences: savedSequences,
                            factorsToDisplay: sequencesToDisplay
                        };
                    }
                    numberOfIntersection++;
                }
            )
        }
        cutSize--;
    }
    return {
        keyLength: possibleKeyLengths[possibleKeyLengths.length-1],
        sequences: savedSequences,
        factorsToDisplay: sequencesToDisplay
    };
};

const colorSequences = function(text, sequencesArray)
{
    let saveColors = {};
    for (let i=0; i<sequencesArray.length; i++)
    {
        let sequence = sequencesArray[i];
        let size = sequence.length;
        for (let j=0; j<text.length-size; j++)
        {
            if (text.substring(j, j+size) === sequence)
            {
                for (let k=j; k<j+size; k++)
                {
                    if (saveColors[k])
                    {
                        saveColors[k] = 'x'; //Chevauchement entre 2 facteurs
                    }
                    else 
                    {
                        saveColors[k] = i+1;
                    }
                }
            }
        }
    }
    let newText = "";
    for (let i=0; i<text.length; i++)
    {
        if (saveColors[i])
        {
            newText += '<i class="seq'+saveColors[i]+'">'+text.charAt(i)+'</i>';
        } else 
        {
            newText += text.charAt(i);
        }
    }
    return newText;
}

const displayInfos = function(infos)
{
    let response = `<table class="table is-fullwidth box">
                      <thead>
                          <tr>
                              <th>Facteur</th>
                              <th>Distance</th>
                              <th>Diviseurs possible</th>
                          </tr>
                       <thead>
                       <tbody>`;

    for (let i=0; i<infos.length; i++)
    {
        response += `<tr>
                       <td><i class="seq`+(i+1)+`">`+infos[i].name+`</i></td>
                       <td>`+infos[i].seperationLength+`</td>
                       <td>`+infos[i].dividers+`</td>
                    </tr>`;
    }

    response += `   </tbody>
                </table>`;

    return response;

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

// Trouve le décalage de chaque lettre de la clé
const findAllShift = function()
{   
    let shift = [];

    frequencies.forEach(
        frequency=>
        {
            let index = scoringTests(frequency);

            shift.push(String.fromCharCode('A'.charCodeAt(0)+index));
        }
    );
    return shift;
}

// Fais un scoring avec tous les décalages possibles et renvoi le décalage au plus haut score
const scoringTests = function(frequency)
{
    let scores = [];
    let max = 0;
    let maxIndex = 0;

    for(let i=0; i<26; i++)
    {
        let score = frequenceComparison(shift(frequency,i), frenchFrequency);
        if(score > max)
        {
            max = score;
            maxIndex = i;
        }
        scores.push(score);
    }

    console.log(scores);
    return maxIndex;
}

// Donne un score à la diférrence entre 2 tableaux de fréquence
const frequenceComparison = function(frequence1, frequence2)
{
    let score = 0;
    frequence1.forEach(
        (freq1, i)=>
        {
            score += Math.abs(frequence2[i]-freq1);
        }
    )
    return 1/score;
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

/*
	Calcul l'indice de correlation d'un texte
	input : texte
	output : indice correlation
		- FR = 0.0778
		- EN = 0.0667
		- GER = 0.0762
		- IT = 0.0738
		- SPA = 0.0770
*/

const GetIndiceCorrelation = function(message) 
{
	
    message = message.replace(/[^A-Z]/g, ""); 
    var probaLettres = new Array(26); // Stock le nb d'occurrences de chaque caracteres
    var nbChar=0;
	var ic=0;
	
    for(i=0; i<26; i++) probaLettres[i] = 0; // Init
	
    for(i=0; i<message.length; i++)
	{
        probaLettres[message.charCodeAt(i) - 65]++;
        nbChar++;
    }
    var sommeProba = 0;
    for(i=0; i<26; i++)
	{
		sommeProba = sommeProba + probaLettres[i]*(probaLettres[i]-1);
	}
	
    ic = sommeProba / (nbChar*(nbChar-1));
    
	console.log("Indice correlation = " + ic);
	console.log("Nombre de caracteres = " + nbChar);
  	
	return(ic);
}