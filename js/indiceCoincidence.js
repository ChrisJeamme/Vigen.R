function GetIndiceCoincidence(message) 

{
    message = message.replace(/[^A-Z]/g, ""); 
    var probaLettres = new Array(26);
    var nbChar=0;
	var ic=0;
	
    for(i=0; i<26; i++) probaLettres[i] = 0;
    for(i=0; i<message.length; i++){
        probaLettres[message.charCodeAt(i) - 65]++;
        nbChar++;
    }
    var sommeProba = 0;
    for(i=0; i<26; i++) sommeProba = sommeProba + probaLettres[i]*(probaLettres[i]-1);
    ic = sommeProba / (nbChar*(nbChar-1));
    
  	return ic;
	//console.log("Indice correlation = " + ic);
	//console.log("Nombre de caracteres = " + nbChar);	
}

function getIndicesCoincidences(taillesCle, texte) 
{
  var nbTailles = taillesCle.length;
  var ICs = new Array(nbTailles);
  var subChaines;
  var texteLength = texte.length;
  var i, j, sommesICs;
  
  // Calcul IC pour chaque taille de clé potentielle
  for(i = 0; i < nbTailles ; i++)
  {
  	subChaines = new Array(taillesCle[i]);
    sommesICs = 0;
    
    // Initialisation subchaines
  	for(j = 0 ; j < taillesCle[i] ; j++) 
    {
      subChaines[j] = '';
    }
    
    //Split en subchaines avec le meme decalage
    for(j = 0 ; j < texteLength; j++)
    {
      subChaines[j%taillesCle[i]] += texte[j];
    }
    
    for(j = 0 ; j < taillesCle[i] ; j++) 
    {
      sommesICs += GetIndiceCoincidence(subChaines[j]);
      //console.log("Sub-chaine " + i + " : " + subChaines[j]);
    }
    
  	ICs[i] = sommesICs / taillesCle[i];
    console.log(ICs[i]);
  }
  
  return ICs;
}

function getLongueurCleIC(texte)
{
	var seuil = 0.065;
	var longueurTrouvee = false;
	var i = 1;
	var ics;
	
	while(!longueurTrouvee)
	{
		ics = getIndicesCoincidences([i], texte);
		if(ics[0] >= seuil)
		{
			longueurTrouvee = true;
			return [i, ics[0]];
		}
		else
			i++;
	}	
}

// test avec texte victor hugo https://www.etudes-litteraires.com/forum/topic23904-les-plus-beaux-textes-de-la-litterature-francaise.html
console.log(getIndicesCoincidences([1,8,4,12,15], "BPWLMXWFIWINXNWFXVWIHWWCXWMBLXWKKEKLXTSKEIKHKXFXFIHTKPWSIEKWTYLKXGZHLIINXHWLMIFXUVWLHYDHGHGKMUMXOIMMHRINXNWKXGGFFIFVXNWGXHWFTRVXWIKHKQSBLEDTVVWTMMGGBQEXGWWJNYFIXYVXLMDXGGWXMHWITMPIHYJJNSAFTTHXEIROHYKXGGGKXNSBYEAMFELTVLWXMQGGWINHBVINBXJTOEAEEEAMTZSGMPSNKSJXIIMMLIFTEPWKTZSGMPWLHMJTOMFZMEFLWIMBEILLHPAMNHWFXWQXNBTTBWKXLZWKLPWZTDGGIIJWBVWGMPSWHYUXAETBMYVXWINHBVETFIJXTPSFTMKHGIDEXRGNLUMBMXSIHYJETXGFUIWMOSMLLENXSFAXGUMTNNGNKHZNBNWVAIJVAIWGVILMXRMBMUMBMSEUXYFTNXJXTRYXJYALXWLXGJMBOSMLLENXSUMXCIVXLIKIXVWJNIETYSJVXIFOTMFLXHWYXRVXMUMXCIKHNJXKXGGFFIHXKIEHBUMBLSMYYVALMEFMVSEFXIFYTRLFHRGXNZJXGIKMIEKMXVEBGIWWBXWLOSMLVSEFXEVTFFSGGMBXKIYTKHWFTHWLMMFXXILCXZGBLFAXGUMXCEAYBRAEAYEUEIWGYEFMJYWWBIMFTVSOBIJBXRINXRETBQSGMWSOTMLFTMVXKGWMTMLEXFGGAIMKWIETOMWWXZGBKWWLRIMQFIJXZEJWXVKBVIVBXYFTIEKOHYDNVPGKXPGXNZJXJYAEFIXBMGGFFIFVXVKBEZWNMUMXCILKTZSBEPWXGGGKXMDGTZSBMUMTFIDTEEALLIJBERSOTMLJNEEXEEALLIJOBZJXTZWVFEXBEPWTFIKVHXWLWEFLVILMXIPMTWWHNNWFXRAOKIVXFCKMXVAXNWWLVPSKMIKVXWUETVLXLNGNKHMGXEMMKIKIAIJXHHAXNNSEHYPMNRGNLPWLOIFWLTGNKUMHBQSLMYHKBWDTEYEBXVWJNIBTOEALIEJFBPWLOMNTGXKTLXMWHRUIXRKXYELTEQSBMVWJNEXHKGWWXXWVHRLXFTDXKNWGXZGRTMKIEYKVXHGNQILKXILJNMDIHYNTBXTBXRKXGEDEXVLXLXMWBXINXPZHFQWOTMFXHQTKXLWETWHXKHKHGLMFTRAMXELKHTNHBVUXMXWLIPWGWIMKLSEUKIINHRSIIIDEXPSOXVAMXUMHGTWNMPWYKEHIXVKTGWINBPKHNJXKXUMXLSFVHIMKXWLFHVLWTRKEXRFNBILJNEXHKGWWXZGBKPWZHYXYKIAEGEHENWINNRSUBQWXGPMBJYAEOEKMHMINXSMMNPWGOSAXLILJNIVXLSJFTMKXGHMKVMFTREFMIPMLBGAUTWVXCSAXLMDGTTDNLHWWHYDXNVKTNWKBTWLNIIFLXUMNGISFXXWGWVWLHYNKXELHBTGNKWWFBIMQYIJFXVWMJYWVXYPJNMNXNPWGMGGFIVWGWVWYBRALLIFMIEJGXTDNLEAFXVGWBIMOKEAFXRLTLXMINGJHBVWJNIBXIVWYXVSBLWGNLPWLVMWNQPWYYVSRTRLKTCGGWILTZPGBKISNQHGNVIKENIMKLHWLXWQXNBKBCENTBWKNMIKEHMKFHVGLXWWMJYSNFIEXXWHKBXWGVLSGMILNGIVHGRWLISAGMGWLWIMQVLGLXWDXUSFAXYJXMPSOXVAMXTDNMSLJNIVXEINXKXWLOSAEXWWMWIUAXVUAXVUHXYJMKMKMXILINVSMXZGBKEMYHRVWXWWMHMDXLSVBXYKHFFJXWYFFHRVXHFKVNVBXNWKXTMEXFMWNQPGBGHWMTJSVXWMBOVWAXYJXNBMGXXJHBXUAXQAGXXFXMVWJNYFAHQEXJYAITWKXMIFTGXKHGIFYTRLITVDTFEAG"));
// expected output: environ 0.077
