const messageTransformation = ( msg ) => msg.replace(/[^a-zA-Z]/g,'').toUpperCase();

const encoding = function(message,key)
{
    // TODO
    let repeatedKey = [], j=-1;
    for(let i=0; i<message.length; i++)
    {
        j++;
        if(j >= key.length)
            j=0;
        repeatedKey[i] = key[j];
    }

    console.log("message=\t"+message.split(''));
    console.log("key=\t\t"+key.split(''));
    console.log("repeatedKey=\t"+repeatedKey);

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
    // TODO
    return "decoding("+message+","+key+")";
}