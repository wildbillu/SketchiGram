// TC-GRB-CoreProcessing.js

function GRB_ForRowLetter_DoItAll(cAnswerPlayer, iRow, iLetter)
{
    var cInitialStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( TC_CorrectOrGolden(cInitialStatus) ) 
        return; // if correct already don't allow change and nothing else to do
    GRB_ForRowLetter_UpdateAnswersPlayer(cAnswerPlayer, iRow, iLetter);
//    
    if ( cInitialStatus == g_TC_cCodeMeaning_Incorrect || cInitialStatus == g_TC_cCodeMeaning_IncorrectWithOverride)
    { // since a letter was typed we no longer know it is incorrect so set back to Normal
        GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Normal, iRow, iLetter);
    }
    if ( g_bSettings_CAGR_Answers_ShowCorrectLetters )
    {
        GRB_ForRowLetterShowCheckSquare(iRow, iLetter, "Check", g_TC_cCodeMeaning_HasFocus)
        Status_Check(false);
        StoreCookie_Puzzle()
    }
    if ( g_bSettings_CAGR_Answers_CheckRow )
    {
        GRB_ShowCheckAnswerActiveRowOrColumn('Check');
        Status_Check(false);
        StoreCookie_Puzzle()
    }
// now we need to deal with the the entire row or letter to get the images right
    if ( g_GRB_bAcross )
        GRB_ForRow_SetToActive(iRow, iLetter);
    else
        GRB_ForLetter_SetToActive(iRow, iLetter);
}

function GRB_onmousedown(iRow, iLetter)
{
    var sMouseDownLocation = GRB_MakeId(iRow, iLetter)
    if ( sMouseDownLocation == g_GRB_Focus_sId )
    {
        if ( g_GRB_bAcross )
        {
            g_GRB_bAcross = false;
            GRB_ForRow_SetToInactive(iRow);
            GRB_ForLetter_SetToActive(iRow, iLetter);
        }
        else
        {
            g_GRB_bAcross = true;
            GRB_ForLetter_SetToInactive(iLetter);
            GRB_ForRow_SetToActive(iRow, iLetter);
        }
        return false;
    }
    return true;
}

function GRB_onkeypress(event)
{
    var ekey = event.key;
    if ( ( ekey >= 'a' && ekey <= 'z' ) || ( ekey >= 'A' && ekey <= 'Z') || ekey == ' ')
        return true; // so character will be processed
    if ( event.code == 8 || event.code == 46 )
        return false;
    return false;
}

function GRB_onkeyup(key, iRow, iLetter)
{
    if ( key.startsWith('Backspace') )
    {
        key = ' ';
    }
    var letters = /^[a-zA-Z ]$/;
    if ( key.match(letters) ) 
    {
        var sUpper = key.toUpperCase();
        GRB_ForRowLetter_DoItAll(sUpper, iRow, iLetter);
        GRB_SetFocusToNext(iRow, iLetter);
        return true;
    }
    // trap the arrow keys
    if ( GRB_HandleArrows(key, iRow, iLetter) )
        return true;
    setline('keydown:' + key + 'notprocessed');
    var sFixThisBox = GRB_MakeId(iRow, iLetter);
    document.getElementById(sFixThisBox).focus();
    return false;
}

function GRB_onfocus(elem)
{
    var sThisId = elem.id;
    if ( g_CAB_Focus_sId != '')        
    {
        CAB_FocusLostSetActiveToInActive();
    }
    var iThisRow        = GRB_RowFromId(sThisId);
    var iThisCharacter  = GRB_LetterFromId(sThisId);
    if ( !GRB_ForRowLetter_IsSquareValidForFocus(iThisRow, iThisCharacter) )
        return;
    // deal with changes to the new focus
    if ( g_GRB_bAcross )
        GRB_ForRow_SetToActive(iThisRow, iThisCharacter);
    else       
        GRB_ForLetter_SetToActive(iThisRow, iThisCharacter);
    if ( g_GRB_Focus_sId != '' )
    {    
        var iOldRow        = GRB_RowFromId(g_GRB_Focus_sId);
        var iOldCharacter  = GRB_LetterFromId(g_GRB_Focus_sId);        
        if ( g_GRB_bAcross )
        { // fixing to oldrows
            if ( iThisRow != iOldRow)
                GRB_ForRow_SetToInactive(iOldRow)
        }
        else
        { // fixing to oldcolumns
            if ( iThisCharacter != iOldCharacter)
                GRB_ForLetter_SetToInactive(iOldCharacter);
        }
    }
    g_GRB_Focus_sId = sThisId;
    return true;
}


