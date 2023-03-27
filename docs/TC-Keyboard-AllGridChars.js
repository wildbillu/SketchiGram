// TC-Keyboard-AllGridChars.js

var g_KB_Buttons_a_of_cLetters = [];
var g_KB_Buttons_a_of_bPlacedCorrectly = [];
var g_KB_Buttons_a_of_sButtonInner = [];
var g_KB_AGC_AllButtonsEnabled = false;
var g_KB_AGC_PendingPressedButton = -1;
var g_KB_AGC_Backspace_bActive = false;

function KB_AGC_KeyboardPressBackspace()
{
    if ( g_CAB_Focus_sId != '' )
    {
        iRow = CAB_RowFromId(g_CAB_Focus_sId);
        iLetter = CAB_LetterFromId(g_CAB_Focus_sId);
        CAB_ForRowLetter_SetAnswerPlayer(g_cCode_MeaningNotSet ,iRow, iLetter);
        CAB_ForRowLetter_SetStatusPlayer(g_cCode_Normal ,iRow, iLetter);
        CAB_ForRowLetter_SetButton(iRow, iLetter, g_cCode_HasFocus);
        return;
    }
    return;
}

function KB_AGC_MakeBackspaceButton()
{
    let sTextForButton = ' ';
    let sTextForId = 'Backspace';
    let sClass = 'KB_Mini_Button KB_Mini_ButtonBackspace_Disabled StartHidden';
    let sIdWrapped = ' Id="' + sTextForId + '" ';
    let sClassWrapped = 'class="' + sClass + '" '; 
    let sOnClick = ' onclick="KB_AGC_KeyboardPressBackspace();" ';
    let sButton = '<TD><DIV '+ sIdWrapped + sClassWrapped + sOnClick + '>' + sTextForButton + '</DIV></TD>';
    return sButton;
}

function KB_AGC_FindBoundsOfButtons()
{
    let iButtons = g_KB_Buttons_a_of_cLetters.length;
    let elemButton = document.getElementById(KB_AllGridChars_MakeButtonId(0));
    let rectButton = GetBoundingClientRectAbsolute(elemButton);
    let iLeft = rectButton.left;
    let iTop = rectButton.top;
    let iRight = rectButton.right;
    let iBottom = rectButton.bottom;
    for ( let iButton = 1; iButton < iButtons; iButton++ )
    {
        elemButton = document.getElementById(KB_AllGridChars_MakeButtonId(iButton));
        rectButton = GetBoundingClientRectAbsolute(elemButton);
        if ( rectButton.left < iLeft ) iLeft = rectButton.left;
        if ( rectButton.right > iRight ) iRight = rectButton.right;
        if ( rectButton.top < iTop ) iTop = rectButton.top;
        if ( rectButton.bottom > iBottom ) iBottom = rectButton.bottom;
    }
    r = new DOMRect(0, 0, iRight - iLeft, iBottom - iTop)
    return r;
}

