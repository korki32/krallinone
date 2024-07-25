// Caesar-kódoló és dekódoló függvény
function caesarCipher(str, shift) {
    return str.replace(/[a-z]/gi, function (char) {
        var start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(start + (char.charCodeAt(0) - start + shift) % 26);
    });
}

// ROT13 kódoló és dekódoló függvény
function rot13(str) {
    return str.replace(/[a-z]/gi, function (char) {
        return String.fromCharCode(
            char.charCodeAt(0) + (char.toLowerCase() <= 'm' ? 13 : -13)
        );
    });
}

// Atbash kódoló és dekódoló függvény
function atbashCipher(str) {
    return str.replace(/[a-z]/gi, function (char) {
        var start = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(start + 25 - (char.charCodeAt(0) - start));
    });
}

// Üzenet kódolása
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

// Üzenet dekódolása
function decodeMessage() {
    var message = document.getElementById("message").value;
    var cipher = document.getElementById("cipher").value;
    var shift = parseInt(document.getElementById("shift").value) || 0;
    var decodedMessage;

    if (cipher === "caesar") {
        decodedMessage = caesarCipher(message, 26 - shift);
    } else if (cipher === "rot13") {
        decodedMessage = rot13(message);
    } else if (cipher === "atbash") {
        decodedMessage = atbashCipher(message);
    }

    document.getElementById("result").innerText = decodedMessage;
}
