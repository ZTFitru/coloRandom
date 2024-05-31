/*----------------------------------------VARIABLES-----------------------------------------*/
var hexCodeBuildArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F"];
var colorHexArray = ["EA9999", "FACB9C", "FFE59A", "B6D7A8", "A4C4CA"];
var randomHex = [];
var stringOutput = "";
var padLock = document.querySelector('img')
var boxLocks = [];
var savedPalettes = [];
var paletteDelete = [];
var unlockedImg = document.querySelector('.unlocked');
var lockedImg = document.querySelector('.locked');
var savedPalettesSection = document.querySelector('saved-palettes-area');
/*----------------------------------------BUTTONS-----------------------------------------*/
var newPaletteBtn = document.querySelector('.new-palette');
var savePaletteBtn = document.querySelector('.save-palette');
var toLockBox = document.querySelector('.box');
/*----------------------------------------EVENT LISTENERS-----------------------------------------*/
newPaletteBtn.addEventListener('click', newPalette);
savePaletteBtn.addEventListener('click', savePalette);
/*----------------------------------------FUNCTIONS-----------------------------------------*/

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function onLoad() {
    for (var j = 0; j < 5; j++) {
        boxLocks[j] = document.querySelector(`.color-box${j + 1}`);
        boxLocks[j].isLocked = false;
        boxLocks[j].addEventListener('click', lockBoxColor);
    }
}
onLoad();

function newPalette() {
    for (var j = 0; j < 5; j++) {
        {
            if (!boxLocks[j].isLocked) {
                for (var i = 0; i < 6; i++) {
                    randomHex.push(hexCodeBuildArray[getRandomIndex(hexCodeBuildArray)]);
                }
                for (var i = 0; i < 6; i++) {
                    stringOutput += randomHex[i];
                }
                randomHex = [];
                colorHexArray[j] = stringOutput;
                var boxHoldingColor = document.querySelector(`.color-box${j + 1}`);
                var boxText = document.querySelector(`.box${j + 1}-label`);
                boxHoldingColor.style['background-color'] = `#${stringOutput}`;
                boxText.innerText = `#${stringOutput}`;
                stringOutput = "";
            }
        }
    }
    return colorHexArray;
}

function savePalette() {
    savedPalettes.push(JSON.parse(JSON.stringify(colorHexArray)));
    displayPalettes();
}

function displayPalettes() {
    var savedPalettesSection = document.querySelector('.saved-palettes-area');
    savedPalettesSection.innerHTML = '';
    for (i = 0; i < savedPalettes.length; i++) {
        savedPalettesSection.innerHTML += `<article class = "miniboxes-wrap" id = "palette${i}"> </article>`;
        var miniboxPaletteSection = document.querySelector(`#palette${i}`);
        for (var j = 0; j < 5; j++) {
            miniboxPaletteSection.innerHTML +=
                `<section class="minibox-wrap">
                <div class="mini-color-box-${i}-${j} minibox icon">
                </div>
                </section>`;
            var tempMiniColorBox = document.querySelector(`.mini-color-box-${i}-${j}`);
            tempMiniColorBox.style['background-color'] = `#${savedPalettes[i][j]}`;
        }
        miniboxPaletteSection.innerHTML += `<img src="assets/delete.png" class="mini-palette-delete" id = "delete-${i}">`;
    }
    for (i = 0; i < savedPalettes.length; i++) {
        paletteDelete[i] = document.querySelector(`#delete-${i}`);
        paletteDelete[i].paletteIndex = i;
        paletteDelete[i].addEventListener('click', paletteRemove);
    }
}

function paletteRemove() {
    var paletteInd = this.paletteIndex;
    savedPalettes.splice(paletteInd, 1);
    displayPalettes();
}

function lockBoxColor() {
    if (this.children[1].classList.contains('hidden')) {
        this.isLocked = true;
        this.children[1].classList.remove('hidden');
        this.children[0].classList.add('hidden');
    } else if (this.children[0].classList.contains('hidden')) {
        this.isLocked = false;
        this.children[1].classList.add('hidden');
        this.children[0].classList.remove('hidden');
    };
};
