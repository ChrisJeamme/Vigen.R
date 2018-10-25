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

    console.log('encodedMessage=\t'+encodedMessage);

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

    console.log('decodedMessage=\t'+decodedMessage);

    return decodedMessage.join('');
}