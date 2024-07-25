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
    var decodedMessage = detectAndDecode(message);
    document.getElementById("result").innerText = decodedMessage;
}

// Kódolás típusának felismerése és dekódolás
function detectAndDecode(message) {
    // Próbáljuk meg ROT13-mal dekódolni
    var decodedROT13 = rot13(message);
    if (isValidMessage(decodedROT13)) {
        return decodedROT13;
    }

    // Próbáljuk meg Atbash-sel dekódolni
    var decodedAtbash = atbashCipher(message);
    if (isValidMessage(decodedAtbash)) {
        return decodedAtbash;
    }

    // Próbáljuk meg Caesar-kóddal dekódolni, különböző eltolásokkal
    for (var shift = 1; shift < 26; shift++) {
        var decodedCaesar = caesarCipher(message, 26 - shift);
        if (isValidMessage(decodedCaesar)) {
            return decodedCaesar;
        }
    }

    // Ha egyik sem volt sikeres
    return "Ismeretlen kódolás vagy hibás üzenet.";
}

// Egyszerű ellenőrzés arra, hogy a dekódolt üzenet érvényes-e
