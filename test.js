const reverseString = (str) => {
    let spltStr = str.split("");
    let reverseStr = spltStr.reverse();
    let joinStr = reverseStr.join("");
    return joinStr == str;
}

const result = reverseString('lel');

const factorialize = (num) => {
    if(num === 0 || num === 1)
    return 1;
    return num * factorialize(num - 1)
}

const result1 = factorialize(6);