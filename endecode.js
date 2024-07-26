let currentMode = 'encode';

function toggleMode() {
    if (currentMode === 'encode') {
        currentMode = 'decode';
        document.getElementById('switch-btn').innerText = 'Switch to Encode';
        document.getElementById('encode-section').style.display = 'none';
        document.getElementById('decode-section').style.display = 'block';
    } else {
        currentMode = 'encode';
        document.getElementById('switch-btn').innerText = 'Switch to Decode';
        document.getElementById('encode-section').style.display = 'block';
        document.getElementById('decode-section').style.display = 'none';
    }
}

function processMessage() {
    if (currentMode === 'encode') {
        encodeMessage();
    } else {
        decodeMessage();
    }
}

function encodeMessage() {
    var message = document.getElementById("message").value;
    var cipher = document.getElementById("cipher").value;

    var encodedMessage;

    switch (cipher) {
        case "rot13":
            encodedMessage = rot13(message);
            break;
        case "atbash":
            encodedMessage = atbashCipher(message);
            break;
        case "binary":
            encodedMessage = toBinary(message);
            break;
        case "base64":
            encodedMessage = toBase64(message);
            break;
        case "hex":
            encodedMessage = toHex(message);
            break;
        case "url":
            encodedMessage = encodeURIComponent(message);
            break;
        case "caesar":
            encodedMessage = caesarCipher(message, 3);
            break;
        case "morse":
            encodedMessage = toMorse(message);
            break;
        case "kremoji":
            encodedMessage = toKREmoji(message);
            break;
    }

    document.getElementById("result").innerText = encodedMessage || "Please enter a message!";
}

function decodeMessage() {
    var message = document.getElementById("decode-message").value;
    var cipher = document.getElementById("decode-cipher").value;

    var decodedMessage;

    switch (cipher) {
        case "rot13":
            decodedMessage = rot13(message);
            break;
        case "atbash":
            decodedMessage = atbashCipher(message);
            break;
        case "binary":
            decodedMessage = fromBinary(message);
            break;
        case "base64":
            decodedMessage = fromBase64(message);
            break;
        case "hex":
            decodedMessage = fromHex(message);
            break;
        case "url":
            decodedMessage = decodeURIComponent(message);
            break;
        case "caesar":
            decodedMessage = caesarCipher(message, -3);
            break;
        case "morse":
            decodedMessage = fromMorse(message);
            break;
        case "kremoji":
            decodedMessage = fromKREmoji(message);
            break;
    }

    document.getElementById("result").innerText = decodedMessage || "Please enter a message!";
}

function rot13(str) {
    return str.replace(/[a-z]/gi, function (char) {
        return String.fromCharCode(
            char.charCodeAt(0) + (char.toLowerCase() <= 'm' ? 13 : -13)
        );
    });
}

function atbashCipher(str) {
    return str.replace(/[a-zA-Z]/g, function (char) {
        var start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(start + 25 - (char.charCodeAt(0) - start));
    });
}

function toBinary(str) {
    return str.split('').map(function (char) {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}

function fromBinary(str) {
    return str.split(' ').map(function (binary) {
        return String.fromCharCode(parseInt(binary, 2));
    }).join('');
}

function toBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

function fromBase64(str) {
    return decodeURIComponent(escape(atob(str)));
}

function toHex(str) {
    return str.split('').map(function (char) {
        return char.charCodeAt(0).toString(16).padStart(2, '0');
    }).join(' ');
}

function fromHex(str) {
    return str.split(' ').map(function (hex) {
        return String.fromCharCode(parseInt(hex, 16));
    }).join('');
}

function caesarCipher(str, shift) {
    return str.replace(/[a-zA-Z]/g, function (char) {
        var start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(start + (char.charCodeAt(0) - start + shift + 26) % 26);
    });
}

const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.',
    'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.',
    'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-',
    'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----',
    '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
};

const reverseMorseCode = Object.fromEntries(
    Object.entries(morseCode).map(([char, code]) => [code, char])
);

function toMorse(str) {
    return str.toUpperCase().split('').map(function (char) {
        return morseCode[char] || char;
    }).join(' ');
}

function fromMorse(str) {
    return str.split(' ').map(function (code) {
        return reverseMorseCode[code] || code;
    }).join('');
}

const emojiMap = {
    'a': '🌳', 'b': '🌵', 'c': '🍀', 'd': '🌸', 'e': '🌼', 'f': '🌷', 'g': '🌹', 'h': '🍂',
    'i': '🌿', 'j': '🍄', 'k': '🍒', 'l': '🍅', 'm': '🍇', 'n': '🍌', 'o': '🍎', 'p': '🍑',
    'q': '🍓', 'r': '🍟', 's': '🍲', 't': '🍦', 'u': '🍫', 'v': '🍭', 'w': '🍯', 'x': '🍼',
    'y': '☕', 'z': '🍶', 'á': '🍻', 'é': '🍹', 'í': '🍾', 'ó': '🥃', 'ö': '🥄', 'ő': '🍕',
    'ú': '🍲', 'ü': '🍜', 'ű': '🍛', 'A': '🌳', 'B': '🌵', 'C': '🍀', 'D': '🌸', 'E': '🌼',
    'F': '🌷', 'G': '🌹', 'H': '🍂', 'I': '🌿', 'J': '🍄', 'K': '🍒', 'L': '🍅', 'M': '🍇',
    'N': '🍌', 'O': '🍎', 'P': '🍑', 'Q': '🍓', 'R': '🍟', 'S': '🍲', 'T': '🍦', 'U': '🍫',
    'V': '🍭', 'W': '🍯', 'X': '🍼', 'Y': '☕', 'Z': '🍶', 'Á': '🍻', 'É': '🍹', 'Í': '🍾',
    'Ó': '🥃', 'Ö': '🥄', 'Ő': '🍕', 'Ú': '🍲', 'Ü': '🍜', 'Ű': '🍛', '0': '🔵', '1': '🔢',
    '2': '🔠', '3': '🔡', '4': '🔣', '5': '🔢', '6': '🔠', '7': '🔡', '8': '🔢', '9': '🔣',
    ' ': '⬜'
};

// Reverse map for decoding
const reverseEmojiMap = Object.fromEntries(
    Object.entries(emojiMap).map(([char, emoji]) => [emoji, char])
);

function toKREmoji(str) {
    return str.split('').map(char => emojiMap[char] || char).join('');
}

function fromKREmoji(str) {
    let result = '';
    let temp = '';
    for (let i = 0; i < str.length; i++) {
        temp += str[i];
        // Check if temp matches an emoji in the reverse map
        if (reverseEmojiMap[temp]) {
            result += reverseEmojiMap[temp];
            temp = '';
        }
    }
    return result;
}
