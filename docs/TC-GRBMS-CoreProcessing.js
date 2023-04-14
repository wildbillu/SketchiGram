// TC-GRBMS-CoreProcessing.js

function GRBMS_LoseCurrentFocus()
{
    if ( g_GRBMS_Focus_sId == '')
        return;
    let iRow = GRBMS_RowFromId(g_GRBMS_Focus_sId);
    let iLetter = GRBMS_LetterFromId(g_GRBMS_Focus_sId);
    GRBMS_ForRowLetter_SetButton(iRow, iLetter, g_cCode_Inactive);
    let elem = document.getElementById(g_GRBMS_Focus_sId);
    elem.style.cursor="default";
    let elemWithFocus = document.getElementById(g_GRBMS_Focus_sId);
    elemWithFocus.blur();
    g_GRBMS_Focus_sId = '';
}

function GRBMS_onkeyup(key, iRow, iLetter)
{
    if ( key.startsWith('Backspace') )
        key = ' ';
    let letters = /^[a-zA-Z]$/;
    if ( !key.match(letters) ) 
        return false;
    if ( g_GRBMS_Focus_sId == '' )
        return false;
    let sUpper = key.toUpperCase();
// first determine if key is valid
    let bValidLetter = g_GRBMS_sAllowedGridLetters.includes(sUpper);
    if ( !bValidLetter )
    { // set focus back to this so if 
        TC_ResultMessage_DisplayForInterval(sUpper + ' Is Nowhere in the Puzzle', g_ResultMessage_sStyle_Warning, 1, 3);
        document.getElementById(g_GRBMS_Focus_sId).focus();
        return false;
    }
// now reject if same as square with focus
    let sAnswerSquareWithFocus = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    if ( sUpper == sAnswerSquareWithFocus )
        bValidLetter = false;
    if ( !bValidLetter )
    {
        alert('invalidkeyup')
        KB_Mini_SetInstructionLine('');  
        GRBMS_ForRowLetter_SetButton(iRow, iLetter, g_cCode_Inactive);
        g_GRBMS_Focus_sId = '';
        SyncTo_OthersLoseFocus('GR');
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
    g_GRBMS_Focus_sId = '';
    Status_Check(false);
    SyncTo_OthersLoseFocus('GR')
    return false;
}

function GRBMS_ReplaceAt(cLetter, iRow, iLetter)
{
    if  (! GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
        return 'Not Valid For Focus/Change'
    var bValidLetter = g_GRBMS_sAllowedGridLetters.includes(cLetter);
    if ( !bValidLetter )
    {
        KB_Mini_SetInstructionLine('');   
        return 'letter (' + cLetter + ' ) not in grid'
    }
// now reject if same as square with focus
    var cAnswerThisSquare = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    if ( cLetter == cAnswerThisSquare )
    {
        KB_Mini_SetInstructionLine('');   
        return 'Letter Same as Exising';
    }
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
    KB_Mini_SetInstructionLine('');   
    Status_Check();
    Sync_GridChange();
    return 'exchanged';
}

function GRBMS_onfocus(elem)
{
    let sThisId = elem.id;
    let iThisRow     = GRBMS_RowFromId(sThisId);
    let iThisLetter  = GRBMS_LetterFromId(sThisId);
    if ( !GRB_ForRowLetter_IsSquareValidForFocus(iThisRow, iThisLetter) )
        return;
//    SyncTo_OthersLoseFocus('GR');
    g_GRBMS_Focus_sId = sThisId;
}    

function GRBMS_onkeypress(event)
{
    return false;
}

function GRBMS_ReplaceMeReturnFoundId(iRow, iLetter, cReplaceMe, bRejectDual)
{
    let cNow = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    var sFoundId = GRBMS_FindFirstSquareWithPlayerAnswer(cReplaceMe, bRejectDual, cNow);
    if ( sFoundId == '')
        return sFoundId;
    let B_iRow = GRBMS_RowFromId(sFoundId);
    let B_iLetter = GRBMS_LetterFromId(sFoundId);
    GRBMS_SwitchAnswers(iRow, iLetter, B_iRow, B_iLetter);
    return sFoundId;
}
