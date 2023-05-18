// TC-Keyboard-AllGridChars-HandleKeypress.js

function KB_AGC_KeyboardPressButtonChangeDirection()
{
    if ( g_GRBMS_Focus_sId == '' )
        return;
    let elem = document.getElementById(g_GRBMS_Focus_sId)
    GRBMS_onfocus(elem)
}

function KB_AGC_KeyboardPressArrowLeft()
{
    if ( g_SA_Focus_sId )
    {
        TC_SA_Entry_AddChar('ArrowLeft')
        return;
    }
}

function KB_AGC_KeyboardPressArrowRight()
{
    if ( g_SA_Focus_sId )
    {
        TC_SA_Entry_AddChar('ArrowRight')
        return;
    }
}

function KB_AGC_KeyboardPressBackspace()
{
    if ( g_SA_Focus_sId )
    {
        TC_SA_Entry_AddChar('Backspace')
        return;
    }
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

function KB_AGC_KeyboardPress_GRBMS(keypressed)
{
    if ( g_GRBMS_Focus_sId == "")
        return false;
    iRow = GRBMS_RowFromId(g_GRBMS_Focus_sId);
    iLetter = GRBMS_LetterFromId(g_GRBMS_Focus_sId);
    GRBMS_onkeyup(keypressed, iRow, iLetter);
    SyncTo_OthersLoseFocus('GR')
    return true;
}

function KB_AGC_KeyboardPress_CAB(keypressed)
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

function KB_AGC_KeyboardPress_SA_EB(keypressed)
{
    if ( g_SA_Focus_sId == "")
        return false;
    var sCC = String.fromCharCode(8);
    if ( keypressed == sCC && !g_KB_Mini_bBackspaceEnabled )
        return true;
    TC_SA_Entry_AddChar(keypressed);
    return true;
}

function KB_AGC_KeyboardPress(iButton)
{
// if button is disabled state dont do anything
    let sId = KB_AllGridChars_MakeButtonId(iButton)
    let elem = document.getElementById(sId)
    if ( !elem )
        return;
    let sClass = elem.className;
    if ( sClass.indexOf('Disabled') != -1 )
        return;
    let cLetter = g_KB_Buttons_a_of_cLetters[iButton];
    let bPlacedCorrectly = false;//
    if ( bPlacedCorrectly && !g_KB_AGC_AllButtonsEnabled )
        return;
    g_KB_AGC_PendingPressedButton = iButton;
    if ( KB_AGC_KeyboardPress_GRBMS(cLetter) )
        return;
    if ( KB_AGC_KeyboardPress_CAB(cLetter) )
        return;
    KB_AGC_KeyboardPress_SA_EB(cLetter);
}