function KB_AllGridChars_Adjust(bMove)
{
    let elem_KB = document.getElementById('KB_Mini_Div');
    let elemGrid = document.getElementById('Div_Grid');
    let rectGrid = GetBoundingClientRectAbsolute(elemGrid);
    if ( bMove ) 
    {
        let iTop = rectGrid.bottom + g_TC_Padding_Inter_Vertical_iSize;
        g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
        elem_KB.style.top = MakePixelString(iTop);
    }
    let iKBWidth = rectGrid.width;
    let iKBLettersHeight = 0;
    if ( g_KB_sWidthDeterminedBy == 'BiggestRight' )
    { // later we want to contract this so it just fits the actual key
        iKBWidth = g_TC_iBiggestRight * g_KB_fFractionAvailableWidth - 2; // for border
        let iKBCandidateWidth = 0;
        let elemInstructionsDiv = document.getElementById("KB_Mini_Instructions_Div");
        let iWidthOfText = GetWidthOfTextInPixels(elemInstructionsDiv, elemInstructionsDiv.innerHTML);
        if ( iWidthOfText > iKBCandidateWidth )
            iKBCandidateWidth = iWidthOfText;
        let rect = KB_AGC_FindBoundsOfButtons()
        let iWidthLetters = rect.width + 10; //for padding
        if ( iWidthLetters > iKBCandidateWidth )
            iKBCandidateWidth = iWidthLetters;
        iKBLettersHeight = rect.height + 10;
        iKBWidth = iKBCandidateWidth;
    }
    let iKBLeft = 0;
    if ( g_KB_sJustification == 'grid' )
    {
        iKBLeft = rectGrid.left;
        if ( iKBWidth < rectGrid.width )
            iKBWidth = rectGrid.width;
    }
    else if ( g_KB_sJustification == 'center' )
    {
        iKBLeft = TC_LeftForCentering(iKBWidth)
    }
    else if ( g_KB_sJustification == 'right' )
    {
        iKBLeft = g_TC_iBiggestRight - iKBWidth;
    }
    elem_KB.style.width = MakePixelString(iKBWidth);
    elem_KB.style.left = MakePixelString(iKBLeft);

    let elemButtonDiv = document.getElementById("KB_Mini_ButtonRow_Div");

    elemButtonDiv.style.width = MakePixelString(iKBWidth);
    let elemInstructionsDiv = document.getElementById("KB_Mini_Instructions_Div");
    elemInstructionsDiv.style.width = MakePixelString(iKBWidth);
    let rectInstructionsDiv = elemInstructionsDiv.getBoundingClientRect();
    elem_KB.style.height = MakePixelString(iKBLettersHeight + rectInstructionsDiv.height);

    let elemKB_Mini_Div = document.getElementById('KB_Mini_Div');
    elemKB_Mini_Div.style.height = MakePixelString(iKBLettersHeight + rectInstructionsDiv.height);
    
    if ( bMove ) 
    {
        let rect_KB = elem_KB.getBoundingClientRect();
        g_TC_iBiggestBottom += rect_KB.height;
    }
}

function KB_AllGridChars_Setup()
{
    KB_AllGridChars_MakeButtons();
//    let g_KB_sJustification = 'center';
    let iWidthMax = g_iGridWidth * g_GRBMS_Square_iSize;
    if ( g_KB_sWidthDeterminedBy == 'BiggestRight' )
        iWidthMax = g_TC_iBiggestRight * g_KB_fFractionAvailableWidth;
    let iRows = 1;
// we use the original order of Player Grid Answers - already random
    let iLetters = g_KB_Buttons_a_of_sButtonInner.length;
//
    let iTotalButtons = iLetters + 1; // for the delete key
    let iButtonWidth = KB_GetButtonWidth();
    let iEstimatedWidth = iTotalButtons * (iButtonWidth + 10); 
    let fRows = Math.ceil(iEstimatedWidth / iWidthMax);
    iRows = parseInt(fRows);
    let fLettersPerRow = Math.ceil(iTotalButtons / iRows);
    let iLettersPerRow = parseInt(fLettersPerRow.toFixed());
    let sInner = '';
// we need to determine if we need more than one and row    
// we have div at top that tells how to use the mini keypad
    sInner += '<DIV Id="KB_Mini_Instructions_Div" class="KB_Mini_Instructions">'
    if ( g_bPrintedFormat )
        sInner += ' Grid Letters - Greyed Are Placed Correctly ';
    else
        sInner += ' Exchange Highlighted Letter with Selection ';
    sInner += '</DIV>'
    sInner += '<TABLE Id="KB_Mini_ButtonRow_Div" class="KB_Mini_ButtonRow">';
    for (let iRow = 0; iRow < iRows; iRow ++ )
    {
        let iStart = iRow * iLettersPerRow;
        let iFinish = iStart + iLettersPerRow;
        if ( iFinish > iLetters )
            iFinish = iLetters;
        sInner += '<TR align=center><TD>';
        let bAppendBackspace = false;
        if ( iRow == iRows - 1)
            bAppendBackspace = true;
        let sThisRow = KB_AllGridChars_MakeThisRow(iStart, iFinish, bAppendBackspace);
        sInner += sThisRow;
        sInner += '</TD></TR>'
    }
    sInner += '</TABLE>';
//    
    let elemKB_Mini_Div = document.getElementById('KB_Mini_Div');
    elemKB_Mini_Div.innerHTML = sInner;
    return iRows;
}

