var sha512_256 = require('js-sha512').sha512_256,
  md5 = require('md5');

function _level1 (urlName, tipo) {
  return sha512_256( md5(urlName) + tipo + tipo + urlName + '1Prefiero intentarlo y al final fracasar que fracasar antes por miedo a intentarlo');
}

function _level2 (urlName, tipo) {
  return sha512_256( urlName + md5(tipo) + tipo +md5( urlName) + '2Prefiero intentarlo y al final fracasar que fracasar antes por miedo a intentarlo').substring(0,30);;
}

function _level3 (urlName, tipo) {
  return sha512_256( urlName + md5(tipo) + tipo + md5( urlName) + tipo + md5( urlName) + '3Prefiero intentarlo y al final fracasar que fracasar antes por miedo a intentarlo')
}

function _level4 (urlName, tipo) {
  return sha512_256( md5(tipo) + tipo + '*Prefiero intentarlo y al final fracasar que fracasar antes por miedo a intentarlo');
}

function _level5 (urlName, tipo) {
  return sha512_256( md5(tipo) + sha512_256(tipo + 'O') + 'final fracasar que fracasar antes por miedo a intentarlo');
}

function _level6 (urlName, tipo) {
  return sha512_256( md5(tipo) + sha512_256( md5(sha512_256(tipo) ) + '*Prefiero intentarlo y al final fracasar que fracasar antes por miedo a intentarlo') );
}

function _level7 (urlName, tipo) {
  return sha512_256('intentarlo');
}
function _level8 (urlName, tipo) {
  return sha512_256( sha512_256(md5(tipo) + 9889779897987987) + tipo + 'antes por miedo a intentarlo');
}

function _level9 (urlName, tipo) {
  return sha512_256( md5(tipo) + tipo + '*Prefiero intentarlo y al final fracasar que fracasar antes por miedo a intentarlo');
}

function _level10 (urlName, tipo) {
  return sha512_256( sha512_256(md5(54564564654546464654)) + sha512_256(tipo + 'Hol esto es encyp') + '*Prefiero intentarlo y al final fracasar que fracasar antes por miedo a intentarlo').substring(0,62);
}

function _level11 (urlName, tipo) {
  return sha512_256( sha512_256(md5(545645646)) + sha512_256(tipo + 'Hol eyp') + '*Prefro intentarlo y al final fracasar que fracasar antes por miedo a intentarlo');
}

function _level12 (urlName, tipo) {
  return sha512_256( sha512_256(md5(46454)) + sha512_256(tipo + 'Hol esto es encyp') + '*Prefiero intentarlo y al final fracasar que fracasar antes por miedo a intentarlo');
}

function _level13 (urlName, tipo) {
  return sha512_256( sha512_256(md5(545645646)) + sha512_256(tipo + 'Hol eyp') + '*Prefro intentarlo y al final fracasar que fracasar antes por miedo a intentarlo');
}

function _level14 (urlName, tipo) {
  return sha512_256( sha512_256(md5(4)) + md5(4878797) +  sha512_256('Hol es') + '*Prefiero intentarlo y al final fracasar que fracasar antes por miedo a intentarlo');
}
function _level15 (urlName, tipo) {
  return sha512_256( sha512_256(md5(46)) + 'algo' +  sha512_256('Hol 5456464654eyp') + '*Prefro intentarlo y al final fracasar que fracasar antes por miedo a intentarlo');
}

function _level16 (urlName, tipo) {
  return sha512_256( sha512_256(md5(46454)) + sha512_256(tipo + 'Holp') + '*Prefiero intentarlo y al final fracasar que fracasar antes por miedo a intentarlo');
}

function _compileUgly (urlName, tipo) {
  return urlName + tipo + _level1(urlName, tipo) + _level2(urlName, tipo) + _level3(urlName, tipo) + _level4(urlName, tipo) + _level5(urlName, tipo) + _level6(urlName, tipo) + _level7(urlName, tipo) + _level8(urlName, tipo) + _level9(urlName, tipo) + _level10(urlName, tipo) + _level11(urlName, tipo)+ _level12(urlName, tipo)+ _level13(urlName, tipo)+ _level14(urlName, tipo)+ _level15(urlName, tipo)+ _level16(urlName, tipo) + sha512_256(tipo + tipo + 'hola' + tipo +4654564564654646546545465465487465656565656565656565656565656565656565656565656565656565656565656541657746);
}

/*console.log(_compileUgly('cocotipo', 'psd'))
console.log(_compileUgly('cocotipo', 'psd').length)*/
module.exports = _compileUgly