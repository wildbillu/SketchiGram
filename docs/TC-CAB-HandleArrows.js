// TC-CAB-HandleArrows.js

function CAB_HandleArrowKeys(key, iRow, iLetter)
{
    if ( !key.startsWith('Arrow') )
        return false;
    if ( key.match('Up') )
    {
        var iNewRow = iRow - 1;
        if ( iNewRow < 0 )
            iNewRow = g_CAB_iClues - 1;
        var iNewLetter = iLetter;
        var iLengthOfNewRow = CAB_ForRow_GetLength(iNewRow);
        if ( iNewLetter > iLengthOfNewRow - 1 )
             iNewLetter = iLengthOfNewRow - 1;
             CAB_MoveFocus(iNewRow, iNewLetter);
        return true;
    }
    if ( key.match('Down') )
    {
        var iNewRow = iRow + 1;
        if ( iNewRow > g_CAB_iClues - 1 )
            iNewRow = 0;
        var iLengthNewRow = CAB_ForRow_GetLength(iNewRow);
        var iNewLetter = iLetter;
        if ( iNewLetter > iLengthNewRow - 1)
            iNewLetter = iLengthNewRow - 1;
        CAB_MoveFocus(iNewRow, iNewLetter);
        return true;
    }
    if ( key.match('Right') )
    {
        var sNext = CAB_RowLetterNext(iRow, iLetter);
        CAB_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
        return true;
    }
    var sNext = CAB_RowLetterPrevious(iRow, iLetter);
    CAB_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
    return true;
}

