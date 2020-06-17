#!/usr/bin/env node
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [ h, s, l ];
}

function hslToRgb(h, s, l) {
  let r, g, b;
  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [ r * 255, g * 255, b * 255 ];
}

const getDistance = (rhsl,hsl) => {
  return Math.sqrt((rhsl[0]-hsl[0])**2+(rhsl[0]-hsl[0])**2+(rhsl[0]-hsl[0])**2)/Math.sqrt(3)
}

const randoColor = (ref) => {
  const rr = parseInt(ref.substring(1,2),16)
  const rg = parseInt(ref.substring(3,4),16)
  const rb = parseInt(ref.substring(5,6),16)
  let r = Math.random() * 256
  let g = Math.random() * 256
  let b = Math.random() * 256
  const rhsl = rgbToHsl(rr,rg,rb)
  let hsl = rgbToHsl(r,g,b)
  let distance = getDistance(rhsl,hsl)
  if (distance < 0.5) {
    hsl[0] = Math.min(rhsl[0]+0.5,1+rhsl[0]-0.5)
    hsl[2] = Math.min(rhsl[2]+0.5,1+rhsl[2]-0.5)
    // console.log("changed colour")
  }
  rgb = hslToRgb(hsl[0],hsl[1],hsl[2])
  r = Math.round(rgb[0]).toString(16).padStart(2,'0')
  g = Math.round(rgb[1]).toString(16).padStart(2,'0')
  b = Math.round(rgb[2]).toString(16).padStart(2,'0')
  const colorString = `#${r}${g}${b}`
  // console.log(` ${distance} ${colorString}`)
  return colorString
}


let myButton = document.querySelector("#brr");

myButton.addEventListener("click", function(event) {
  const lastColor = document.body.bgColor
  const newColor = randoColor(lastColor)
  document.querySelector("#haha").style.color = lastColor
  document.querySelector("button").style.backgroundColor = lastColor
  document.querySelector("button").style.color = newColor
  document.body.bgColor = newColor
});
