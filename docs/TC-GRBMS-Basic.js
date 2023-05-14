// TC-GRBMS-Basic.js

function GRBMS_MakeId(iRow, iLetter){var s = 'GRBMSID_' + iRow + '_' + iLetter;return s;}
function GRBMS_LetterFromId(sid){return parseInt(sid.charAt(10));}
function GRBMS_RowFromId(sid){return parseInt(sid.charAt(8));}
function GRBMS_MakeHTMLId(iRow, iLetter){let s = 'Id="' + GRBMS_MakeId(iRow, iLetter) + '" ';return s;}

