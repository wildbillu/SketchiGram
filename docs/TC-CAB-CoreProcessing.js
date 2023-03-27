// TC-CAB-CoreProcessing.js

function CAB_SquareValidForFocus(iRow, iLetter)
{
    let cStatus = CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cStatus == g_cCode_Corrected || cStatus == g_cCode_Correct )
        return false;
    return true;
}

function CAB_onfocus(elem)
{
    let sThisId = elem.id;
    if ( g_GRBMS_Focus_sId != '')
        GRBMS_LoseCurrentFocus();
    if ( g_SA_EB_Focus_sId != '' )
        TC_SA_EB_LoseTheFocusAndCleanup(false)
    let iThisRow        = CAB_RowFromId(sThisId);
    let iThisLetter  = CAB_LetterFromId(sThisId);
    if ( !CAB_SquareValidForFocus(iThisRow, iThisLetter) )
        return;
    CAB_ForRow_SetToActive(iThisRow, iThisLetter);
    if ( g_CAB_Focus_sId != '' )
    {    
        let iOldRow = CAB_RowFromId(g_CAB_Focus_sId);
        if ( iThisRow != iOldRow )
        { // need to change the old row to inactive
            if ( ( iThisRow == 0 && iOldRow == 1 ) || ( iThisRow == 1 && iOldRow == 0 ) )
            {
                if ( TC_ForIndexIsClueTypeSpecial(iOldRow) ) CAB_ForRow_SetToInactive(iOldRow);
            }
            else
            if ( TC_ForIndexIsClueTypeSpecial(iOldRow) )CAB_ForRow_SetToInactive(iOldRow);
        }
    }
    g_CAB_Focus_sId = sThisId;
    KB_SetUsageMode(g_KB_Mini_sUsageMode_DualClue);
    CAB_SetBackground(true);
    Sync_FocusChange();
    return true;
}


function CAB_MoveFocus(iNewRow, iNewLetter)
{
    if ( iNewRow > 1 )
    {
        iNewRow = 0;
        iNewLetter = 0;
    }
    if ( iNewRow == 0 && !TC_ForIndexIsClueTypeSpecial(0) )
        return;
    if ( iNewRow == 1 && !TC_ForIndexIsClueTypeSpecial(1))
        return;
    if ( iNewRow == -1 )
        return;
//   
    let sNextBox = CAB_MakeId(iNewRow, iNewLetter);
    CAB_onfocus(document.getElementById(sNextBox));
    Sync_FocusChange()
}

function CAB_SetFocusToNext(iRow, iLetter)
{
    let iLength = CAB_ForRow_GetLength(iRow);
    let bLastLetter = CAB_ForRowLetter_IsLastLetter(iRow, iLetter);
    if ( !bLastLetter && g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares )
    {
        for (let  iL = iLetter + 1; iL < iLength; iL++)
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
        for ( let iL = 0; iL < iLength; iL++)
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
    let cInitialStatus = CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( TC_CorrectOrGolden(cInitialStatus) ) 
        return; // if correct already don't allow change and nothing else to do
    CAB_ForRowLetter_SetAnswerPlayer(cAnswerPlayer, iRow, iLetter);
//    
    if ( cInitialStatus == g_cCode_Incorrect || cInitialStatus == g_cCode_IncorrectWithOverride)
    { // since a letter was typed we no longer know it is incorrect so set back to Normal
        CAB_ForRowLetter_SetStatusPlayer(g_cCode_Normal, iRow, iLetter);
    }
    if ( g_bSettings_CAGR_Answers_ShowCorrectLetters )
    {
        CAB_ForRowLetterShowCheckSquare(iRow, iLetter, "Check", g_cCode_HasFocus)
        Status_Check(false);
        StoreCookie_Puzzle()
    }
    if ( g_bSettings_CAGR_Answers_CheckRow )
    {
        let iLength = CAB_ForRow_GetLength(iRow);
        if ( iLetter == iLength - 1)
        {
            CAB_ShowCheckAnswerActiveRow('Check');
            Status_Check(false);
            StoreCookie_Puzzle();
        }
    }
// now we need to deal with the the entire row or letter to get the images right
    CAB_ForRow_SetToActive(iRow, iLetter);
    Sync_FocusChange();
    Sync_CAChange();
}

function CAB_onmousedown(iRow, iLetter)
{
    return true;
}

function CAB_onkeypress(event)
{
    let ekey = event.key;
    if ( ( ekey >= 'a' && ekey <= 'z' ) || ( ekey >= 'A' && ekey <= 'Z') || ekey == ' ')
        return true; // so character will be processed
    if ( event.code == 8 || event.code == 46 )
        return false;
    return false;
}

function CAB_onkeyup(key, iRow, iLetter)
{
    if ( key.startsWith('Backspace') )
       return;
    let letters = /^[a-zA-Z ]$/;
    if ( key.match(letters) ) 
    {
        let sUpper = key.toUpperCase();
        let bValidLetter = g_GRBMS_sAllowedGridLetters.includes(sUpper);
        if ( !bValidLetter )
        { // set focus back to this so if 
            TC_ResultMessage_DisplayForInterval(sUpper + ' Is Nowhere in the Puzzle', g_ResultMessage_sStyle_Warning, 1, 3);
            document.getElementById(g_CAB_Focus_sId).focus();
            return false;
        }
        CAB_ForRowLetter_DoItAll(sUpper, iRow, iLetter);
        let sMessage = CAB_CheckForCorrectAnswer();
        if ( sMessage != '' ) TC_ResultMessage_DisplayForInterval(sMessage, g_ResultMessage_sStyle_Positive, 2, 3);
        CAB_SetFocusToNext(iRow, iLetter);
        return true;
    }
    // trap the arrow keys
    if ( CAB_HandleArrowKeys(key, iRow, iLetter) )
        return;
    return false;
}


function CAB_SetBackground(bActive)
{
    let elemFrame = document.getElementById("SpecialClue_Div");
    if ( bActive )
        elemFrame.style.backgroundColor = g_Color_sAbvocabBlue;
    else
        elemFrame.style.backgroundColor = 'white';
}


