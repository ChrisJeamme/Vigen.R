const messageTransformation = ( msg ) => msg.replace(/[^a-zA-Z]/g,'').toUpperCase();

// Génère une répétition de la clé égale à la longueur du message
const generateRepeatedKey = function(message,key)
{
    let repeatedKey = [], j=-1;
    for(let i=0; i<message.length; i++)
    {
        j++;
        if(j >= key.length)
            j=0;
        repeatedKey[i] = key[j];
    }
    return repeatedKey;
}

const encoding = function(message,key)
{
    let repeatedKey = generateRepeatedKey(message,key);
    let encodedMessage = [];

    message.split('').forEach(
    (messageChar,index)=>
    {
        encodedAsciiCharacter = parseInt(repeatedKey[index].charCodeAt(0)) + parseInt(alphabeticDistance('A',messageChar));

        if(encodedAsciiCharacter > 'Z'.charCodeAt(0))
            encodedAsciiCharacter -= 26;

        encodedCharacter = String.fromCharCode(encodedAsciiCharacter);
        encodedMessage.push(encodedCharacter); 
    });

    // console.log('encodedMessage=\t'+encodedMessage);

    return encodedMessage.join('');
}

// Donne la distance entre 2 lettres de l'alphabet
const alphabeticDistance = function(char1, char2)
{
    return Math.abs(char1.charCodeAt(0) - char2.charCodeAt(0));
}

const decoding = function(message,key)
{
    let repeatedKey = generateRepeatedKey(message,key);
    let decodedMessage = [];

    message.split('').forEach(
    (messageChar,index)=>
    {
        decodedAsciiCharacter = parseInt(messageChar.charCodeAt(0)) - parseInt(alphabeticDistance('A',repeatedKey[index]));

        if(decodedAsciiCharacter < 'A'.charCodeAt(0))
            decodedAsciiCharacter += 26;

        decodedCharacter = String.fromCharCode(decodedAsciiCharacter);
        decodedMessage.push(decodedCharacter); 
    });

    // console.log('decodedMessage=\t'+decodedMessage);

    return decodedMessage.join('');
}

//Find on http://www.finalclap.com
const noAccent = function(str)
{
    let accent = 
    [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    let noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];  
    for(let i = 0; i < accent.length; i++)
    {
        str = str.replace(accent[i], noaccent[i]);
    }
    return str;
}