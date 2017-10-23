basClr.spellcheck = false;
uniClr.spellcheck = false;

let hexReg = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
let baseBgColor = "#6686FF";

basClr.addEventListener("keypress", (e) => {
    if (e.keyCode != 13) return;

    let toConvert = e.target.value;
    if (toConvert.match(hexReg)) { //hex
        toConvert = hexToRgb(toConvert);
        console.log(toConvert);
    } else { //rgb
        toConvert = toConvert.match(/\d{1,3}/g);
    }

    let strClr = `rgb(${ toConvert[0]},${ toConvert[1]},${ toConvert[2]})`;
    
    uniClr.value = rgbToUnityRgb(toConvert);
    uniClr.focus();
    uniClr.select();

    document.body.style.backgroundColor = strClr;
})

basClr.addEventListener("blur", handleBlur);
uniClr.addEventListener("blur", handleBlur);

function handleBlur() {
    document.body.style.backgroundColor = baseBgColor;
}

function rgbToUnityRgb(rgb) {
    let arr = [];

    rgb.forEach(function(el) {
        arr.push(`(float)${el}/256`);
    }, this);


    return "new Color(" + arr.join(",") + ")";
}

function hexToRgb(hex) {
    var result = hexReg.exec(hex);
    return result ? [
        parseInt(result[1], 16), 
        parseInt(result[2], 16), 
        parseInt(result[3], 16)] 
    : null;
}