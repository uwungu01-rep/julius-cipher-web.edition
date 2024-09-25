const alp = "abcdefghijklmnopqrstuvwxyz".split("");
const alpcap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
var cip = [];
var cipcap = [];
var shf = 7;
var chr;

sort(shf, alp, alpcap, cip, cipcap);
document.getElementById("TextToCaesar").checked = true;
document.getElementById("shift").textContent = shf;
chr = document.getElementById("inp").value;
document.getElementById("out").textContent = Encipher(alp, cip, alpcap, cipcap, chr);

document.getElementById("TextToCaesar").onclick = function() {
  chr = document.getElementById("inp").value;  
  sort(shf, alp, alpcap, cip, cipcap);
  document.getElementById("out").textContent = Encipher(alp, cip, alpcap, cipcap, chr);
}

document.getElementById("CaesarToText").onclick = function() {
  chr = document.getElementById("inp").value;
  sort(shf, alp, alpcap, cip, cipcap);
  document.getElementById("out").textContent = Decipher(alp, cip, alpcap, cipcap, chr);
}

document.getElementById("plus").onclick = function() {
  cip = [];
  cipcap = [];
  shf += 1;
  document.getElementById("shift").textContent = shf;
  sort(shf, alp, alpcap, cip, cipcap);

  if(shf === 25) {
    document.getElementById("plus").disabled = true;
  }
  else if(shf > 25 || shf < 1) {
    document.getElementById("plus").disabled = false;
    document.getElementById("minus").disabled = false;
  }

  if(document.getElementById("TextToCaesar").checked) {
    document.getElementById("out").textContent = Encipher(alp, cip, alpcap, cipcap, chr);
  }
  else if(document.getElementById("CaesarToText").checked) {
    document.getElementById("out").textContent = Decipher(alp, cip, alpcap, cipcap, chr);
  }
}

document.getElementById("minus").onclick = function() {
  cip = [];
  cipcap = [];
  shf -= 1;
  document.getElementById("shift").textContent = shf;
  sort(shf, alp, alpcap, cip, cipcap);

  if(shf === 1) {
    document.getElementById("minus").disabled = true;
  }
  else if(shf > 25 || shf < 1) {
    document.getElementById("plus").disabled = false;
    document.getElementById("minus").disabled = false;
  }

  if(document.getElementById("TextToCaesar").checked) {
    document.getElementById("out").textContent = Encipher(alp, cip, alpcap, cipcap, chr);
  }
  else if(document.getElementById("CaesarToText").checked) {
    document.getElementById("out").textContent = Decipher(alp, cip, alpcap, cipcap, chr);
  }
}


document.getElementById("inp").oninput = function() {
  chr = document.getElementById("inp").value;
  if(document.getElementById("TextToCaesar").checked) {
    sort(shf, alp, alpcap, cip, cipcap);
    document.getElementById("out").textContent = Encipher(alp, cip, alpcap, cipcap, chr);
  }
  else if(document.getElementById("CaesarToText").checked) {
    sort(shf, alp, alpcap, cip, cipcap);
    document.getElementById("out").textContent = Decipher(alp, cip, alpcap, cipcap, chr);
  }
}

function sort(shf, alp, alpcap, cip, cipcap) {
  for(var i = shf; i < alp.length + shf; i++) {
    if(i < alp.length) {
      cip.push(alp[i]);
      cipcap.push(alpcap[i]);
    }
    else {
      cip.push(alp[Math.abs(i - alp.length)]);
      cipcap.push(alpcap[Math.abs(i - alp.length)]);
    }
  }
}

function Encipher(alp, cip, alpcap, cipcap, chr) {
  var oupt = "";
  for(var k = 0; k < chr.length; k++) {
    if(alp.includes(chr[k])) {
      oupt += cip[alp.indexOf(chr[k])];
    }
    else if(alpcap.includes(chr[k])) {
      oupt += cipcap[alpcap.indexOf(chr[k])];
    }
    else {
      oupt += chr[k];
    }
  }
  return oupt;
}

function Decipher(alp, cip, alpcap, cipcap, chr) {
  var oupt = "";
  for(var k = 0; k < chr.length; k++) {
    if(cip.includes(chr[k])) {
      oupt += alp[cip.indexOf(chr[k])];
    }
    else if(cipcap.includes(chr[k])) {
      oupt += alpcap[cipcap.indexOf(chr[k])];
    }
    else {
      oupt += chr[k];
    }
  }
  return oupt;
}