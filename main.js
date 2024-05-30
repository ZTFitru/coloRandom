/*----------------------------------------VARIABLES-----------------------------------------*/
var hexCodeBuildArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F"];
var colorHexArray = [];
var randomHex = [];
var stringOutput = "";
var padLock = document.querySelector('img')

var unlockedImg = document.querySelector('.unlocked')
var lockedImg = document.querySelector('.locked')
/*----------------------------------------BUTTONS-----------------------------------------*/
var newPaletteBtn = document.querySelector('.new-palette')
var savePaletteBtn = document.querySelector('.save-palette')
var toLockBox = document.querySelector('.box')
/*----------------------------------------EVENT LISTENERS-----------------------------------------*/
newPaletteBtn.addEventListener('click', newPalette);
savePaletteBtn.addEventListener('click', savePalette);
toLockBox.addEventListener('click', lockBoxColor);
/*----------------------------------------FUNCTIONS-----------------------------------------*/

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function newPalette() {
    colorHexArray = [];
    // Loops five times, to get five colors for the boxes.
    for (var j = 0; j < 5; j++) {
        {
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

// unlock icon visiable when the page loads. 
// locked icon visiable when user clicks on the icons.
// event listener for the icons

function lockBoxColor () {
    console.log('before')
    if (lockedImg.classList.contains('hidden')) {
        // console.log(event)
        lockedImg.classList.remove('hidden');
        unlockedImg.classList.add('hidden');
        console.log('after first if')
    } else if (unlockedImg.classList.contains('hidden')) {
        lockedImg.classList.add('hidden');
        unlockedImg.classList.remove('hidden');
        console.log('after second if')
    };

};


