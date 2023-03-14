// TC-Keyboard-Mini.js
// includes only allowed characters and presents them scrambled

var g_KB_Mini_sUsageMode_Idle = 'Idle';
var g_KB_Mini_sUsageMode_ActiveGrid = 'Active_Grid';
var g_KB_Mini_sUsageMode_ActiveWords = 'Active_Words';
var g_KB_Mini_sUsageMode_DualClue = 'DualClue';
var g_KB_Mini_sUsageMode = g_KB_Mini_sUsageMode_Idle;
var g_KB_Mini_bBackspaceEnabled = false;

function KB_Mini_Adjust(iKBRows)
{
    let elemGrid = document.getElementById('Div_Grid');
    let rectGrid = GetBoundingClientRectAbsolute(elemGrid)
    let iKBWidth = rectGrid.width - 2; // account for border?
//
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    var elem_KB = document.getElementById('KB_Mini_Div');
    elem_KB.style.top = MakePixelString(g_TC_iBiggestBottom);
    elem_KB.style.width = MakePixelString(iKBWidth);
    elem_KB.style.left = MakePixelString(rectGrid.left);
//
    var elemButtonDiv = document.getElementById("KB_Mini_ButtonRow_Div");
    elemButtonDiv.style.width = MakePixelString(iKBWidth);
    var elemInstructionsDiv = document.getElementById("KB_Mini_Instructions_Div");
    elemInstructionsDiv.style.width = MakePixelString(iKBWidth);
    var rectInstructionsDiv = elemInstructionsDiv.getBoundingClientRect();
    elem_KB.style.height = MakePixelString(iKBRows * 52 + rectInstructionsDiv.height + 5);// fix this?
    var rect_KB = elem_KB.getBoundingClientRect();
    g_TC_iBiggestBottom += rect_KB.height;
}

function KB_Mini_SetUsageMode(sUsageMode)
{
    g_KB_Mini_sUsageMode = sUsageMode;
    let eInstructions = document.getElementById("KB_Mini_Instructions_Div");
    let eButtonRow = document.getElementById("KB_Mini_ButtonRow_Div");
    if ( g_KB_Mini_sUsageMode == g_KB_Mini_sUsageMode_Idle )
    {
        let sBackgroundColor = '#FFFFFF';
        eInstructions.style.backgroundColor = sBackgroundColor;
        eButtonRow.style.backgroundColor = sBackgroundColor;
        KB_DisableLettersFullyPlaced();
        KB_AGC_EnabledStateAllButtons(false);
        return;
    }
    if ( g_KB_Mini_sUsageMode == g_KB_Mini_sUsageMode_ActiveGrid )
    {
        let sBackgroundColor = g_Color_sAbvocabPink;
        eInstructions.style.backgroundColor = sBackgroundColor;
        eButtonRow.style.backgroundColor = sBackgroundColor;
        KB_DisableLettersFullyPlaced();
        KB_AGC_EnabledStateAllButtons(false);
        return;
    }
    if ( g_KB_Mini_sUsageMode == g_KB_Mini_sUsageMode_DualClue )
    {
        let sBackgroundColor = g_Color_sAbvocabBlue;
        eInstructions.innerHTML = "Select Letter For Dual Clue Answer"
        eInstructions.style.backgroundColor = sBackgroundColor;
        eButtonRow.style.backgroundColor = sBackgroundColor;
        KB_AGC_EnabledStateAllButtons(true);
        return;
    }
// g_KB_Mini_sUsageMode_ActiveWords 
    let sBackgroundColor = g_Color_sScratchAreaActive;
    eInstructions.style.backgroundColor = sBackgroundColor;
    eButtonRow.style.backgroundColor = sBackgroundColor;
    KB_AGC_EnabledStateAllButtons(true);
//    KB_Mini_EnableAllLetters();
}

function KB_Mini_SetInstructionLine(cLetterBeingReplaced)
{
    let eInstructions = document.getElementById("KB_Mini_Instructions_Div");
    let sInstructions = ' Exchange Highlighted Letter with Selection ';
    if ( cLetterBeingReplaced != '' )
    {
        sInstructions = ' Exchange ' + cLetterBeingReplaced + ' With Selection ';
        KB_SetUsageMode(g_KB_Mini_sUsageMode_ActiveGrid)
    }
    else
        KB_SetUsageMode(g_KB_Mini_sUsageMode_Idle)
    eInstructions.innerHTML = sInstructions;
}

