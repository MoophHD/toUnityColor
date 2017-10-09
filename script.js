let hexReg = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

basClr.addEventListener("keypress", (e) => {
    if (e.keyCode != 13) return;

    let toConvert = e.target.value;
    if (toConvert.match(hexReg)) { //hex
        toConvert = hexToRgb(toConvert);
        // console.log(toConvert);
    } else { //rgb
        toConvert = toConvert.match(/\d{1,3}/g);
    }

    let strClr = `rgb(${ toConvert[0]},${ toConvert[1]},${ toConvert[2]})`;
    console.log(strClr);
    document.body.style.backgroundColor = strClr;
    
    uniClr.value = rgbToUnityRgb(toConvert);
    uniClr.focus();
    uniClr.select();
})

function rgbToUnityRgb(rgb) {
    let arr = [];

    rgb.forEach(function(el) {
        arr.push(Math.round((el/256)*10000)/10000); 
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