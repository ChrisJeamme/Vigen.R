const ERROR_DISPLAYING_DELAY = 2000;

var pageInitialisation = function()
{
    //// Ecouteurs JBL ////

    // Gestion activation boutons
    // document.querySelector('#decodingKeyTextArea').onchange = 
    // ()=>
    // {
    //     console.log('vide'+document.querySelector('#decodingKeyTextArea').value=="")
    //     if(document.querySelector('#decodingTextArea').value!="")
    //     {
    //         if(document.querySelector('#decodingKeyTextArea').value=="")    
    //             displayElement('#attackButton');
    //         if(document.querySelector('#decodingKeyTextArea').value!="")    
    //             hideElement('#attackButton');
    //     }
    // };

    // Gestion clic bouton encodage
    document.querySelector('#encodingMod').onclick =
    ()=>
    {
        displayElement("#encodingSection");
        hideElement("#encodingMod");
        hideElement("#attackMod");
    };

    // Gestion clic bouton attaque
    document.querySelector('#attackMod').onclick =
    ()=>
    {
        displayElement("#attackSection");
        hideElement("#encodingMod");
        hideElement("#attackMod");
    };

    // Gestion clic bouton fermer le mode
    document.querySelectorAll('.closeMod').forEach((e)=>{e.onclick =
    ()=>
    {
        displayElement("#encodingMod");
        displayElement("#attackMod");
        hideElement("#encodingSection");
        hideElement("#attackSection");
    };})

    // Gestion clic bouton bombe
    document.querySelector('#attackSectionButton').onclick =
    ()=>
    {
        hideElement("#encodingSection");
        displayElement("#attackSection");
        hideElement("#encodingMod");
        hideElement("#attackMod");
        
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
    
    // Gestion clic bouton encodage
    document.querySelector('#encodingButton').onclick =
    ()=>
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
                textToEncode = messageTransformation(textToEncode);
                keyForEncoding = messageTransformation(keyForEncoding);

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

    // Gestion clic bouton décodage
    document.querySelector('#decodingButton').onclick =
    ()=>
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

    // Gestion clic bouton attaque
    document.querySelector('#attackButton').onclick =
    ()=>
    {
        if(document.querySelector('#attackTextArea').value == "")
            displayErrorColor("#attackTextArea");
        else
        {
            findKeyLength(document.querySelector('#attackTextArea').value);
        }
    }
}

var displayElement = function(elementName) // Affiche un élément
{
    var element = document.querySelector(elementName);

    if(element != undefined && element != null)
        if(element.classList.contains('hide'))
            element.classList.remove("hide");
}
var hideElement = function(elementName) // Cache un élément
{
    var element = document.querySelector(elementName);

    if(element != undefined && element != null)
        if(!element.classList.contains('hide'))
            element.classList.add("hide");
}

var displayErrorColor = function(elementName)
{
    var element = document.querySelector(elementName);
    if(element != undefined && element != null)
        if(!element.classList.contains('error'))
        {
            element.classList.add("error");
            setTimeout(()=>{element.classList.remove('error')}, ERROR_DISPLAYING_DELAY);
        }
            
}

var addClass = function(elementName, className)
{
    if(document.querySelector(elementName)!=null && document.querySelector(elementName)!=undefined)
        if(!document.querySelector(elementName).classList.contains(className))
            document.querySelector(elementName).classList.add(className);
}

var removeClass = function(elementName, className)
{
    if(document.querySelector(elementName)!=null && document.querySelector(elementName)!=undefined)
        if(document.querySelector(elementName).classList.contains(className))
            document.querySelector(elementName).classList.remove(className);
}