function KB_Mini_LettersSetEnabled(cLetter, bEnabled)
{
    let sId = KB_Mini_IdForLetterKey(cLetter);
    var eLetter = document.getElementById(sId);
//    eLetter.disabled = !bEnabled;
    if ( bEnabled )
    {
        let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter';
        if ( g_KB_Buttons_Narrow )
            sClass = 'KB_Mini_Button KB_Mini_ButtonLetter_Narrow';
        eLetter.className = sClass;
    }
    else
    {
        let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter_Disabled';
        if ( g_KB_Buttons_Narrow )
            sClass = 'KB_Mini_Button KB_Mini_ButtonLetter_Disabled_Narrow';
        eLetter.className = sClass;
    }
}

function KB_Mini_EnableAllLetters()
{
    let iAllowed = g_GRBMS_sAllowedGridLetters.length;
    for ( let i = 0; i < iAllowed; i++ )
    {
        let cThisOne = g_GRBMS_sAllowedGridLetters.charAt(i);
        KB_Mini_LettersSetEnabled(cThisOne, true);
    }
}

function KB_Mini_DisableLettersFullyPlaced()
{
    if ( g_SA_EB_Focus_sId != '' )
        return;
    let iAllowed = g_GRBMS_sAllowedGridLetters.length;
    g_GRBMS_sAllowedGridLetters_Selectable = '';
    for ( let i = 0; i < iAllowed; i++ )
    {
        let bFoundOneNotPlacedCorrectly = false;
        let cThisOne = g_GRBMS_sAllowedGridLetters.charAt(i);
        for ( iRow = 0; iRow < g_iGridHeight; iRow++ )
        {
            for ( iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
            {
                let cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
                let cAnswer       = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
                if ( cAnswerPlayer == cThisOne && cAnswer != cAnswerPlayer )
                        bFoundOneNotPlacedCorrectly = true;
            }
        }
        KB_Mini_LettersSetEnabled(cThisOne, bFoundOneNotPlacedCorrectly);
        if ( bFoundOneNotPlacedCorrectly )
            g_GRBMS_sAllowedGridLetters_Selectable += 'T';
        else 
            g_GRBMS_sAllowedGridLetters_Selectable += 'F';
    }
}

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
    let sLetter = 'W';
    let sInnerLetter = KB_Mini_MakeKeyboardButton(sLetter);
    elemTest.innerHTML = sInnerLetter;
    let sId = 'KB_' + sLetter;
    let elemLetter = document.getElementById(sId)
    let rectButton = elemLetter.getBoundingClientRect();
    let iEstimatedWidth = iTotalLetters * (rectButton.width + 10); 
    let fRows = Math.ceil(iEstimatedWidth / iWidthMax);
    let iRows = parseInt(fRows);
    let fLettersPerRow = Math.ceil(iTotalLetters / iRows);
    let iLettersPerRow = parseInt(fLettersPerRow.toFixed());
    elemTest.innerHTML = '';
    let sInner = '';
// we need to determine if we need more than one and row    
// we have div at top that tells how to use the mini keypad
    sInner += '<DIV Id="KB_Mini_Instructions_Div" class="KB_Mini_Instructions">'
    sInner += ' Exchange Highlighted Letter with Selection ';
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
    KB_SpecialButtonEnable(false);
    KB_DisableLettersFullyPlaced();
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
// here we reject ones that are not selectable
    let iIndex = g_GRBMS_sAllowedGridLetters.indexOf(sLetter)
    let cSelectable = g_GRBMS_sAllowedGridLetters_Selectable.charAt(iIndex);
    if ( g_SA_EB_Focus_sId == "" && cSelectable == 'F' )
        return;
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

function KB_Mini_IdForLetterKey(cLetter)
{
    let sId = 'KB_' + cLetter;   
    return sId;
}

function KB_Mini_MakeKeyboardButton(sLetter)
{
    let sTextForButton = sLetter;
    let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter';//.KB_Mini_ButtonLetter_Disabled
    if ( g_KB_Buttons_Narrow )
        sClass = 'KB_Mini_Button KB_Mini_ButtonLetter_Narrow'
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
