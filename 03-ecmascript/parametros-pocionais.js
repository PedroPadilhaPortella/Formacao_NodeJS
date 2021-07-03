function sum(a = 0, b = 0) {
    return a + b
}

function sub(a, b, inverter = false) {
    if(inverter)
        return b - a
    return a - b
}

console.log(sum(10, 10));
console.log(sum(10));
console.log(sum());

console.log(sub(10, 8));
console.log(sub(10, 20, true));

