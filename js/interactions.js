const clickOnAttack = function()
{
    if(document.querySelector('#attackTextArea').value == "")
        displayErrorColor("#attackTextArea");
    else
    {
        let text = document.querySelector('#attackTextArea').value;
        let keyLength = findKeyLength(text);
        
        frequency(text,keyLength);
        let shift = findAllShift();

        document.querySelector('#attackResult').innerHTML = "Clé de longueur "+keyLength;
        document.querySelector('#attackResult').innerHTML += "<br /> Clé = "+shift.join(' ');
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
    if(document.querySelector('#decodingTextArea').value == "")
        displayErrorColor("#decodingTextArea");
    else
    {
        if(document.querySelector('#decodingKeyTextArea').value == "")
            displayErrorColor("#decodingKeyTextArea");
        else
        {
            document.querySelector('#encodingKeyTextArea').value = document.querySelector('#decodingKeyTextArea').value;
            document.querySelector('#encodingTextArea').value = decoding(document.querySelector('#decodingTextArea').value, document.querySelector('#decodingKeyTextArea').value);
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