const clickOnAttack = function()
{
    if(document.querySelector('#attackTextArea').value == "")
        displayErrorColor("#attackTextArea");
    else
    {

		//Kasiski
        let text = messageTransformation(noAccent(document.querySelector('#attackTextArea').value));

        let result = findKeyLength(text);
        let keyLength = result.keyLength;
        let sequences = result.sequences;
        let infos = result.factorsToDisplay;
		
		//IC
		let keyLengthIC = getLongueurCleIC(text);
        
        if (keyLength !== undefined)
        {
            frequency(text,keyLength);
            let shift = findAllShift();
            let textToDisplay = colorSequences(text, sequences);
            let infosToDisplay = displayInfos(infos);

            document.querySelector('#results').classList.remove('hide');
            document.querySelector('#displaySequences').innerHTML = textToDisplay;
            document.querySelector('#showDetails').innerHTML = infosToDisplay;
            document.querySelector('#attackResult').innerHTML = "Kasiski : " + keyLength;
			document.querySelector('#attackResultIC').innerHTML = "IC : " + keyLengthIC[0] + " (" + Math.round(keyLengthIC[1]*1000)/1000 + ")";
			
            document.querySelector('#keyFound').innerHTML = shift.join(' ');

            document.querySelector('#decodedMessage').innerHTML = decoding(text, shift.join(''));

        } else 
        {
            document.querySelector('#attackResult').innerHTML += "Ce message n'a pas pu être attaqué";
        }
    }
}

const clickOnBomb = function()
{
    goToAttackingMenu();
        
    // Copie d'un éventuel contenu déjà saisie dans le menu de décodage
    if(document.querySelector('#encodingTextArea').value == "")
        displayErrorColor("#encodingTextArea");
    else 
        if(document.querySelector('#encodingKeyTextArea').value == "")
            displayErrorColor("#encodingKeyTextArea");
        else
        {
            document.querySelector('#decodingKeyTextArea').value = document.querySelector('#encodingKeyTextArea').value;
            document.querySelector('#decodingTextArea').value = encoding(document.querySelector('#encodingTextArea').value, document.querySelector('#encodingKeyTextArea').value);
        }
}

const clickOnDecodingButton = function()
{
    let textToDecode = document.querySelector('#decodingTextArea').value;
    let keyForDecoding = document.querySelector('#decodingKeyTextArea').value;

    if(textToDecode == "")
        displayErrorColor("#decodingTextArea");
    else
    {
        if(keyForDecoding == "")
            displayErrorColor("#decodingKeyTextArea");
        else
        {
            textToDecode = messageTransformation(noAccent(textToDecode));
            keyForDecoding = messageTransformation(noAccent(keyForDecoding));

            // Mise en forme du message
            document.querySelector('#decodingTextArea').value = textToDecode; 
            // Mise en forme de la clé
            document.querySelector('#decodingKeyTextArea').value = keyForDecoding; 
            // Copie de la clé du coté encodage
            document.querySelector('#encodingKeyTextArea').value = keyForDecoding;
            // Décodage et ecriture du coté encodage
            document.querySelector('#encodingTextArea').value = decoding(textToDecode, keyForDecoding);
        }
    }
}

const clickOnEncodingButton = function()
{
    let textToEncode = document.querySelector('#encodingTextArea').value;
    let keyForEncoding = document.querySelector('#encodingKeyTextArea').value;

    if(textToEncode == "")
        displayErrorColor("#encodingTextArea");
    else 
        if(keyForEncoding == "")
            displayErrorColor("#encodingKeyTextArea");
        else
        {
            textToEncode = messageTransformation(noAccent(textToEncode));
            keyForEncoding = messageTransformation(noAccent(keyForEncoding));

            // Mise en forme du message
            document.querySelector('#encodingTextArea').value = textToEncode; 
            // Mise en forme de la clé
            document.querySelector('#encodingKeyTextArea').value = keyForEncoding; 
            // Copie de la clé du coté décodage
            document.querySelector('#decodingKeyTextArea').value = keyForEncoding;
            // Décodage et ecriture du coté décodage
            document.querySelector('#decodingTextArea').value = encoding(textToEncode, keyForEncoding);
        }
}