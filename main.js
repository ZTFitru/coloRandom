/*----------------------------------------VARIABLES-----------------------------------------*/
var hexCodeBuildArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F"];
var colorHexArray = [];
var randomHex = [];
var stringOutput = "";
var padLock = document.querySelector('img')
var boxLocks = [];

var unlockedImg = document.querySelector('.unlocked')
var lockedImg = document.querySelector('.locked')
/*----------------------------------------BUTTONS-----------------------------------------*/
var newPaletteBtn = document.querySelector('.new-palette')
var savePaletteBtn = document.querySelector('.save-palette')
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
        console.log(boxLocks[j].children);
        boxLocks[j].isLocked = false;

        boxLocks[j].addEventListener('click', lockBoxColor);
    }
}
onLoad();

function newPalette() {
    colorHexArray = [];
    // Loops five times, to get five colors for the boxes.
    for (var j = 0; j < 5; j++) {
        {
            if (!boxLocks[j].isLocked) {

                // This for loop gets a set of six random characters from hexCodeBuildArray, to use to build a hex code.
                for (var i = 0; i < 6; i++) {
                    randomHex.push(hexCodeBuildArray[getRandomIndex(hexCodeBuildArray)]);
                }

                // This for loop takes those separate characters and converts them into a single string, which is easier to work with using interpolation.
                for (var i = 0; i < 6; i++) {
                    stringOutput += randomHex[i];
                }
                // Set randomHex to be empty, since we already have the string version saved, and need the array clear.
                randomHex = [];

                // Push the string output to colorHexArray, where the GROUP of hex codes will be stored, as our palette.
                colorHexArray.push(stringOutput);

                // Choose the appropriate box to get the text/color of, using interpolation to directly get the right box. j+1 = our box number, so use that.

                var boxHoldingColor = document.querySelector(`.color-box${j + 1}`);
                var boxText = document.querySelector(`.box${j + 1}-label`);

                // Use interpolation so that we can add a # directly before the stringOutput's text, letting us keep that part out when storing/making use of our string.           

                boxHoldingColor.style['background-color'] = `#${stringOutput}`;
                boxText.innerText = `#${stringOutput}`;

                // We're done with this color box; Now, set stringOutput to be empty, as we will need to fill it with new characters for the next color box.
                stringOutput = "";

            }
        }

    }
    // Print this out to make sure we're only saving the five hex colors, and wiping them when new palette is clicked.
    // Otherwise, we can't distinguish current palette from older palettes, and we store even palettes we don't want to save.
    console.log(colorHexArray);

    // ColorHexArray contains the current palette; use this to save Palette, or otherwise set to null at the beginning of function so a new palette can take its spot.
    return colorHexArray;
}


// Simple test function, make sure it's working.
function savePalette() {
    console.log("saved palette selected");
}


function lockBoxColor() {
    console.log('before')
    if (this.children[1].classList.contains('hidden')) {
        console.log('trying to lock')

        this.isLocked = true;
        this.children[1].classList.remove('hidden');
        this.children[0].classList.add('hidden');
        console.log("this is locked: " + this.isLocked);


    } else if (this.children[0].classList.contains('hidden')) {
        console.log('trying to unlock')

        this.isLocked = false;
        this.children[1].classList.add('hidden');
        this.children[0].classList.remove('hidden');
        console.log("this is locked: " + this.isLocked);

    };

};


// id's for the lock icons