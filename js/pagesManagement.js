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
    else if (key == 84 && actualMenu=="Main") // Touche T
    {
        // Faire ce que vous voulez (tests etc.)
        goToAttackingMenu();
        document.querySelector('#attackTextArea').innerHTML="KQOWE FVJPU JUUNU KGLME KJINM WUXFQ MKJBG WRLFN FGHUD WUUMB SVLPS NCMUE KQCTE SWREE KOYSS IWCTU AXYOT APXPL WPNTC GOJBG FQHTD WXIZA YGFFN SXCSE YNCTS SPNTU JNYTG GWZGR WUUNE JUUQE APYME KQHUI DUXFP GUYTS MTFFS HNUOC ZGMRU WEYTR GKMEE DCTVR ECFBD JQCUS WVBPN LGOYL SKMTE FVJJT WWMFM WPNME MTMHR SPXFS SKFFS TNUOC ZGMDO EOYEE KCPJR GPMUR SKHFR SEIUE VGOYC WXIZA YGOSA ANYDO EOYJL WUNHA MEBFE LXYVL WNOJN SIOFR WUCCE SWKVI DGMUC GOCRU WGNMA AFFVN SIUDE KQHCE UCPFC MPVSU DGAVE MNYMA MVLFM AOYFN TQCUA FVFJN XKLNE IWCWO DCCUL WRIFT WGMUS WOVMA TNYBU HTCOC WFYTN MGYTQ MKBBN LGFBT WOJFT WGNTE JKNEE DCLDH WTVBU VGFBI JG".replace(/ /g,'');
        // frequency("KQOWEFVJPUJUUNUKGLMEKJINMWUXFQMKJBGWRLFNFGHUDWUUMBSVLPSNCMUEKQCTESWREEKOYSSIWCTUAXYOTAPXPLWPNTCGOJBGFQHTDWXIZAYGFFNSXCSEYNCTSSPNTUJNYTGGWZGRWUUNEJUUQEAPYMEKQHUIDUXFPGUYTSMTFFSHNUOCZGMRUWEYTRGKMEEDCTVRECFBDJQCUSWVBPNLGOYLSKMTEFVJJTWWMFMWPNMEMTMHRSPXFSSKFFSTNUOCZGMDOEOYEEKCPJRGPMURSKHFRSEIUEVGOYCWXIZAYGOSAANYDOEOYJLWUNHAMEBFELXYVLWNOJNSIOFRWUCCESWKVIDGMUCGOCRUWGNMAAFFVNSIUDEKQHCEUCPFCMPVSUDGAVEMNYMAMVLFMAOYFNTQCUAFVFJNXKLNEIWCWODCCULWRIFTWGMUSWOVMATNYBUHTCOCWFYTNMGYTQMKBBNLGFBTWOJFTWGNTEJKNEEDCLDHWTVBUVGFBIJG",5);
        // Clé = SCUBA
        clickOnAttack();
    } 
}  

////////////////
// Ecouteurs  //
////////////////

const pageInitialisation = function()
{
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
    // document.querySelector('#attackSectionButton').onclick = clickOnBomb;
    
    // Gestion clic bouton encodage
    document.querySelector('#encodingButton').onclick = clickOnEncodingButton;

    // Gestion clic bouton décodage
    document.querySelector('#decodingButton').onclick = clickOnDecodingButton;

    // Gestion clic bouton attaque
    document.querySelector('#attackButton').onclick = clickOnAttack;
}

///////////////////////
// Gestion des menus //
///////////////////////

const goToAttackingMenu = function()
{
    actualMenu = "Attack";

    // Cache tout
    hideElement("#prezText");
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
    hideElement("#prezText");
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
    hideElement("#results");

    // Affichage des boutons du menu 
    displayElement("#prezText");
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
