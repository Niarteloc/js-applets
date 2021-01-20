var cryptoTools = {};

cryptoTools.applyTransposition = function(message, transposition, padding) {
    var blockSize = transposition.length;
    var messageBlocks = message.match(new RegExp('.{1,' + blockSize + '}', 'g'));
    var numBlocks = messageBlocks.length;
    
    if (padding) {
        messageBlocks[numBlocks-1] += padding;
    }
    else {
        var padLength = blockSize - messageBlocks[numBlocks-1].length;
        for (var i = 0; i < padLength; i++) {
            messageBlocks[numBlocks-1] += message.charAt(Math.floor(Math.random() * message.length));
        }
    }
    
    var transposedBlocks = new Array(numBlocks);
    
    for (var i = 0; i < numBlocks; i++) {
        transposedBlocks[i] = "";
        for (var j = 0; j < blockSize; j++) {
            transposedBlocks[i] += messageBlocks[i][transposition[j]];
        }
    }
    transposedMessage = transposedBlocks.join(" ");
    
    return transposedMessage;
}

cryptoTools.keywordToTransposition = function(keyword) {
    var transposition = new Array(keyword.length);
    var orderedKeyword = keyword.split("").sort().join("");
    for (var i = 0; i < keyword.length; i++) {
        var transpositionIndex = orderedKeyword.indexOf(keyword[i]);
        while (transposition.indexOf(transpositionIndex) > -1) transpositionIndex++;
        transposition[i] = transpositionIndex;
    }
    return transposition;
}

cryptoTools.inversePermutation = function(permutation) {
    var permutationInverse = new Array(permutation.length);
    for (var i = 0; i < permutation.length; i++) {
        permutationInverse[i] = permutation.indexOf(i);
    }
    return permutationInverse;
}