function KB_AGC_EnabledStateAllButtons(bOverrideAllToBeEnabled)
{
    g_KB_AGC_AllButtonsEnabled = bOverrideAllToBeEnabled;
    for ( let i = 0; i < g_KB_Buttons_a_of_cLetters.length; i++)
    {
        let bEnabled = true;
        if ( !bOverrideAllToBeEnabled )
           bEnabled = !g_KB_Buttons_a_of_bPlacedCorrectly[i];
        KB_AGC_SetButtonEnabledClass(i, bEnabled)
    }
    let bBackspaceVisible = false;
    let sClassBackspace = 'KB_Mini_Button KB_Mini_ButtonBackspace_Disabled';
    if ( bOverrideAllToBeEnabled )
    {
        bBackspaceVisible = true;
        sClassBackspace = 'KB_Mini_Button KB_Mini_ButtonBackspace';
    }
    let elemBackspace = document.getElementById('Backspace');
    ForIdSetVisibility('Backspace', bBackspaceVisible)
    elemBackspace.className = sClassBackspace;
}

function KB_AllGridChars_MakeButtonInTD(iButton, cLetter, bPlacedCorrectly)
{
    let sId = KB_AllGridChars_MakeButtonId(iButton)
    let sIdWrapped = ' Id="' + sId + '" ';
    let sTextForButton = cLetter;
    let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter';
    if ( bPlacedCorrectly )
        sClass += '_Disabled'
    if ( g_KB_Buttons_Narrow )
        sClass += '_Narrow'
    let sClassWrapped = 'class="' + sClass + '" '; 
    let sOnClick = ' onclick="KB_AGC_KeyboardPress(' + iButton + ');" ';
    let sButton = '<TD><DIV '+ sIdWrapped + sClassWrapped + sOnClick + '>' + sTextForButton + '</DIV></TD>';
    return sButton;
}

function KB_AGC_SetButtonEnabledClass(iButton, bEnabled)
{
    let sId = KB_AllGridChars_MakeButtonId(iButton);
    let elemButton = document.getElementById(sId);
    let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter';
    if ( !bEnabled )
        sClass += '_Disabled';
    if ( g_KB_Buttons_Narrow )
        sClass += '_Narrow'
    elemButton.className = sClass;
}

function KB_AGC_SetButtonPlacedCorrectly(iButton)
{
    g_KB_Buttons_a_of_bPlacedCorrectly[iButton] = true;
    let sId = KB_AllGridChars_MakeButtonId(iButton);
    let elemButton = document.getElementById(sId);
    let sClass = 'KB_Mini_Button KB_Mini_ButtonLetter_Disabled';
    if ( g_KB_Buttons_Narrow )
        sClass += '_Narrow'
    elemButton.className = sClass;
}

function KB_AGC_KeyboardPress_GRBMS(keypressed)
{
    if ( g_GRBMS_Focus_sId == "")
        return false;
    iRow = GRBMS_RowFromId(g_GRBMS_Focus_sId);
    iLetter = GRBMS_LetterFromId(g_GRBMS_Focus_sId);
    GRBMS_onkeyup(keypressed, iRow, iLetter);
    Sync_FocusChange()
    return true;
}

function KB_AGC_FindAndChangeFirstNotYetCorrect(cLetter)
{
    let bFound = false;
    let i = 0;
    while ( i < g_KB_Buttons_a_of_cLetters.length && !bFound )
    {
        let cButtonLetter = g_KB_Buttons_a_of_cLetters[i];
        let bCorrect = g_KB_Buttons_a_of_bPlacedCorrectly[i];
        if ( cButtonLetter == cLetter && !bCorrect )
        {
            KB_AGC_SetButtonPlacedCorrectly(i)
            bFound = true;
        }
        i++;
    }
}

