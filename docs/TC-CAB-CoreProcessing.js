// TC-CAB-CoreProcessing.js

function CAB_MouseOver(e)
{
}

function CAB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter)
{
    let cStatus = CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cStatus == g_cCode_Corrected )
            return false;
    if ( cStatus == g_cCode_Golden)
        return false;
    return true;
}

function CAB_onfocus(elem)
{
    if ( g_bPuzzleSolved )
        return;
    let sThisId = elem.id;
    let iThisRow     = CAB_RowFromId(sThisId);
    let iThisLetter  = CAB_LetterFromId(sThisId);
    if ( !CAB_ForRowLetter_IsSquareValidForFocus(iThisRow, iThisLetter) )
        return;
    SyncTo_OthersLoseFocus('CA');
    CAB_ForRow_SetToActive(iThisRow, iThisLetter);
    if ( g_CAB_Focus_sId != '' )
    {    
        let iOldRow = CAB_RowFromId(g_CAB_Focus_sId);
        if ( iThisRow != iOldRow )
        { // need to change the old row to inactive
            if ( ( iThisRow == 0 && iOldRow == 1 ) || ( iThisRow == 1 && iOldRow == 0 ) )
                if ( TC_ForIndexIsClueTypeSpecial(iOldRow) ) CAB_ForRow_SetToInactive(iOldRow);
            else
                if ( TC_ForIndexIsClueTypeSpecial(iOldRow) ) CAB_ForRow_SetToInactive(iOldRow);
        }
    }
    g_CAB_Focus_sId = sThisId;
    TC_CR_SetStatus('Deselect', true);
    SyncTo_OthersLoseFocus('CA');
    return true;
}

function CAB_MoveFocus(iRow, iLetter)
{
    let sNextBox = CAB_MakeId(iRow, iLetter);
    CAB_onfocus(document.getElementById(sNextBox));
    SyncTo_OthersLoseFocus('CA')
}

function CAB_SetFocusToNext(iRow, iLetter)
{
    let iNewRow = iRow;
    let iNewLetter = iLetter;
    let bValid = false;
    while ( !bValid )
    { 
        let iLength = CAB_ForRow_GetLength(iNewRow);
        if ( iNewLetter == iLength - 1 )
        {
            if ( iNewRow == 0 )
            {
                iNewRow = 1;
                iNewLetter = 0 
            }
            else
            {
                iNewRow = 0;
                iNewLetter = 0; 
            }
        }
        else
            iNewLetter++;
        bValid = CAB_ForRowLetter_IsSquareValidForFocus(iNewRow, iNewLetter);
    }
    CAB_MoveFocus(iNewRow, iNewLetter)
}

function CAB_ForRowLetter_DoItAll(cAnswerPlayer, iRow, iLetter)
{
    let cInitialLetter = CAB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    CAB_ForRowLetter_SetAnswerPlayer(cAnswerPlayer, iRow, iLetter);
    CAB_ForRowLetter_SetButton(iRow, iLetter, g_cCode_Inactive);
    TC_History_Add_SpecialClueLetterPlaced(cAnswerPlayer, iRow, iLetter, cInitialLetter);
//    
    CAB_SetFocusToNext(iRow, iLetter);
    g_TC_bMoveMade_Hint = true;
    StoreCookie_Puzzle();
}

