const pickedIndex = Math.floor(Math.random() * emojis.length);
const pickedEmoji = emojis[pickedIndex].emoji;
const pickedWord = emojis[pickedIndex].word;
const pickedHint = emojis[pickedIndex].hint;

var tries = 0;

function startGame() {
    document.getElementById('gameEmoji').innerHTML = pickedEmoji;
    document.getElementById('gameEmoji2').innerHTML = pickedEmoji;
    document.getElementById('gameHint').innerHTML = pickedHint;
    document.getElementById('gameEndWord').innerHTML = pickedWord;

    var letterInitial = document.createElement("div");
    letterInitial.innerHTML = '<div class="column p-1" style="width: 40px"><div class="field"><div class="control"><input class="input is-large p-1" type="text" maxlength="1" id="inputWord0" value="' + pickedWord.charAt(0) + '" readonly></div></div>';
    document.getElementById('gameWords').appendChild(letterInitial);

    for (var x = 1; x < pickedWord.length - 1; x++) {
        var autofocus = "";
        if (x == 1) {
            autofocus = "autofocus";
        }

        var letter = document.createElement("div");
        letter.innerHTML = '<div class="column p-1" style="width: 40px"><div class="field"><div class="control"><input class="input is-large p-1" type="text" maxlength="1" id="inputWord' + x + '" oninput="nextWord(' + x + ')" ' + autofocus + '></div></div>';
        document.getElementById('gameWords').appendChild(letter);
    }

    const indexLastChar = pickedWord.length - 1;

    var letterFinal = document.createElement("div");
    letterFinal.innerHTML = '<div class="column p-1" style="width: 40px"><div class="field"><div class="control"><input class="input is-large p-1" type="text" maxlength="1" id="inputWord' + indexLastChar + '" value="' + pickedWord.charAt(indexLastChar) + '" readonly></div></div>';
    document.getElementById('gameWords').appendChild(letterFinal);
}

function nextWord(actualIndex) {
    document.getElementById('inputWord' + actualIndex).value = document.getElementById('inputWord' + actualIndex).value.toUpperCase();
    if ((actualIndex + 1) == (pickedWord.length - 1)) {
        guessWord();
    } else {
        document.getElementById('inputWord' + (actualIndex + 1)).focus();
    }
}

function guessWord() {
    var guessedWord = "";
    for (var x = 0; x < pickedWord.length; x++) {
        guessedWord += document.getElementById('inputWord' + x).value;
    }

    if (guessedWord.toUpperCase() == pickedWord) {
        document.getElementById('containerGame').classList.add("animate__animated", "animate__fadeOutLeft");
        setTimeout(function () {
            document.getElementById('containerGame').classList.add("is-hidden");
            document.getElementById('containerWinner').classList.remove("is-hidden");
            document.getElementById('containerWinner').classList.add("animate__animated", "animate__fadeInRight");

            startConfettiAnimation();
        }, 500);
    } else {
        for (var x = 1; x < pickedWord.length - 1; x++) {
            document.getElementById('inputWord' + x).value = "";
        }
        document.getElementById('inputWord1').focus();

        document.getElementById('overlayWrongWord').style.display = 'block';
        setTimeout(function () {
            document.getElementById('overlayWrongWord').style.display = 'none';
        }, 1000);
        tries++;

        if(tries > 2){
            document.getElementById('newWordBtn').classList.remove("is-hidden");
        }
    }
}

function startConfettiAnimation() {
    var duration = 20000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) { return clearInterval(interval); }

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}