// TC-Keyboard-Mini.js
// includes only allowed characters and presents them scrambled

function ScrambleTheseLetters(sLetters)
{
    var sScrambled ='';
    while ( sLetters.length > 0 )
    {
        let iP = TC_GetRandomInt(sLetters.length);
        var cLetter = sLetters.charAt(iP)
        sScrambled += cLetter;
        sLetters = removeAt(sLetters, iP);
    }
    return sScrambled;
}

function KB_Mini_Setup(iWidthMax)
{
    let sAllowedLettersScrambled = ScrambleTheseLetters(g_GRBMS_sAllowedGridLetters);
//
    let iAllowedLetters = sAllowedLettersScrambled.length;
    let elemTest = document.getElementById("Test")
    let sLetter = 'L'
    elemTest.innerHTML = KB_Mini_MakeKeyboardButton(sLetter);
    let sId = 'KB_' + sLetter;
    let elemLetter = document.getElementById(sId)
    let rectButton = elemLetter.getBoundingClientRect();
    let iEstimatedWidth = iAllowedLetters * (rectButton.width + 4); 
    let fRows = Math.ceil(iEstimatedWidth / iWidthMax);
    let iRows = parseInt(fRows);
    let fLettersPerRow = Math.ceil(iAllowedLetters / iRows);
    let iLettersPerRow = parseInt(fLettersPerRow.toFixed());
    elemTest.innerHTML = '';
    let sInner = '';
// we need to determine if we need more than one and row    
// we have div at top that tells how to use the mini keypad
    sInner += '<DIV Id="KB_Mini_Instructions_Div" class="KB_Mini_Instructions">'
    sInner += ' Select a grid Square (highlight pink) then select a new letter for it. The existing letter will move.';
    sInner += '</DIV>'
    sInner += '<TABLE Id="KB_Mini_ButtonRow_Div" class="KB_Mini_ButtonRow">';
    for (let iRow = 0; iRow < iRows; iRow ++ )
    {
        let iStart = iRow * iLettersPerRow;
        let iFinish = iStart + iLettersPerRow;
        let sThisRow = sAllowedLettersScrambled.substring(iStart, iFinish);
        if ( iRow == iRows - 1 )
        {
            let sCC = String.fromCharCode(8);
            sThisRow += sCC;
        }
        sInner += '<TR align=center><TD>';
        sInner += KB_Mini_MakeRowOfButtons(sThisRow);
        sInner += '</TD></TR>'
    }
    sInner += '</TABLE>';    
//    
    let elemKB_Mini_Div = document.getElementById('KB_Mini_Div');
    elemKB_Mini_Div.innerHTML = sInner;
    return iRows;
}



function KB_Mini_KeyboardPress_CAB(keypressed)
{
    if ( g_CAB_Focus_sId == "")
        return false;
    iRow = CAB_RowFromId(g_CAB_Focus_sId);
    iLetter = CAB_LetterFromId(g_CAB_Focus_sId);
    var sCC = String.fromCharCode(8);
    if ( keypressed == sCC )
        sToSet = ' ';
    CAB_onkeyup(keypressed, iRow, iLetter);
    return true;
}

function KB_Mini_KeyboardPress_GRB(keypressed)
{
    if ( g_GRBMS_Focus_sId == "")
        return false;
    iRow = GRBMS_RowFromId(g_GRBMS_Focus_sId);
    iLetter = GRBMS_LetterFromId(g_GRBMS_Focus_sId);
    var sCC = String.fromCharCode(8);
    if ( keypressed == sCC )
        sToSet = ' ';
    GRBMS_onkeyup(keypressed, iRow, iLetter);
    g_GRBMS_Focus_sId = '';
    return true;
}

function KB_Mini_KeyboardPress_SA(keypressed)
{
    if ( g_SA_Focus_sId == "")
        return false;
    TC_SA_Entry_AddChar(keypressed)
    return true;
}

function KB_Mini_KeyboardPress(sLetter)
{
    if ( KB_Mini_KeyboardPress_GRB(sLetter) )
        return;
    if ( KB_Mini_KeyboardPress_CAB(sLetter) )
        return;
    KB_Mini_KeyboardPress_SA(sLetter)        
}

function KB_Mini_MakeRowOfButtons(sLetters)
{
    var sButtonRow = '<TABLE><TR>';
    var iLetters = sLetters.length;
    for ( iLetter = 0; iLetter < iLetters; iLetter++ )
    {
        var cLetter = sLetters.charAt(iLetter);
        sButtonRow += '<TD>' + KB_Mini_MakeKeyboardButton(cLetter) + '</TD>';
    }
    sButtonRow += '</TR></TABLE>'
    return sButtonRow;
}

function KB_Mini_MakeKeyboardButton(sLetter)
{
    let sTextForButton = sLetter;
    var sClass = 'KB_Mini_Button KB_Mini_ButtonLetter';
    var sCC = String.fromCharCode(8);
    if ( sLetter == sCC )
    {
        sClass = 'KB_Mini_Button KB_Mini_ButtonBackspace'
        sTextForButton = '';
    }
    var sId = 'Id="KB_' + sTextForButton + '" ';
    var sLetterSingleQuoted = "'" + sLetter + "'";
    var sOnClick = ' onclick="KB_Mini_KeyboardPress(' + sLetterSingleQuoted + ');" ';
    var sValue = 'value=' + sLetterSingleQuoted +' ';
    var sClassWrapped = 'class="' + sClass + '" '; 
    var sButton = '<DIV '+ sId + sClassWrapped + sOnClick + sValue + '>' + sTextForButton + '</DIV>';
    return sButton;
}