function KB_AGC_Changed(A_iRow, A_iLetter, B_iRow, B_iLetter)
{
// either location is now correct we need to disable correct keyboard letter
    let A_cStatus = GRB_ForRowLetter_GetStatusPlayer(A_iRow, A_iLetter);
    if ( A_cStatus == g_cCode_Correct )
    {
        if ( g_KB_AGC_PendingPressedButton != -1 )
        {
            KB_AGC_SetButtonPlacedCorrectly(g_KB_AGC_PendingPressedButton);
            g_KB_AGC_PendingPressedButton = -1;
        }
        else
        {
            let A_cLetter = GRB_ForRowLetter_GetAnswerPlayer(A_iRow, A_iLetter);
            KB_AGC_FindAndChangeFirstNotYetCorrect(A_cLetter)
        }
    }
    let B_cStatus = GRB_ForRowLetter_GetStatusPlayer(B_iRow, B_iLetter);
    if ( B_cStatus == g_cCode_Correct )
    {
            let B_cLetter = GRB_ForRowLetter_GetAnswerPlayer(B_iRow, B_iLetter);
            KB_AGC_FindAndChangeFirstNotYetCorrect(B_cLetter)
    }
}

function KB_AGC_KeyboardPress(iButton)
{
    let cLetter = g_KB_Buttons_a_of_cLetters[iButton];
    let bPlacedCorrectly = g_KB_Buttons_a_of_bPlacedCorrectly[iButton];
    if ( bPlacedCorrectly && !g_KB_AGC_AllButtonsEnabled )
        return;
    g_KB_AGC_PendingPressedButton = iButton;
    if ( KB_AGC_KeyboardPress_GRBMS(cLetter) )
        return;
    if ( KB_Mini_KeyboardPress_CAB(cLetter) )
        return;
    KB_Mini_KeyboardPress_SA_EB(cLetter);
}

function KB_AllGridChars_MakeButtons()
{
    g_KB_Buttons_a_of_cLetters.length = 0;
    g_KB_Buttons_a_of_bPlacedCorrectly.length = 0;
    g_KB_Buttons_a_of_sButtonInner.length = 0;
//    
    let sAnswersPlayer = g_aGridAnswersPlayer.join('');
    let sStatusPlayer  = g_aGridStatusPlayer.join('');
    let iButtons = sAnswersPlayer.length;
    let iButtonActive = 0;
    for ( let iButton = 0; iButton < iButtons; iButton++ )
    {
        let cStatusPlayer = sStatusPlayer.charAt(iButton);
        let cAnswer = sAnswersPlayer.charAt(iButton)
        if ( cAnswer != g_cCode_BlackSquare )
        {
            let bProperlyPlaced = false;
            if ( cStatusPlayer == g_cCode_Corrected ) bProperlyPlaced = true;
            if ( cStatusPlayer == g_cCode_Correct ) bProperlyPlaced = true;
            if ( cStatusPlayer == g_cCode_Golden ) bProperlyPlaced = true;
            let cLetter = sAnswersPlayer.charAt(iButton);
            let s = KB_AllGridChars_MakeButtonInTD(iButtonActive, cLetter, bProperlyPlaced);
            g_KB_Buttons_a_of_sButtonInner.push(s);
            g_KB_Buttons_a_of_cLetters.push(cLetter);
            g_KB_Buttons_a_of_bPlacedCorrectly.push(bProperlyPlaced);
            iButtonActive++
        }
    }
}

function KB_AllGridChars_MakeThisRow(iStart, iFinish, bAppendBackspace)
{
    let sButtonRow = '<TABLE><TR>';
    for ( iButton = iStart; iButton < iFinish; iButton++)
        sButtonRow += g_KB_Buttons_a_of_sButtonInner[iButton];
    if ( bAppendBackspace )
        sButtonRow += KB_AGC_MakeBackspaceButton();
    sButtonRow += '</TR></TABLE>';
    return sButtonRow; 
}

function KB_GetButtonWidth()
{
    let elemTest = document.getElementById("Test")
    let cLetter = 'W';
    let sInnerLetter = KB_AllGridChars_MakeButtonInTD(0, cLetter, true);
    elemTest.innerHTML = sInnerLetter;
    let sId = KB_AllGridChars_MakeButtonId(0);
    let elemLetter = document.getElementById(sId)
    let rectButton = elemLetter.getBoundingClientRect();
    let iWidth = rectButton.width; 
    elemTest.innerHTML = '';
    return iWidth;
}

function KB_AllGridChars_MakeButtonId(iButton){let sId = 'KB_AGC_' + iButton;return sId}
function KB_AllGridChars_IndexFromButtonId(sId){let sIndex = sId.substring(7);return parseInt(sIndex)}
