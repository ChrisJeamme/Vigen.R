const ERROR_DISPLAYING_DELAY = 2000;

var pageInitialisation = function()
{
    //// Ecouteurs JBL ////
    
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

    // Gestion clic bouton encodage
    document.querySelector('#encodingButton').onclick =
    ()=>
    {
        if(document.querySelector('#encodingTextArea').value == "")
            displayErrorColor("#encodingTextArea");
        else
            document.querySelector('#decodingTextArea').value = encoding(document.querySelector('#encodingTextArea').value);
    }

    // Gestion clic bouton décodage
    document.querySelector('#decodingButton').onclick =
    ()=>
    {
        if(document.querySelector('#decodingTextArea').value == "")
            displayErrorColor("#decodingTextArea");
        else
            document.querySelector('#encodingTextArea').value = decoding(document.querySelector('#decodingTextArea').value);
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

var displayErrorColor = function(elementName) // 
{
    var element = document.querySelector(elementName);
    if(element != undefined && element != null)
        if(!element.classList.contains('error'))
        {
            element.classList.add("error");
            setTimeout(()=>{element.classList.remove('error')}, ERROR_DISPLAYING_DELAY);
        }
            
}