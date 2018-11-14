let text = "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker. Pourquoi l'utiliser? On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction. Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement (histoire d'y rajouter de petits clins d'oeil, voire des phrases embarassantes).";

const generateRandomKey = function (keyLength)
{
    let key = "";
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i=0; i<keyLength; i++)
    {
        key += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return key;
}

let textToEncode = messageTransformation(noAccent(text));

const testKeyLength = function(keyLength, numberOfTest)
{
    for (let i=0; i<numberOfTest; i++)
    {
        let key = generateRandomKey(keyLength);
        let encodedText = encoding(textToEncode, key);
        console.log(key, findKeyLength(encodedText));
    }
}