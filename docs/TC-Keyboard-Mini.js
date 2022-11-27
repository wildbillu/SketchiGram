// TC-Keyboard-Mini.js
// includes only allowed characters and presents them scrambled

var g_KB_Mini_bBackspaceEnabled = false;

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
    let iTotalLetters = iAllowedLetters + 3;
    let elemTest = document.getElementById("Test")
    let sLetter = 'L'
    elemTest.innerHTML = KB_Mini_MakeKeyboardButton(sLetter);
    let sId = 'KB_' + sLetter;
    let elemLetter = document.getElementById(sId)
    let rectButton = elemLetter.getBoundingClientRect();
    let iEstimatedWidth = iTotalLetters * (rectButton.width + 4); 
    let fRows = Math.ceil(iEstimatedWidth / iWidthMax);
    let iRows = parseInt(fRows);
    let fLettersPerRow = Math.ceil(iTotalLetters / iRows);
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
            sThisRow += '<';
            sThisRow += '>';
        }
        sInner += '<TR align=center><TD>';
        sInner += KB_Mini_MakeRowOfButtons(sThisRow);
        sInner += '</TD></TR>'
    }
    sInner += '</TABLE>';    
//    
    let elemKB_Mini_Div = document.getElementById('KB_Mini_Div');
    elemKB_Mini_Div.innerHTML = sInner;
    KB_Mini_SpecialButtonEnable(false);
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

function KB_Mini_KeyboardPress_GRBMS(keypressed)
{
    if ( g_GRBMS_Focus_sId == "")
        return false;
    iRow = GRBMS_RowFromId(g_GRBMS_Focus_sId);
    iLetter = GRBMS_LetterFromId(g_GRBMS_Focus_sId);
    var sCC = String.fromCharCode(8);
    if ( keypressed == sCC )
    {
        if ( !g_KB_Mini_bBackspaceEnabled )
            return true;
        sToSet = ' ';
    }
    GRBMS_onkeyup(keypressed, iRow, iLetter);
    return true;
}

function KB_Mini_KeyboardPress_SA_EB(keypressed)
{
    if ( g_SA_EB_Focus_sId == "")
    {
        return false;
    }
    var sCC = String.fromCharCode(8);
    if ( keypressed == sCC && !g_KB_Mini_bBackspaceEnabled )
        return true;
    TC_SA_EB_Entry_AddChar(keypressed)
    return true;
}

function KB_Mini_KeyboardPress(sLetter)
{
    if ( KB_Mini_KeyboardPress_GRBMS(sLetter) )
        return;
    if ( KB_Mini_KeyboardPress_CAB(sLetter) )
        return;
    KB_Mini_KeyboardPress_SA_EB(sLetter);
}

function KB_Mini_MakeRowOfButtons(sLetters)
{
    var sButtonRow = '<TABLE><TR>';
    var iLetters = sLetters.length;
    for ( let iLetter = 0; iLetter < iLetters; iLetter++ )
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
    let sTextForId = sLetter;
    if ( sLetter == sCC )
    {
        sClass = 'KB_Mini_Button KB_Mini_ButtonBackspace'
        sTextForButton = '';
        sTextForId = 'Backspace';
    }
    else if ( sLetter == '<')
    {
        sLetter = 'ArrowLeft'
        sClass = 'KB_Mini_Button KB_Mini_ButtonArrowLeft'
        sTextForButton = '';
        sTextForId = 'ArrowLeft';

    }
    else if ( sLetter == '>')
    {
        sClass = 'KB_Mini_Button KB_Mini_ButtonArrowRight'
        sLetter = 'ArrowRight'
        sTextForButton = '';
        sTextForId = 'ArrowRight';

    }
    var sId = 'Id="KB_' + sTextForId + '" ';
    var sLetterSingleQuoted = "'" + sLetter + "'";
    var sOnClick = ' onclick="KB_Mini_KeyboardPress(' + sLetterSingleQuoted + ');" ';
    var sValue = 'value=' + sLetterSingleQuoted +' ';
    var sClassWrapped = 'class="' + sClass + '" '; 
    var sButton = '<DIV '+ sId + sClassWrapped + sOnClick + sValue + '>' + sTextForButton + '</DIV>';
    return sButton;
}

function KB_Mini_SpecialButtonEnable(bEnabled)
{
    KB_Mini_BackspaceEnable(bEnabled);
    KB_Mini_ArrowLeftEnable(bEnabled);
    KB_Mini_ArrowRightEnable(bEnabled);
}

function KB_Mini_BackspaceEnable(bEnabled)
{
    g_KB_Mini_bBackspaceEnabled = bEnabled;
    let sId = 'KB_Backspace';
    let elemBackspace = document.getElementById(sId)
    if ( bEnabled )
        elemBackspace.style.backgroundImage = 'url("images/Buttons/Button_Backspace.png")';
    else
        elemBackspace.style.backgroundImage = 'url("images/Buttons/Button_Backspace-Disabled.png")';
}

function KB_Mini_ArrowRightEnable(bEnabled)
{
    g_KB_Mini_bBackspaceEnabled = bEnabled;
    let sId = 'KB_ArrowRight';
    let elemBackspace = document.getElementById(sId)
    if ( bEnabled )
        elemBackspace.style.backgroundImage = 'url("images/Buttons/Button_ArrowRight.png")';
    else
        elemBackspace.style.backgroundImage = 'url("images/Buttons/Button_ArrowRight-Disabled.png")';
}

function KB_Mini_ArrowLeftEnable(bEnabled)
{
    g_KB_Mini_bBackspaceEnabled = bEnabled;
    let sId = 'KB_ArrowLeft';
    let elemBackspace = document.getElementById(sId)
    if ( bEnabled )
        elemBackspace.style.backgroundImage = 'url("images/Buttons/Button_ArrowLeft.png")';
    else
        elemBackspace.style.backgroundImage = 'url("images/Buttons/Button_ArrowLeft-Disabled.png")';
}
