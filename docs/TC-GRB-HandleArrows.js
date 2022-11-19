// TC-GRB-HandleArrows.js

function GRB_HandleArrows(key, iRow, iLetter)
{
    if ( !key.startsWith('Arrow') )
        return false;
    if ( key.match('Up') )
    {
        var sNext = GRB_GoUpToNext(iRow, iLetter);
        GRB_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
        return true;
    }
    if ( key.match('Down') )
    {
        var sNext = GRB_GoDownToNext(iRow, iLetter);
        GRB_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
        return true;
    }
    if ( key.match('Right') )
    {
        var sNext = GRB_GoRightToNext(iRow, iLetter);
// unless the current row is 0 we want to move the focus to the previous row with the same letter
        GRB_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
        return true;
    }
    var sNext = GRB_GoLeftToNext(iRow, iLetter);
// unless the current row is 0 we want to move the focus to the previous row with the same letter
    GRB_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
    return true;
}

function GRB_GoUpToNext(iRow, iLetter)
{
    var iNewLetter = iLetter;
    var iNewRow = iRow - 1;
    if ( iNewRow < 0 )
        iNewRow = g_iGridHeight - 1;
    if ( !GRB_ForRowLetter_IsSquareValidForFocus(iNewRow, iNewLetter) )
    {
        return GRB_GoUpToNext(iNewRow, iNewLetter);
    }
    var s = iNewRow.toString() + iNewLetter.toString();
    return s;
}

function GRB_GoDownToNext(iRow, iLetter)
{
    var iNewLetter = iLetter;
    var iNewRow = iRow + 1;
    if ( iNewRow > g_iGridHeight - 1 )
    {
        iNewRow = 0;
    }        
    if ( !GRB_ForRowLetter_IsSquareValidForFocus(iNewRow, iNewLetter) )
    {
        return GRB_GoDownToNext(iNewRow, iNewLetter);
    }
    var s = iNewRow.toString() + iNewLetter.toString();
    return s;
}

function GRB_GoLeftToNext(iRow, iLetter)
{
    var iNewRow = iRow;
    var iNewLetter = iLetter - 1;
    if ( iNewLetter < 0 )
        iNewLetter = g_iGridWidth - 1;
    if ( !GRB_ForRowLetter_IsSquareValidForFocus(iNewRow, iNewLetter) )
    {
        return GRB_GoLeftToNext(iNewRow, iNewLetter);
    }
    var s = iNewRow.toString() + iNewLetter.toString();
    return s;
}

function GRB_GoRightToNext(iRow, iLetter)
{
    var iNewRow = iRow;
    var iNewLetter = iLetter + 1;
    if ( iNewLetter >= g_iGridWidth )
        iNewLetter = 0;
    if ( GRB_ForRowLetter_isThisSquareABlackSquare(iNewRow, iNewLetter) )
    {
        return GRB_GoRightToNext(iNewRow, iNewLetter);
    }
    var s = iNewRow.toString() + iNewLetter.toString();
    return s;
}
