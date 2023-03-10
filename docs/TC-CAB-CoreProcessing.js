// TC-CAB-CoreProcessing.js
function CAB_ForRowWithFocus_SetAnswerBoxStyles()
{
    var iRowActive = -1;
    if ( g_CAB_Focus_sId != '' )
    {
        iRowActive = CAB_RowFromId(g_CAB_Focus_sId);
    }
// deal with dual row    
    if ( iRowActive == 0 || iRowActive == 1 )
        document.getElementById('GRBMS_Div_CAB_DualClue').className = 'GRBMS_Div_CAB_DualClue CAB_Color_Active';
    else
        document.getElementById('GRBMS_Div_CAB_DualClue').className = 'GRBMS_Div_CAB_DualClue CAB_Color_InActive';
    for ( iR = 2; iR < g_iClues; iR++)
    {
        var sId = CAB_SingleRowClueBackgroundId(iR)
        var sClassRowBase = 'CAB_Row_Base';
        if ( g_bIsYourMove )
            sClassRowBase = 'GRBMS_Div_CAB_Clue_Single_Row'
        var sClassRow = sClassRowBase + ' CAB_Color_InActive';
        if ( iR == iRowActive )
            sClassRow = sClassRowBase + ' CAB_Color_Active';
        document.getElementById(sId).className = sClassRow;
    }
}

function CAB_MoveFocus(iNewRow, iNewLetter)
{
// fix for only dual clue
//    if ( iNewRow > g_iClues -1 || iNewRow < 0 )
    if ( iNewRow > 1 )
        iNewRow = 0;
    if ( iNewRow == -1 )
        iNewRow = 0;
    var sNextBox = CAB_MakeId(iNewRow, iNewLetter);
	document.getElementById(sNextBox).focus();
}

function CAB_SetFocusToNext(iRow, iLetter)
{
    var iLength = CAB_ForRow_GetLength(iRow);
    var bLastLetter = CAB_ForRowLetter_IsLastLetter(iRow, iLetter);
    if ( !bLastLetter && g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares )
    {
        for ( iL = iLetter+1; iL < iLength; iL++)
        {
            if ( !CAB_ForRowLetter_IsPlayerAnswerSet(iRow, iL) )
            {
                CAB_MoveFocus(iRow, iL);
                return;
            }
            iLetter = iL;
        }
    }
    if ( bLastLetter && g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare )
    { 
        for ( iL = 0; iL < iLength; iL++)
        {
            if ( !CAB_ForRowLetter_IsPlayerAnswerSet(iRow, iL) )
            {
                CAB_MoveFocus(iRow, iL);
                return;
            }
        }
    }
    if ( bLastLetter && !g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue )
    {
        return;
    }
    var iNewRow = iRow;
	var iNewLetter = iLetter;
	if ( iLetter < iLength-1 )
	{
		iNewLetter = iNewLetter + 1;
    }
    else
    {
        iNewLetter = 0;
        iNewRow++;
    }
	if ( iNewRow > g_iAnswers - 1 )
    {
        iNewRow = 0;
        iNewLetter = 0;
    }
    CAB_MoveFocus(iNewRow, iNewLetter)
}

function CAB_ForRowLetter_DoItAll(cAnswerPlayer, iRow, iLetter)
{
    var cInitialStatus = CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( TC_CorrectOrGolden(cInitialStatus) ) 
        return; // if correct already don't allow change and nothing else to do
    CAB_ForRowLetter_UpdateAnswersPlayer(cAnswerPlayer, iRow, iLetter);
//    
    if ( cInitialStatus == g_TC_cCodeMeaning_Incorrect || cInitialStatus == g_TC_cCodeMeaning_IncorrectWithOverride)
    { // since a letter was typed we no longer know it is incorrect so set back to Normal
        CAB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Normal, iRow, iLetter);
    }
    if ( g_bSettings_CAGR_Answers_ShowCorrectLetters )
    {
        CAB_ForRowLetterShowCheckSquare(iRow, iLetter, "Check", g_TC_cCodeMeaning_HasFocus)
        Status_Check(false);
        StoreCookie_Puzzle()
    }
    if ( g_bSettings_CAGR_Answers_CheckRow )
    {
        var iLength = CAB_ForRow_GetLength(iRow);
        if ( iLetter == iLength - 1)
        {
            CAB_ShowCheckAnswerActiveRow('Check');
            Status_Check(false);
            StoreCookie_Puzzle();
        }
    }
// now we need to deal with the the entire row or letter to get the images right
    CAB_ForRow_SetToActive(iRow, iLetter);
}

function CAB_onmousedown(iRow, iLetter)
{
    return true;
}

function CAB_onkeypress(event)
{
    if ( g_bIsYourMove && g_bAnswersSolved )
        return;    
    var ekey = event.key;
    if ( ( ekey >= 'a' && ekey <= 'z' ) || ( ekey >= 'A' && ekey <= 'Z') || ekey == ' ')
        return true; // so character will be processed
    if ( event.code == 8 || event.code == 46 )
        return false;
    return false;
}

function CAB_onkeyup(key, iRow, iLetter)
{
    if ( g_bIsYourMove && g_bAnswersSolved )
        return;    
    if ( key.startsWith('Backspace') )
    {
        key = ' ';
    }
    var letters = /^[a-zA-Z ]$/;
    if ( key.match(letters) ) 
    {
        var sUpper = key.toUpperCase();
        CAB_ForRowLetter_DoItAll(sUpper, iRow, iLetter);
        CAB_SetFocusToNext(iRow, iLetter);
        return true;
    }
    // trap the arrow keys
    if ( CAB_HandleArrowKeys(key, iRow, iLetter) )
        return;
    return false;
}

function CAB_onfocus(elem)
{
    if ( g_bIsYourMove&& g_bAnswersSolved )
        return;    
    var sThisId = elem.id;
    if ( g_GRB_Focus_sId != '')        
        GRB_FocusLostSetActiveToInActive();
    if ( g_SA_EB_Focus_sId != '' )
        TC_SA_EB_LoseTheFocusAndCleanup(false)
    var iThisRow        = CAB_RowFromId(sThisId);
    var iThisCharacter  = CAB_LetterFromId(sThisId);
    CAB_ForRow_SetToActive(iThisRow, iThisCharacter);
    if ( g_CAB_Focus_sId != '' )
    {    
        var iOldRow = CAB_RowFromId(g_CAB_Focus_sId);
        if ( iThisRow != iOldRow )
        { // need to change the old row to inactive
            if ( ( iThisRow == 0 && iOldRow == 1 ) || ( iThisRow == 1 && iOldRow == 0 ) )
            {
                CAB_ForRow_SetToInactive(iOldRow);
            }
            else
                CAB_ForRow_SetToInactive(iOldRow);
        }
    }
    g_CAB_Focus_sId = sThisId;
    if ( g_bIsTwistiCross )
        CAB_ForRowWithFocus_SetAnswerBoxStyles();
    else if ( g_bIsYourMove )
        GRBMS_ForRowWithFocus_SetAnswerBoxStyles();
    if ( g_GRBMS_Focus_sId != '')
        GRBMS_LoseCurrentFocus();
    KB_SetUsageMode(g_KB_Mini_sUsageMode_DualClue);
// set background color to blue
    CAB_SetBackground(true);
    return true;
}

function CAB_SetBackground(bActive)
{
    let elemFrame = document.getElementById("GRBMS_Div_CAB_DualClue");
    if ( bActive )
        elemFrame.style.backgroundColor = g_Color_sAbvocabBlue;
    else
        elemFrame.style.backgroundColor = 'white';
}


