
var encoding = function(message,key)
{
    // TODO
    var repeatedKey = [], j=-1;
    for(var i=0; i<message.length; i++)
    {
        j++;
        if(j >= key.length)
            j=0;
        repeatedKey[i] = key[j];
    }

    console.log("message=\t"+message.split(''));
    console.log("key=\t\t"+key.split(''));
    console.log("repeatedKey=\t"+repeatedKey);

    var result = [];

    message.split('').forEach(
    (messageChar,index)=>
    {
        console.log('M='+messageChar);
        console.log('K='+repeatedKey[index]);
        console.log('Resultat='+(String.fromCharCode(97+messageChar.charCodeAt(0)-repeatedKey[index].charCodeAt(0))))
        
    });

    return "encoding("+message+","+key+")";
}
var decoding = function(message,key)
{
    // TODO
    return "decoding("+message+","+key+")";
}