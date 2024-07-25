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

    if (cipher === "rot13") {
        encodedMessage = rot13(message);
    } else if (cipher === "atbash") {
        encodedMessage = atbashCipher(message);
    } else if (cipher === "binary") {
        encodedMessage = toBinary(message);
    }

    document.getElementById("result").innerText = encodedMessage || "Kérlek, adj meg egy üzenetet!";
}

function decodeMessage() {
    var message = document.getElementById("decode-message").value;
    var cipher = document.getElementById("decode-cipher").value;

    var decodedMessage;

    if (cipher === "rot13") {
        decodedMessage = rot13(message);
    } else if (cipher === "atbash") {
        decodedMessage = atbashCipher(message);
    } else if (cipher === "binary") {
        decodedMessage = fromBinary(message);
    }

    document.getElementById("result").innerText = decodedMessage || "Kérlek, adj meg egy üzenetet!";
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
