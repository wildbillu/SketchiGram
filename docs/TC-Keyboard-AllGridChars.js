// TC-Keyboard-AllGridChars.js

var g_KB_Buttons_a_of_cLetters = [];
var g_KB_Buttons_a_of_bPlacedCorrectly = [];
var g_KB_Buttons_a_of_sButtonInner = [];
var g_KB_AGC_AllButtonsEnabled = false;
var g_KB_AGC_PendingPressedButton = -1;
var g_KB_AGC_Backspace_bActive = false;

var g_KB_Mini_sUsageMode_Idle = 'Idle';
var g_KB_Mini_sUsageMode_ActiveGrid = 'Active_Grid';
var g_KB_Mini_sUsageMode_ActiveWords = 'Active_Words';
var g_KB_Mini_sUsageMode_SpecialClue = 'SpecialClue';
var g_KB_Mini_sUsageMode = g_KB_Mini_sUsageMode_Idle;
var g_KB_Mini_bBackspaceEnabled = false;

function KB_SetUsageMode(sUsageMode)
{
    g_KB_Mini_sUsageMode = sUsageMode;
    let eInstructions = document.getElementById("KB_Mini_Instructions_Div");
    let eButtonRow = document.getElementById("KB_Mini_ButtonRow_Div");
    let elemKB_Mini_Div = document.getElementById('KB_Mini_Div');
    if ( g_KB_Mini_sUsageMode == g_KB_Mini_sUsageMode_Idle )
    {
        let sBackgroundColor = '#FFFFFF';
        eInstructions.style.backgroundColor = sBackgroundColor;
        eButtonRow.style.backgroundColor = sBackgroundColor;
        elemKB_Mini_Div.style.backgroundColor = sBackgroundColor;
        KB_AGC_EnabledStateAllButtons(false);
        return;
    }
    if ( g_KB_Mini_sUsageMode == g_KB_Mini_sUsageMode_ActiveGrid )
    {
        let sBackgroundColor = g_Color_sAbvocabPink;
        eInstructions.style.backgroundColor = sBackgroundColor;
        eButtonRow.style.backgroundColor = sBackgroundColor;
        elemKB_Mini_Div.style.backgroundColor = sBackgroundColor;
        KB_AGC_EnabledStateAllButtons(false);
        return;
    }
    if ( g_KB_Mini_sUsageMode == g_KB_Mini_sUsageMode_SpecialClue )
    {
        let sBackgroundColor = g_Color_sAbvocabBlue;
        eInstructions.innerHTML = "Select Letter For Special Clue Answer"
        eInstructions.style.backgroundColor = sBackgroundColor;
        eButtonRow.style.backgroundColor = sBackgroundColor;
        elemKB_Mini_Div.style.backgroundColor = sBackgroundColor;
        KB_AGC_EnabledStateAllButtons(true);
        return;
    }
    if ( g_KB_Mini_sUsageMode == g_KB_Mini_sUsageMode_ActiveWords )
    {
        let sBackgroundColor = g_Color_sScratchAreaActive;
        eInstructions.style.backgroundColor = sBackgroundColor;
        eButtonRow.style.backgroundColor = sBackgroundColor;
        elemKB_Mini_Div.style.backgroundColor = sBackgroundColor;
        KB_AGC_EnabledStateAllButtons(true);
        return;
    }
setlineAdd('badUsageMode:' + g_KB_Mini_sUsageMode);
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
        iKBWidth = g_Window_iWidth * g_KB_fFractionAvailableWidth - 2; // for border
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
        iKBLeft = g_Window_iWidth - iKBWidth;
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
        let rect_KB = GetBoundingClientRectAbsolute(elem_KB);
        g_TC_iBiggestBottom += rect_KB.height;
    }
}

function KB_AllGridChars_Setup()
{
    KB_AllGridChars_MakeButtons();
//    let g_KB_sJustification = 'center';
    let iWidthMax = g_iGridWidth * g_GRBMS_Square_iSize;
    if ( g_KB_sWidthDeterminedBy == 'BiggestRight' )
        iWidthMax = g_Window_iWidth * g_KB_fFractionAvailableWidth;
    let iRows = 1;
// we use the original order of Player Grid Answers - already random
    let iLetters = g_KB_Buttons_a_of_sButtonInner.length;
//
    let iTotalButtons = iLetters;
    if ( g_KB_bBackspaceKeyActive ) iTotalButtons += 1;
    if ( g_KB_bArrowKeysActive ) iTotalButtons += 2; 
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
        let bLastRow = false;
        if ( iRow == iRows - 1) 
            bLastRow = true;
        let sThisRow = KB_AllGridChars_MakeThisRow(iStart, iFinish, bLastRow);
        sInner += sThisRow;
        sInner += '</TD></TR>'
    }
    sInner += '</TABLE>';
//    
    let elemKB_Mini_Div = document.getElementById('KB_Mini_Div');
    elemKB_Mini_Div.innerHTML = sInner;
    return iRows;
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

function KB_AGC_SpecialButtonEnable(bEnabled)
{ 
    let bVisible = false;
    if ( g_SA_Focus_sId != '' )
        bVisible = true;
    ForIdSetVisibility('Backspace', bVisible);
    ForIdSetVisibility('ArrowLeft', bVisible);
    ForIdSetVisibility('ArrowRight', bVisible);
}

function KB_AllGridChars_MakeButtonId(iButton){let sId = 'KB_AGC_' + iButton;return sId}
function KB_AllGridChars_IndexFromButtonId(sId){let sIndex = sId.substring(7);return parseInt(sIndex)}
