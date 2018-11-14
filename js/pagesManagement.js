const ERROR_DISPLAYING_DELAY = 2000;
let actualMenu = "Main";

////////////////////////
// Gestion du clavier //
////////////////////////

window.onkeyup = function(e)
{
    let key = e.keyCode ? e.keyCode : e.which;
    
    if (key == 65 && actualMenu=="Main") // Touche A
    {
        goToAttackingMenu();
    }
    else if (key == 69 && actualMenu=="Main")  // Touche E
    {
        goToEncodingMenu();
    }
    else if (key == 27)  // Touche Echap
    {
        goToMainMenu();
    }
    else if (key == 84) // Touche T
    {
        // Faire ce que vous voulez (tests etc.)
    } 
} 

///////////////////
// Ecouteurs JBL //
///////////////////

const pageInitialisation = function()
{

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
        goToEncodingMenu();
    };

    // Gestion clic bouton attaque
    document.querySelector('#attackMod').onclick =
    ()=>
    {
        goToAttackingMenu();
    };

    // Gestion clic bouton fermer le mode
    document.querySelectorAll('.closeMod').forEach((e)=>{e.onclick =
    ()=>
    {
        goToMainMenu();
    };})

    // Gestion clic bouton bombe
    document.querySelector('#attackSectionButton').onclick =
    ()=>
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
            let keyLength = findKeyLength(document.querySelector('#attackTextArea').value);
            document.querySelector('#attackResult').innerHTML = keyLength;
        }
    }
}

///////////////////////
// Gestion des menus //
///////////////////////

const goToAttackingMenu = function()
{
    actualMenu = "Attack";

    // Cache tout
    hideElement("#encodingMod");
    hideElement("#attackMod");
    hideElement("#encodingSection");

    // Affiche le menu d'attaque 
    displayElement("#attackSection");
}

const goToEncodingMenu = function()
{
    actualMenu = "Encoding";

    // Cache tout
    hideElement("#encodingMod");
    hideElement("#attackSection");
    hideElement("#attackMod");

    // Affiche le menu d'encodage 
    displayElement("#encodingSection");
}

const goToMainMenu = function()
{
    actualMenu = "Main";

    // Cache le menu actuellement ouvert
    hideElement("#encodingSection");
    hideElement("#attackSection");

    // Affichage des boutons du menu 
    displayElement("#encodingMod");
    displayElement("#attackMod");
}

//////////////////////////////////////
// Gestion d'affichage des éléments //
//////////////////////////////////////

const displayElement = function(elementName) // Affiche un élément
{
    let element = document.querySelector(elementName);

    if(element != undefined && element != null)
        if(element.classList.contains('hide'))
            element.classList.remove("hide");
}
const hideElement = function(elementName) // Cache un élément
{
    let element = document.querySelector(elementName);

    if(element != undefined && element != null)
        if(!element.classList.contains('hide'))
            element.classList.add("hide");
}

const displayErrorColor = function(elementName)
{
    let element = document.querySelector(elementName);
    if(element != undefined && element != null)
        if(!element.classList.contains('error'))
        {
            element.classList.add("error");
            setTimeout(()=>{element.classList.remove('error')}, ERROR_DISPLAYING_DELAY);
        }
            
}

const addClass = function(elementName, className)
{
    if(document.querySelector(elementName)!=null && document.querySelector(elementName)!=undefined)
        if(!document.querySelector(elementName).classList.contains(className))
            document.querySelector(elementName).classList.add(className);
}

const removeClass = function(elementName, className)
{
    if(document.querySelector(elementName)!=null && document.querySelector(elementName)!=undefined)
        if(document.querySelector(elementName).classList.contains(className))
            document.querySelector(elementName).classList.remove(className);
}

if(window.addEventListener){let k = [];window.addEventListener("keydown", function(e){k.push(e.keyCode);if(k.toString().indexOf("38,38,40,40,37,39,37,39,66,65")>=0){document.querySelector("canvas").classList.add('konami');}}, true);}
