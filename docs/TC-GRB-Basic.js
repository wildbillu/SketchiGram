// TC-GRB-Basic.js
function GRB_ForRowLetter_IsSquareGoldenOrBlack(iRow, iLetter)
{
    if ( GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
        return true;
    if ( GRB_ForRowLetter_IsGoldenSquare(iRow, iLetter) )
        return true;
    return false;
}

function GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter)
{
    if ( GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
        return false;
    if ( GRB_ForRowLetter_IsGoldenSquare(iRow, iLetter) )
        return false;
    if ( GRB_ForRowLetter_IsPlayerAnswerCorrect(iRow, iLetter) )
        return false;
    if ( GRB_ForRowLetter_IsPlayerAnswerCorrected(iRow, iLetter) )
        return false;
    return true;
}

function GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter)
{
    var cAnswerPlayer = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
    if ( cAnswerPlayer == g_TC_cCharacterDenotingBlackSquare )
        return true;
    return false;
}

function GRB_ForRowLetter_IsGoldenSquare(iRow, iLetter)
{
    if ( GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter) == g_TC_cCodeMeaning_Golden )
        return true;
    return false;
}

function GRB_ForRowLetter_IsPlayerAnswerCorrected(iRow, iLetter)
{
    let cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cStatus == g_TC_cCodeMeaning_Corrected )
        return true;
    return false;
}

function GRB_ForRowLetter_IsPlayerAnswerCorrect(iRow, iLetter)
{
    if ( GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter) == g_TC_cCodeMeaning_Correct )
        return true;
    return false;
}


function GRB_ForLetter_SetToInactive(iLetter)
{
    for (var iR = 0; iR < g_iGridWidth; iR++ )
    {
        GRB_ForRowLetter_SetButton(iR, iLetter, g_TC_cCodeMeaning_Inactive)
    }
}

function GRB_ForRow_SetToInactive(iRow)
{
    for (var iL = 0; iL < g_iGridWidth; iL++ )
    {
        GRB_ForRowLetter_SetButton(iRow, iL, g_TC_cCodeMeaning_Inactive)
    }
}

function GRB_ForRow_SetToActive(iRow, iActiveLetter)
{
    for (var iL = 0; iL < g_iGridWidth; iL++ )
    {
        if ( iL == iActiveLetter)
            GRB_ForRowLetter_SetButton(iRow, iL, g_TC_cCodeMeaning_HasFocus)
        else
            GRB_ForRowLetter_SetButton(iRow, iL, g_TC_cCodeMeaning_ActiveRow)
    }
}
function GRB_ForLetter_SetToActive(iActiveRow, iLetter)
{
    for (var iR = 0; iR < g_iGridWidth; iR++ )
    {
        if ( iR == iActiveRow )
            GRB_ForRowLetter_SetButton(iR, iLetter, g_TC_cCodeMeaning_HasFocus)
        else
            GRB_ForRowLetter_SetButton(iR, iLetter, g_TC_cCodeMeaning_ActiveRow)
    }
}

function GRB_FocusLostSetActiveToInActive()
{
    if ( g_GRB_Focus_sId == '' )
        return;
    if ( g_GRB_bAcross )
    {
        var iRow = GRB_RowFromId(g_GRB_Focus_sId);
        GRB_ForRow_SetToInactive(iRow);
    }
    else
    {
        var iLetter = GRB_LetterFromId(g_GRB_Focus_sId);
        GRB_ForLetter_SetToInactive(iLetter);
    }
    g_GRB_Focus_sId = '';
}




function GRB_MakeId(iRow, iLetter)
{
    var s = 'GRBID_' + iRow + '_' + iLetter   
    return s;
}

function GRB_LetterFromId(sid)
{
    return parseInt(sid.charAt(8));
}

function GRB_RowFromId(sid)
{
    return parseInt(sid.charAt(6));
}

function GRB_MakeHTMLId(iRow, iLetter)
{
    var s = 'Id="' + GRB_MakeId(iRow, iLetter) + '" ';
    return s;
}
