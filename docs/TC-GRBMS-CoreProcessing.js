// TC-GRBMS-CoreProcessing.js

function GRBMS_ReplaceAt(cLetter, iRow, iLetter)
{
    if  (! GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
        return 'Not Valid For Focus/Change'
    var bValidLetter = g_GRBMS_sAllowedGridLetters.includes(cLetter);
    if ( !bValidLetter )
        return 'letter (' + cLetter + ' ) not in grid'
// now reject if same as square with focus
    var cAnswerThisSquare = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    if ( cLetter == cAnswerThisSquare )
        return 'Letter Same as Exising';
// we want to switch with square that has iLetter
// for now just pick first one (even if more than one)
    var bRejectDoubleSwap = true;
    let cLetterOfSquareBeingReplaced = GRB_ForRowLetter_GetAnswer(iRow, iLetter)
    var sFoundId = GRBMS_FindFirstSquareWithPlayerAnswer(cLetter, bRejectDoubleSwap, cLetterOfSquareBeingReplaced);
    if ( sFoundId == '' )
        return 'NoValidChoiceFor:' + cLetter
    var B_iRow = GRBMS_RowFromId(sFoundId);
    var B_iLetter = GRBMS_LetterFromId(sFoundId);
    GRBMS_SwitchAnswers(iRow, iLetter, B_iRow, B_iLetter);
    Status_Check();
    return 'exchanged';
}

function GRBMS_onfocus(elem)
{
    let sThisId = elem.id;
    if ( g_CAB_Focus_sId != '')        
        CAB_FocusLostSetActiveToInActive();
    if ( g_SA_Focus_sId != '' )
        TC_SA_LoseTheFocusAndCleanup(false)
    g_GRB_Focus_sId = sThisId;
}    

function GRBMS_onkeypress(event)
{
    return false;
}

function GRBMS_onkeyup(key, iRow, iLetter)
{
    if ( key.startsWith('Backspace') )
    {  
        key = ' ';
    }
    var letters = /^[a-zA-Z]$/;
    if ( !key.match(letters) ) 
    {
        return false;
    }
    if ( g_GRB_Focus_sId == '' )
        return false;
    var sUpper = key.toUpperCase();
// first determine if key is valid
    var bValidLetter = g_GRBMS_sAllowedGridLetters.includes(sUpper);
    if ( !bValidLetter )
    {
        TC_ResultMessage_DisplayForInterval(sUpper + ' Is Nowhere in the Grid', g_ResultMessage_sStyle_Warning, 1, 3);
        return false;
    }

// now reject if same as square with focus
    var sAnswerSquareWithFocus = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    if ( sUpper == sAnswerSquareWithFocus )
        bValidLetter = false;
    if ( !bValidLetter )
    {
        GRBMS_ForRowLetter_SetButton(iRow, iLetter, g_TC_cCodeMeaning_Inactive);
        g_GRB_Focus_sId = '';
        return false;
    }
    // we want to switch with square that has iLetter
// for now just pick first one (even if more than one)
    var bRejectCorrectSquares = true;
    let cNow = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    let sFoundId = GRBMS_ReplaceMeReturnFoundId(iRow, iLetter, sUpper, bRejectCorrectSquares, cNow)
    if ( sFoundId == '' )
    {
        let sMessage = "All the " + sUpper + "\'s are Correctly Placed";
        TC_ResultMessage_DisplayForInterval(sMessage, g_ResultMessage_sStyle_Warning, 1, 3);
        return false;
    }
    g_GRB_Focus_sId = '';
    Status_Check(false);
    return false;
}

function GRBMS_ReplaceMeReturnFoundId(iRow, iLetter, cReplaceMe, bRejectDual)
{
    let cNow = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    var sFoundId = GRBMS_FindFirstSquareWithPlayerAnswer(cReplaceMe, bRejectDual, cNow);
    if ( sFoundId == '')
        return sFoundId;
    var B_iRow = GRBMS_RowFromId(sFoundId);
    var B_iLetter = GRBMS_LetterFromId(sFoundId);
    GRBMS_SwitchAnswers(iRow, iLetter, B_iRow, B_iLetter);
    return sFoundId;
}
