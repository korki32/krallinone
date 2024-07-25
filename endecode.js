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
    var shift = parseInt(document.getElementById("shift").value) || 0;
    var encodedMessage;

    if (cipher === "caesar") {
        encodedMessage = caesarCipher(message, shift);
    } else if (cipher === "rot13") {
        encodedMessage = rot13(message);
    } else if (cipher === "atbash") {
        encodedMessage = atbashCipher(message);
    }

    document.getElementById("result").innerText = encodedMessage;
}

function decodeMessage() {
    var message = document.getElementById("message").value;
    var decodedMessage = detectAndDecode(message);
    document.getElementById("result").innerText = decodedMessage;
}

function detectAndDecode(message) {
    var decodedROT13 = rot13(message);
    if (isValidMessage(decodedROT13)) {
        return decodedROT13;
    }

    var decodedAtbash = atbashCipher(message);
    if (isValidMessage(decodedAtbash)) {
        return decodedAtbash;
    }

    for (var shift = 1; shift < 26; shift++) {
        var decodedCaesar = caesarCipher(message, 26 - shift);
        if (isValidMessage(decodedCaesar)) {
            return decodedCaesar;
        }
    }

    return "Ismeretlen kódolás vagy hibás üzenet.";
}

function isValidMessage(message) {
    var words = message.split(" ");
    for (var i = 0; i < words.length; i++) {
        if (words[i].length > 1) {
            return true;
        }
    }
    return false;
}

function caesarCipher(str, shift) {
    return str.replace(/[a-z]/gi, function (char) {
        var start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(start + (char.charCodeAt(0) - start + shift) % 26);
    });
}

function rot13(str) {
    return str.replace(/[a-z]/gi, function (char) {
        return String.fromCharCode(
            char.charCodeAt(0) + (char.toLowerCase() <= 'm' ? 13 : -13)
        );
    });
}

function atbashCipher(str) {
    return str.replace(/[a-z]/gi, function (char) {
        var start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(start + 25 - (char.charCodeAt(0) - start));
    });
}
