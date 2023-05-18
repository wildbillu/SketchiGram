// TC-GRBMS-Navigation.js

var g_GRBMS_bAcross = true;
var g_GRBMS_ActiveId_sAcross = '';
var g_GRBMS_ActiveId_sDown = '';

function GRBMS_ClearOldActiveRow(sId)
{
    if ( sId == '' )
        return;
    if ( g_GRBMS_ActiveId_sAcross == '' )
        return;
    let iRow_Old = GRBMS_RowFromId(g_GRBMS_ActiveId_sAcross)
    for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter ++ )
        GRBMS_ForRowLetter_SetButton(iRow_Old, iLetter, g_cCode_Inactive);
    g_GRBMS_ActiveId_sAcross = '';
}

function GRBMS_ClearOldActiveColumn(sId)
{
    if ( sId == '' )
        return;
    if ( g_GRBMS_ActiveId_sDown == '' )
        return;
    let iLetter_Old = GRBMS_LetterFromId(g_GRBMS_ActiveId_sDown);
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++ )
        GRBMS_ForRowLetter_SetButton(iRow, iLetter_Old, g_cCode_Inactive);
    g_GRBMS_ActiveId_sDown = '';
}

function GRBMS_DirectionControl_Button(sId)
{
    if ( sId == g_GRBMS_Focus_sId )
    {
        g_GRBMS_bAcross = !g_GRBMS_bAcross;
        GRBMS_ClearOldActiveRow(g_GRBMS_Focus_sId);
        GRBMS_ClearOldActiveColumn(g_GRBMS_Focus_sId);
    }
}


function GRBMS_DirectionControl(sId)
{
    if ( sId == g_GRBMS_Focus_sId )
    {
        g_GRBMS_bAcross = !g_GRBMS_bAcross;
        GRBMS_ClearOldActiveRow(g_GRBMS_Focus_sId);
        GRBMS_ClearOldActiveColumn(g_GRBMS_Focus_sId);
    }
}

function GRBMS_SetActiveRow(sId)
{
    GRBMS_ClearOldActiveRow(sId)
    GRBMS_ClearOldActiveColumn(sId)
    g_GRBMS_ActiveId_sAcross = sId;
    let iRow_Focus = GRBMS_RowFromId(sId);
    let iLetter_Focus = GRBMS_LetterFromId(sId);
    for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
    {
        let cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow_Focus, iLetter);
        if ( iLetter == iLetter_Focus )
            GRBMS_ForRowLetter_SetButton(iRow_Focus, iLetter, g_cCode_HasFocus);
        else if ( !TC_IsGoldenOrBlackSquare(cStatus) )
            GRBMS_ForRowLetter_SetButton(iRow_Focus, iLetter, g_cCode_ActiveRow);
    }
}

function GRBMS_SetActiveColumn(sId)
{
    GRBMS_ClearOldActiveRow(sId)
    GRBMS_ClearOldActiveColumn(sId)
    g_GRBMS_ActiveId_sDown = sId;
    let iRow_Focus = GRBMS_RowFromId(sId);
    let iLetter_Focus = GRBMS_LetterFromId(sId);
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        let cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter_Focus);
        if ( iRow == iRow_Focus )
            GRBMS_ForRowLetter_SetButton(iRow, iLetter_Focus, g_cCode_HasFocus);
        else if ( !TC_IsGoldenOrBlackSquare(cStatus) )
            GRBMS_ForRowLetter_SetButton(iRow, iLetter_Focus, g_cCode_ActiveRow);
    }
}

function GRBMS_MoveToNextAvailable(iRow, iLetter)
{
    if ( g_GRBMS_bAcross )
        GRBMS_NextSquare_Across(iRow, iLetter)
    else
        GRBMS_NextSquare_Down(iRow, iLetter);
    let iRowNext = GRBMS_RowFromId(g_GRBMS_Focus_sId)
    let iLetterNext = GRBMS_LetterFromId(g_GRBMS_Focus_sId)
    let cLetterOfNextSquare = GRB_ForRowLetter_GetAnswerPlayer(iRowNext, iLetterNext)
    KB_Mini_SetInstructionLine(cLetterOfNextSquare);

}

function GRBMS_NextSquare_Across(iRow, iLetter)
{
    let iRow_New = iRow;
    let iLetter_New = iLetter;
    let bFoundAvailableNext = false;
    let iNumberChecked = 0;
    let iNumberToCheck = g_iGridHeight*g_iGridWidth;
    while ( !bFoundAvailableNext && iNumberChecked < iNumberToCheck )
    {
        iLetter_New++;
        if ( iLetter_New == g_iGridWidth ) {iRow_New++; iLetter_New = 0;}
        if ( iRow_New == g_iGridHeight ) {iRow_New = 0; iLetter_New = 0;}
        if ( GRB_ForRowLetter_IsSquareValidForFocus(iRow_New, iLetter_New ) )
            bFoundAvailableNext = true;
        iNumberChecked++;
    }
    if ( bFoundAvailableNext )
    {
        GRBMS_onfocus(document.getElementById(GRBMS_MakeId(iRow_New, iLetter_New)));
    }
    else
    { // best we can do is to lose focus
        GRBMS_LoseCurrentFocus();
    }
}

function GRBMS_NextSquare_Down(iRow, iLetter)
{
    let iRow_New = iRow;
    let iLetter_New = iLetter;
    let bFoundAvailableNext = false;
    let iNumberChecked = 0;
    let iNumberToCheck = g_iGridHeight*g_iGridWidth;
    while ( !bFoundAvailableNext && iNumberChecked < iNumberToCheck )
    {
        iRow_New++;
        if ( iRow_New == g_iGridHeight ) {iRow_New = 0; iLetter_New++; }
        if ( iLetter_New == g_iGridWidth ) {iRow_New = 0; iLetter_New = 0; }
        if ( GRB_ForRowLetter_IsSquareValidForFocus(iRow_New, iLetter_New ) )
            bFoundAvailableNext = true;
        iNumberChecked++;
    }
    if ( bFoundAvailableNext )
    {
        GRBMS_onfocus(document.getElementById(GRBMS_MakeId(iRow_New, iLetter_New)));
        return;
    }
// best we can do is to lose focus
    GRBMS_LoseCurrentFocus();
}

function GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter)
{
    let cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
        return false;
    if ( GRB_ForRowLetter_IsGoldenSquare(iRow, iLetter) )
        return false;
    if ( TC_IsCorrected(cStatus) )
        return false;
    if ( !g_bAllowCorrectLettersToChange )
    {
        if ( GRB_ForRowLetter_IsPlayerAnswerCorrect(iRow, iLetter) )
            return false;
    }
    return true;
}

