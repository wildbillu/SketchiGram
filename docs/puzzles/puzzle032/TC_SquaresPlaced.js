// TC_SquaresPlaced.js

var g_SquaresPlaced_sStatus = '';
var g_SquaresPlaced_cSet   = 'S';
var g_SquaresPlaced_cUnSet = 'U';

function TC_SquaresPlaced_Initialize()
{
    g_SquaresPlaced_sStatus = '';
    for ( let i = 0; i < g_iGridWidth * g_iGridHeight; i++ )
        g_SquaresPlaced_sStatus += g_SquaresPlaced_cUnSet;
}

function TC_SquaresPlaced_Set(iRow, iLetter)
{
    let iIndex = iRow * g_iGridWidth + iLetter;
}

function TC_SquaresPlaced_Unset(iRow, iLetter)
{
    let iIndex = iRow * g_iGridWidth + iLetter;
    
}