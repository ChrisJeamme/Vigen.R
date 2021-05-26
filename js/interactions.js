const clickOnAttack = function ()
{
    if (document.querySelector('#attackTextArea').value == "")
    {
        displayErrorColor("#attackTextArea");
        Swal.fire({ icon: 'error', title: 'Erreur', text: "Le message est vide" })
    }
    else
    {
        //Kasiski
        let text = messageTransformation(noAccent(document.querySelector('#attackTextArea').value));

        console.log(text)
        let result = findKeyLength(text);
        console.log(result)
        let keyLength = result.keyLength;
        let infos = result.factorsToDisplay;

        //IC
        let keyLengthIC = getLongueurCleIC(text);

        if (keyLength !== undefined)
        {
            Swal.fire({
              toast: true,
              position: 'top',
              timer: 3000,
              showConfirmButton: false,
              title: 'Succès',
              text: 'Le message a été décrypté',
              icon: 'success',
            });
            frequency(text, keyLength);

            let matchingLanguage = scoringLanguages();
            console.log("Langue la plus plausible = " + matchingLanguage);

            let shiftMatchingLanguage = findAllShift(languages[languagesNames.indexOf(matchingLanguage)]);
            let shiftFR = findAllShift(frenchFrequency);
            // let shiftEN = findAllShift(englishFrequency);
            // let shiftES = findAllShift(spanishFrequency);
            // let shiftGER = findAllShift(germanFrequency);

            let shift = shiftFR; // Selection ici du language utilisé pour la cryptanalyse : shiftMatchingLanguage / shiftFR / shiftEN / shiftES / shiftGER

            let textToDisplay = colorSequences(text, infos);
            let infosToDisplay = displayInfos(infos);

            document.querySelector('#results').classList.remove('hide');
            document.querySelector('#displaySequences').innerHTML = textToDisplay;
            document.querySelector('#showDetails').innerHTML = infosToDisplay;
            // document.querySelector('#languageDetails').innerHTML = matchingLanguage;
            document.querySelector('#attackResult').innerHTML = "<strong>Kasiski : </strong>" + keyLength;
            document.querySelector('#attackResultIC').innerHTML = "<strong>IC : </strong>" + keyLengthIC[0] + " (" + Math.round(keyLengthIC[1] * 1000) / 1000 + ")";

            document.querySelector('#keyFound').innerHTML = shift.join(' ');

            document.querySelector('#decodedMessage').innerHTML = decoding(text, shift.join(''));

        } else 
        {
            Swal.fire({ icon: 'error', title: 'Erreur', text: "Echec de l'attaque sur ce message" })
        }
    }
}

const clickOnBomb = function ()
{
    goToAttackingMenu();

    // Copie d'un éventuel contenu déjà saisie dans le menu de décodage
    if (document.querySelector('#encodingTextArea').value == "")
        displayErrorColor("#encodingTextArea");
    else
        if (document.querySelector('#encodingKeyTextArea').value == "")
            displayErrorColor("#encodingKeyTextArea");
        else
        {
            document.querySelector('#decodingKeyTextArea').value = document.querySelector('#encodingKeyTextArea').value;
            document.querySelector('#decodingTextArea').value = encoding(document.querySelector('#encodingTextArea').value, document.querySelector('#encodingKeyTextArea').value);
        }
}

const clickOnDecodingButton = function ()
{
    let textToDecode = document.querySelector('#decodingTextArea').value;
    let keyForDecoding = document.querySelector('#decodingKeyTextArea').value;

    if (textToDecode == "")
        displayErrorColor("#decodingTextArea");
    else
    {
        if (keyForDecoding == "")
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

const clickOnEncodingButton = function ()
{
    let textToEncode = document.querySelector('#encodingTextArea').value;
    let keyForEncoding = document.querySelector('#encodingKeyTextArea').value;

    if (textToEncode == "")
        displayErrorColor("#encodingTextArea");
    else
        if (keyForEncoding == "")
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