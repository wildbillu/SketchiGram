// TC-GRBMS-CoreProcessing.js


function GRBMS_onfocus(elem)
{
    let sThisId = elem.id;
    GRBMS_DirectionControl(sThisId);
    GRBMS_LoseCurrentFocus();
    let iThisRow     = GRBMS_RowFromId(sThisId);
    let iThisLetter  = GRBMS_LetterFromId(sThisId);
    if ( !GRB_ForRowLetter_IsSquareValidForFocus(iThisRow, iThisLetter) )
    {
        setlineAdd('INVALID:' + sThisId)        
        return;
    }
    GRBMS_ForRowLetter_SetButton(iThisRow, iThisLetter,  g_cCode_HasFocus);
    if ( g_GRBMS_bAcross )
        GRBMS_SetActiveRow(sThisId)
    else
        GRBMS_SetActiveColumn(sThisId)
    SyncTo_OthersLoseFocus('GR');
    g_GRBMS_Focus_sId = sThisId;
}    

function GRBMS_LoseCurrentFocus()
{
    if ( g_GRBMS_Focus_sId == '')
        return;
    GRBMS_ClearOldActiveRow(g_GRBMS_Focus_sId);
    GRBMS_ClearOldActiveColumn(g_GRBMS_Focus_sId);
    let iRow = GRBMS_RowFromId(g_GRBMS_Focus_sId);
    let iLetter = GRBMS_LetterFromId(g_GRBMS_Focus_sId);
    GRBMS_ForRowLetter_SetButton(iRow, iLetter, g_cCode_Inactive);
    let elem = document.getElementById(g_GRBMS_Focus_sId);
    elem.style.cursor="default";
    let elemWithFocus = document.getElementById(g_GRBMS_Focus_sId);
    elemWithFocus.blur();

    document.getElementById("ScratchArea_Text").style.backgroundColor = 'white';

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
        TC_ResultMessage_DisplayForInterval(true, sUpper + ' Is Nowhere in the Puzzle', g_ResultMessage_sStyle_Warning, 1, 3);
        document.getElementById(g_GRBMS_Focus_sId).focus();
        return false;
    }
// now reject if same as square with focus
    let sAnswerSquareWithFocus = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    if ( sUpper == sAnswerSquareWithFocus )
    {
        GRBMS_MoveToNextAvailable(iRow, iLetter);
        return;
    }
// we want to switch with square that has iLetter
// for now just pick first one (even if more than one)
    let cNow = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    let sFoundId = GRBMS_ReplaceMeReturnFoundId(iRow, iLetter, sUpper, !g_bAllowCorrectLettersToChange, cNow)
    if ( sFoundId == '' )
    {
        let sMessage = "All the " + sUpper + "\'s are Correctly Placed";
        TC_ResultMessage_DisplayForInterval(true, sMessage, g_ResultMessage_sStyle_Warning, 1, 3);
        return false;
    }
    g_GRBMS_Focus_sId = '';
    Status_Check(false);
    SyncTo_OthersLoseFocus('GR')
    GRBMS_MoveToNextAvailable(iRow, iLetter)
    return false;
}

function GRBMS_ReplaceAt(cLetter, iRow, iLetter)
{
    if  (! GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
        return 'Not Valid For Focus/Change'
    var bValidLetter = g_GRBMS_sAllowedGridLetters.includes(cLetter);
    if ( !bValidLetter )
    {
//        KB_Mini_SetInstructionLine('');   
        return 'letter (' + cLetter + ' ) not in grid'
    }
// now reject if same as square with focus
    var cAnswerThisSquare = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    if ( cLetter == cAnswerThisSquare )
    {
//        KB_Mini_SetInstructionLine('');   
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


function GRBMS_onkeypress(event)
{
    return false;
}

function GRBMS_WouldPlacingWithThisLetterNeedToMoveGoldenSquare(cReplaceWithMe)
{

}


function GRBMS_ReplaceMeReturnFoundId(iRow, iLetter, cReplaceWithMe, bRejectDual, cNow)
{
    if ( g_Difficulty_iLevel_Operating == g_Difficulty_iLevel_Expert ) 
    { // in this case we just check to see if the 

    }
    var sFoundId = GRBMS_FindFirstSquareWithPlayerAnswer(cReplaceWithMe, bRejectDual, cNow);
    if ( sFoundId == '')
        return sFoundId;
    let B_iRow = GRBMS_RowFromId(sFoundId);
    let B_iLetter = GRBMS_LetterFromId(sFoundId);
    GRBMS_SwitchAnswers(iRow, iLetter, B_iRow, B_iLetter);
    return sFoundId;
}
