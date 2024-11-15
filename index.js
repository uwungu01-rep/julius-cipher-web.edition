const [alphabet, upper_alphabet] = ["abcdefghijklmnopqrstuvwxyz".split(""), "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

var [shifted, upper_shifted, j_shift, j_user_input] = [[], [], 7];

const shift = document.getElementById("shift");
const user_input = document.getElementById("user_input");
const output = document.getElementById("out");
const copy_button = document.getElementById("copy");
const text_to_caesar = document.getElementById("TextToCaesar");
const caesar_to_text = document.getElementById("CaesarToText");

sort(algorithm(j_shift), alphabet, upper_alphabet, shifted, upper_shifted);
shift.textContent = j_shift;
j_user_input = user_input.value;
output.textContent = Encipher(alphabet, shifted, upper_alphabet, upper_shifted, j_user_input);

copy_button.addEventListener("click", function(){
    navigator.clipboard.writeText(output.innerHTML);
    copy_button.textContent = "Copied to clipboard!";
    setTimeout(function() {
        copy_button.textContent = "Copy Output";
    }, 1000);
});

text_to_caesar.addEventListener("click", function() {
    j_user_input = document.getElementById("user_input").value;
    sort(algorithm(j_shift), alphabet, upper_alphabet, shifted, upper_shifted);
    output.innerHTML = Encipher(alphabet, shifted, upper_alphabet, upper_shifted, j_user_input);
});

caesar_to_text.addEventListener("click", function() {
    j_user_input = document.getElementById("user_input").value;
    sort(algorithm(j_shift), alphabet, upper_alphabet, shifted, upper_shifted);
    output.innerHTML = Decipher(alphabet, shifted, upper_alphabet, upper_shifted, j_user_input);
});

document.getElementById("plus").addEventListener("click", function() {
    j_shift += 1;
    short()
});

document.getElementById("minus").addEventListener("click", function() {
    j_shift -= 1;
    short()
});

user_input.addEventListener("input", function() {
    j_user_input = user_input.value;
    short()
});

function sort(j_shift, alphabet, upper_alphabet, shifted, upper_shifted) {
    for(var i = j_shift; i < alphabet.length + j_shift; i++) {
        if(i < alphabet.length) {
            shifted.push(alphabet[i]);
            upper_shifted.push(upper_alphabet[i]);
        }
        else {
            shifted.push(alphabet[Math.abs(i - alphabet.length)]);
            upper_shifted.push(upper_alphabet[Math.abs(i - alphabet.length)]);
        }
    }
}

function Encipher(alphabet, shifted, upper_alphabet, upper_shifted, j_user_input) {
    var oupt = "";
    for(var k = 0; k < j_user_input.length; k++) {
        if(alphabet.includes(j_user_input[k])) {
            oupt += shifted[alphabet.indexOf(j_user_input[k])];
        }
        else if(upper_alphabet.includes(j_user_input[k])) {
            oupt += upper_shifted[upper_alphabet.indexOf(j_user_input[k])];
        }
        else {
            oupt += j_user_input[k];
        }
    }
    return oupt;
}

function Decipher(alphabet, shifted, upper_alphabet, upper_shifted, j_user_input) {
    var oupt = "";
    for(var k = 0; k < j_user_input.length; k++) {
        if(shifted.includes(j_user_input[k])) {
            oupt += alphabet[shifted.indexOf(j_user_input[k])];
        }
        else if(upper_shifted.includes(j_user_input[k])) {
            oupt += upper_alphabet[upper_shifted.indexOf(j_user_input[k])];
        }
        else {
            oupt += j_user_input[k];
        }
    }
    return oupt;
}

function short() {
    [shifted, upper_shifted] = [[], []]
    shift.textContent = j_shift;
    sort(algorithm(j_shift), alphabet, upper_alphabet, shifted, upper_shifted);

    if(text_to_caesar.checked) {
        output.textContent = Encipher(alphabet, shifted, upper_alphabet, upper_shifted, j_user_input);
    }
    else {
        output.textContent = Decipher(alphabet, shifted, upper_alphabet, upper_shifted, j_user_input);
    }
}

function algorithm(j_shift) {
    var temp = j_shift;
    if(temp >= 0) {
    	temp = temp % 26;
        return temp;
    }
    while(temp < 0) {
        temp = (26 + temp) % 26;
    }
    return temp;
}