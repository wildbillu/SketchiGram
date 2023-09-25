// TC-GRBMS-Basic.js

var g_GRB_Focus_sId = '';
function GRB_MakeId       (iRow, iLetter){var s = 'GRBMSID_' + iRow + '_' + iLetter;return s;}
function GRB_LetterFromId (sid){return parseInt(sid.charAt(10));}
function GRB_RowFromId    (sid){return parseInt(sid.charAt(8));}
function GRB_MakeHTMLId   (iRow, iLetter){let s = 'Id="' + GRB_MakeId(iRow, iLetter) + '" ';return s;}
