// TC-SquaresPlaced.js

var g_SquaresPlaced_sStatus = '';
var g_SquaresPlaced_cSet    = 'S';
var g_SquaresPlaced_cUnset  = 'U';

function TC_SquaresPlaced_Initialize()
{
    g_SquaresPlaced_sStatus = '';
    let iSquares = g_iGridWidth * g_iGridHeight
    for ( let i = 0; i < iSquares; i++ )
        g_SquaresPlaced_sStatus += g_SquaresPlaced_cUnset;
    return g_SquaresPlaced_sStatus;
}

function TC_SquaresPlaced_Set(iRow, iLetter)
{
    let iIndex = iRow * g_iGridWidth + iLetter;
    g_SquaresPlaced_sStatus = replaceAt(g_SquaresPlaced_sStatus, iIndex, g_SquaresPlaced_cSet)
}

function TC_SquaresPlaced_Unset(iRow, iLetter)
{
    let iIndex = iRow * g_iGridWidth + iLetter;    
    g_SquaresPlaced_sStatus = replaceAt(g_SquaresPlaced_sStatus, iIndex, g_SquaresPlaced_cUnset)
}

function TC_SquaresPlaced_IsSet(iRow, iLetter)
{
    let iIndex = iRow * g_iGridWidth + iLetter;    
    if ( g_SquaresPlaced_sStatus.charAt(iIndex) == g_SquaresPlaced_cSet )
        return true;
    return false;
}
