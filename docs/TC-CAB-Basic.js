// TC-CAB-Basic.js



function CAB_FocusLostSetActiveToInActive()
{
    if ( g_CAB_Focus_sId == '' )
        return;
    var iRow = CAB_RowFromId(g_CAB_Focus_sId);
    CAB_ForRow_SetToInactive(iRow);
    g_CAB_Focus_sId = '';
    if ( g_bIsTwistiCross )
        CAB_ForRowWithFocus_SetAnswerBoxStyles();
    else if ( g_bIsYourMove )
        GRBMS_ForRowWithFocus_SetAnswerBoxStyles();
}

function CAB_ForRow_SetToInactive(iRow)
{
    var iLength = g_aAnswers[iRow].length;
    for (var iL = 0; iL < iLength; iL++ )
    {
        CAB_ForRowLetter_SetButton(iRow, iL, g_TC_cCodeMeaning_Inactive)
    }
}

function CAB_ForRow_SetToActive(iRow, iActiveLetter)
{
    var iLength = g_aAnswers[iRow].length;
    for (var iL = 0; iL < iLength; iL++ )
    {
        if ( iL == iActiveLetter)
            CAB_ForRowLetter_SetButton(iRow, iL, g_TC_cCodeMeaning_HasFocus)
        else
            CAB_ForRowLetter_SetButton(iRow, iL, g_TC_cCodeMeaning_ActiveRow)

    }
}

function CAB_MakeId(iRow, iLetter)
{
    var s = 'CAB_' + iRow + '_' + iLetter   
    return s;
}

function CAB_LetterFromId(sid)
{
    return parseInt(sid.charAt(6));
}

function CAB_RowFromId(sid)
{
    return parseInt(sid.charAt(4));
}

function CAB_MakeHTMLId(iRow, iLetter)
{
    var s = 'Id="' + CAB_MakeId(iRow, iLetter) + '" ';
    return s;
}
