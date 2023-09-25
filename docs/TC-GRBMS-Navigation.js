// TC-GRBMS-Navigation.js

var g_GRB_bAcross = true;
var g_GRB_ActiveId_sAcross = '';
var g_GRB_ActiveId_sDown = '';

function GRB_ClearOldActiveRow(sId)
{
    if ( sId == '' )
        return;
    if ( g_GRB_ActiveId_sAcross == '' )
        return;
    let iRow_Old = GRB_RowFromId(g_GRB_ActiveId_sAcross)
    for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter ++ )
        GRB_ForRowLetter_SetButton(iRow_Old, iLetter, g_cCode_Inactive);
    g_GRB_ActiveId_sAcross = '';
}

function GRB_ClearOldActiveColumn(sId)
{
    if ( sId == '' )
        return;
    if ( g_GRB_ActiveId_sDown == '' )
        return;
    let iLetter_Old = GRB_LetterFromId(g_GRB_ActiveId_sDown);
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++ )
        GRB_ForRowLetter_SetButton(iRow, iLetter_Old, g_cCode_Inactive);
    g_GRB_ActiveId_sDown = '';
}

function GRB_DirectionControl(sId)
{
    if ( sId == g_GRB_Focus_sId )
    {
        g_GRB_bAcross = !g_GRB_bAcross;
        GRB_ClearOldActiveRow(g_GRB_Focus_sId);
        GRB_ClearOldActiveColumn(g_GRB_Focus_sId);
    }
}

function GRB_SetActiveRow(sId)
{
    GRB_ClearOldActiveRow(sId)
    GRB_ClearOldActiveColumn(sId)
    g_GRB_ActiveId_sAcross = sId;
    let iRow_Focus = GRB_RowFromId(sId);
    let iLetter_Focus = GRB_LetterFromId(sId);
    for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
    {
        let cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow_Focus, iLetter);
        if ( iLetter == iLetter_Focus )
            GRB_ForRowLetter_SetButton(iRow_Focus, iLetter, g_cCode_HasFocus);
        else if ( !TC_IsGoldenOrBlackSquare(cStatus) )
            GRB_ForRowLetter_SetButton(iRow_Focus, iLetter, g_cCode_ActiveRow);
    }
}

function GRB_SetActiveLetter(sId)
{
    GRB_ClearOldActiveRow(sId)
    GRB_ClearOldActiveColumn(sId)
    g_GRB_ActiveId_sDown = sId;
    let iRow_Focus = GRB_RowFromId(sId);
    let iLetter_Focus = GRB_LetterFromId(sId);
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        let cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter_Focus);
        if ( iRow == iRow_Focus )
            GRB_ForRowLetter_SetButton(iRow, iLetter_Focus, g_cCode_HasFocus);
        else if ( !TC_IsGoldenOrBlackSquare(cStatus) )
            GRB_ForRowLetter_SetButton(iRow, iLetter_Focus, g_cCode_ActiveRow);
    }
}

function GRB_MoveToNextAvailable(iRow, iLetter)
{
    if ( g_GRB_bAcross )
        GRB_NextSquare_Across(iRow, iLetter)
    else
        GRB_NextSquare_Down(iRow, iLetter);
    let iRowNext = GRB_RowFromId(g_GRB_Focus_sId)
    let iLetterNext = GRB_LetterFromId(g_GRB_Focus_sId)
}

function GRB_NextSquare_Across(iRow, iLetter)
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
        GRB_onfocus(document.getElementById(GRB_MakeId(iRow_New, iLetter_New)));
    }
    else
    { // best we can do is to lose focus
        GRB_LoseCurrentFocus();
    }
}

function GRB_NextSquare_Down(iRow, iLetter)
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
        GRB_onfocus(document.getElementById(GRB_MakeId(iRow_New, iLetter_New)));
        return;
    }
// best we can do is to lose focus
    GRB_LoseCurrentFocus();
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
    return true;
}

