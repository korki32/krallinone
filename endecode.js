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
        case "html-entities":
            encodedMessage = toHTMLEntities(message);
            break;
        case "utf8":
            encodedMessage = toUTF8(message);
            break;
        case "leet":
            encodedMessage = toLeetSpeak(message);
            break;
        case "emoji":
            encodedMessage = toEmojiSpeak(message);
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
        case "html-entities":
            decodedMessage = fromHTMLEntities(message);
            break;
        case "utf8":
            decodedMessage = fromUTF8(message);
            break;
        case "leet":
            decodedMessage = fromLeetSpeak(message);
            break;
        case "emoji":
            decodedMessage = fromEmojiSpeak(message);
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

function toHTMLEntities(str) {
    return str.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#'+i.charCodeAt(0)+';';
    });
}
function fromHTMLEntities(str) {
    var txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
}

function toUTF8(str) {
    return unescape(encodeURIComponent(str));
}
function fromUTF8(str) {
    return decodeURIComponent(escape(str));
}

function toLeetSpeak(str) {
    var leetMap = {
        'A': '4', 'B': '8', 'E': '3', 'G': '9', 'I': '1', 'O': '0', 'S': '5', 'T': '7'
    };
    return str.toUpperCase().split('').map(function (char) {
        return leetMap[char] || char;
    }).join('');
}

function fromLeetSpeak(str) {
    var leetMap = {
        '4': 'A', '8': 'B', '3': 'E', '9': 'G', '1': 'I', '0': 'O', '5': 'S', '7': 'T'
    };
    return str.split('').map(function (char) {
        return leetMap[char] || char;
    }).join('');
}

function toEmojiSpeak(str) {
    var emojiMap = {
        'A': '🍏', 'B': '🍌', 'C': '🌶️', 'D': '🍩', 'E': '🍆', 'F': '🍟', 'G': '🍇',
        'H': '🍯', 'I': '🍦', 'J': '🌵', 'K': '🍪', 'L': '🍋', 'M': '🍈', 'N': '🍉',
        'O': '🍊', 'P': '🍍', 'Q': '🍑', 'R': '🍒', 'S': '🍓', 'T': '🍅', 'U': '🥨',
        'V': '🧇', 'W': '🍭', 'X': '🍄', 'Y': '🧊', 'Z': '🍎',
        'Á': '🥑', 'É': '🥥', 'Í': '🥝', 'Ó': '🧀', 'Ö': '🍔', 'Ő': '🥧', 'Ú': '🍥',
        'Ü': '🍕', 'Ű': '🌭', '1':'🥜', '2':'🫛', '3':'🥐', '4':'🍖', '5':'🍗','6':'🥩',
        '7':'🥚', '8':'🥠', '9':'🍿'
    };
    return Array.from(str.toUpperCase()).map(function (char) {
        return emojiMap[char] || char;
    }).join('');
}

function fromEmojiSpeak(str) {
    var emojiMap = {
        '🍏': 'A', '🍌': 'B', '🌶️': 'C', '🍩': 'D', '🍆': 'E', '🍟': 'F', '🍇': 'G',
        '🍯': 'H', '🍦': 'I', '🌵': 'J', '🍪': 'K', '🍋': 'L', '🍈': 'M', '🍉': 'N',
        '🍊': 'O', '🍍': 'P', '🍑': 'Q', '🍒': 'R', '🍓': 'S', '🍅': 'T', '🥨': 'U',
        '🧇': 'V', '🍭': 'W', '🍄': 'X', '🧊': 'Y', '🍎': 'Z',
        '🥑': 'Á', '🥥': 'É', '🥝': 'Í', '🧀': 'Ó', '🍔': 'Ö', '🥧': 'Ő', '🍥': 'Ú',
        '🍕': 'Ü', '🌭': 'Ű', '🥜':'1', '🫛':'2', '🥐':'3', '🍖':'4', '🍗':'5', '🥩':'6',
        '🥚':'7', '🥠':'8', '🍿':'9'
    };
    const emojiMapReverse = Object.fromEntries(Object.entries(emojiMap).map(([key, value]) => [value, key]));
    return Array.from(str).map(function (char) {
        return emojiMap[char] || char;
    }).join('');
}
