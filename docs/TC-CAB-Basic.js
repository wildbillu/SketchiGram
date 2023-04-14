// TC-CAB-Basic.js

function CAB_FocusLostSetActiveToInActive()
{
    if ( g_CAB_Focus_sId == '' )
        return;
    let iRow = CAB_RowFromId(g_CAB_Focus_sId);
    if ( TC_ForIndexIsClueTypeSpecial(iRow) ) CAB_ForRow_SetToInactive(iRow);
    g_CAB_Focus_sId = '';
    CAB_SetBackground(false)
}

function CAB_ForRow_SetToInactive(iRow)
{
    if ( !TC_ForIndexIsClueTypeSpecial(iRow) )
        return;
    let iLength = g_CAB_aAnswers[iRow].length;
    for (let iL = 0; iL < iLength; iL++ )
        CAB_ForRowLetter_SetButton(iRow, iL, g_cCode_Inactive)
}

function CAB_ForRow_SetToActive(iRow, iActiveLetter)
{
    if ( !TC_ForIndexIsClueTypeSpecial(iRow) )
        return;
    let iLength = g_CAB_aAnswers[iRow].length;
    for (let iL = 0; iL < iLength; iL++ )
    {
        if ( iL == iActiveLetter)
            CAB_ForRowLetter_SetButton(iRow, iL, g_cCode_HasFocus)
        else
            CAB_ForRowLetter_SetButton(iRow, iL, g_cCode_ActiveRow)

    }
}

function CAB_MakeId(iRow, iLetter)
{
    let s = 'CAB_' + iRow + '_' + iLetter   
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
    let s = 'Id="' + CAB_MakeId(iRow, iLetter) + '" ';
    return s;
}
