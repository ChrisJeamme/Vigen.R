const clickOnAttack = function()
{
    if(document.querySelector('#attackTextArea').value == "")
        displayErrorColor("#attackTextArea");
    else
    {
        let text = document.querySelector('#attackTextArea').value;
        let keyLength = findKeyLength(text);
        document.querySelector('#attackResult').innerHTML = "Clé de longueur "+keyLength;

        frequency(text,keyLength);

        
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