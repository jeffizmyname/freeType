let 
charCounter = 0;
rowCounter = 0;
charHistory = [[], [], []];
desiredLength = 45;
typeBox = document.getElementById('text');
cursor = document.getElementById('cursor');
debugBox = document.getElementById('debug');
let typingTimeout;
let firstKeyPress = true;

function handleEnterKey() {
    typeBox.innerHTML += "<br>";
    if (rowCounter < 2) {
        rowCounter++;
    } else {
        shiftTextRow();
        rowCounter = 2;
    }
    cursor.style.left = `${charHistory[rowCounter].length}ch`;
    cursor.style.top = `${rowCounter}em`;
    charCounter = 0;
}

function handleBackSpace() {
    if (charHistory[rowCounter].length === 0 && rowCounter > 0) {
        rowCounter--;
        charCounter = charHistory[rowCounter].length;
        cursor.style.top = `${rowCounter}em`;
    } else {
        typeBox.innerHTML = typeBox.innerHTML.slice(0, -1);
        charCounter--;
        if (charCounter < 0) charCounter = 0;
        charHistory[rowCounter].pop();
        cursor.style.left = `${charCounter}ch`;
    }
}

function handleKeyPress(e) {
    if (charCounter >= desiredLength) {
        moveWordToNextRow();
    }
    typeBox.innerHTML += e.key;
    charHistory[rowCounter].push(e.key);
    charCounter++;
    cursor.style.left = `${charCounter}ch`;
}

function moveWordToNextRow() {
    let words = typeBox.innerHTML.split(' ');
    let lastWord = words.pop();
    typeBox.innerHTML = words.join(' ') + "<br>" + lastWord;
    rowCounter++;
    if (rowCounter > 2) {
        shiftTextRow();
        rowCounter = 2;
    }
    charCounter = lastWord.length;
    charHistory[rowCounter] = lastWord.split('');
    cursor.style.top = `${rowCounter}em`;
}

function shiftTextRow() {
    let lines = typeBox.innerHTML.split('<br>');
    lines.shift();
    typeBox.innerHTML = lines.join('<br>');
    charHistory.shift();
    charHistory.push([]);
}

function handleTypingStop() {
    console.log("User stopped typing");
    cursor.style.animation = "blink 1s infinite";
}

document.addEventListener('keydown', (e) => {
    if (firstKeyPress) {
        firstKeyPress = false;
        typeBox.classList.add('first-key-pressed');
    }

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(handleTypingStop, 500);
    cursor.style.animation = "none";

    if (e.key === "Backspace") handleBackSpace();
    else if (e.key === "Enter") handleEnterKey();
    else if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1) handleKeyPress(e);
    
    debugBox.innerHTML = `charCounter: ${charCounter} | rowCounter: ${rowCounter} | charHistory: ${charHistory}`;

    console.log(charHistory);
})

function debug() {
    if (debugBox.style.display === "none") {
        debugBox.style.display = "block";
    } else {
        debugBox.style.display = "none";
    }
}




