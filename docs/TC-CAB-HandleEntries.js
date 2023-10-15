// TC-CAB-HandleEntries.js

function CAB_ClearAnswers()
{
    for ( let iR = 0; iR < g_iAnswers; iR++)
    {
        if ( TC_ForIndexIsClueTypeSpecial(iL) )
        {
            let iLength = g_CAB_aAnswers[iR].length
            for ( let iL = 0; iL < iLength; iL++ )
            {
                CAB_ForRowLetter_SetAnswerPlayer(g_cCode_MeaningNotSet, iR, iL);
                CAB_ForRowLetter_SetStatusPlayer(g_cCode_Normal, iR, iL);
                CAB_ForRowLetter_SetButton(iR, iL, g_cCode_Inactive);

            }
        }
    }
    if ( g_CAB_Focus_sId != '' )
        document.getElementById(g_CAB_Focus_sId).focus();
}

function CAB_ShowCheckAnswers(sToDo)
{
    for ( var iR = 0; iR < g_iAnswers; iR++)
    {
        if ( TC_ForIndexIsClueTypeSpecial(iR) )
            CAB_ShowCheckAnswerRow(iR, sToDo)
    }
    return true;
}

function CAB_ShowCheckAnswerRow(iRow, sToDo)
{
    var iRowFocus    = -1;
    var iLetterFocus = -1;
    if ( g_CAB_Focus_sId != '' )
    {
        iRowFocus    = CAB_RowFromId(g_CAB_Focus_sId);
        iLetterFocus = CAB_LetterFromId(g_CAB_Focus_sId);
    }        
    var iLength = CAB_ForRow_GetLength(iRow);
    for ( var iL = 0; iL < iLength; iL++ )
    {
        var cCode = g_cCode_Inactive;
        if ( iRow == iRowFocus )
        {
            cCode = g_cCode_ActiveRow;
            if ( iL == iLetterFocus)
                cCode = g_cCode_HasFocus;
        }
        CAB_ForRowLetterShowCheckSquare(iRow, iL, sToDo, cCode)
    }
    return true;
}

function CAB_ShowCheckAnswerActiveRow(sToDo)
{
    if ( g_CAB_Focus_sId == '' )
        return false;
    var iRow    = CAB_RowFromId(g_CAB_Focus_sId);
    var iLetter = CAB_LetterFromId(g_CAB_Focus_sId);
    var iLength = CAB_ForRow_GetLength(iRow);
    for ( var iL = 0; iL < iLength; iL++ )
    {
        if ( iL == iLetter )
            CAB_ForRowLetterShowCheckSquare(iRow, iL, sToDo, g_cCode_HasFocus)
        else
            CAB_ForRowLetterShowCheckSquare(iRow, iL, sToDo, g_cCode_ActiveRow)

    }
    return true;
}

function CAB_ForRowLetterShowCheckSquare(iRow, iLetter, sToDo, cCodeFocusActiveInactive)
{
    if ( !TC_ForIndexIsClueTypeSpecial(iRow) )
        return;
    let cInitialStatus = CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cInitialStatus == g_cCode_Corrected )
        return; 
    if ( TC_IsCorrectOrGolden(cInitialStatus) )
        return;
    let bChanged = false;
    let bSetLetter = CAB_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter)
    let cAnswer = CAB_ForRowLetter_GetAnswer(iRow, iLetter);
    let cAnswerPlayerInitial = CAB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    if ( sToDo == 'Check' )
    { // if the character is not set and it is Check we do nothing
        if ( !bSetLetter )
            return;
        if ( cAnswer == cAnswerPlayerInitial)
            CAB_ForRowLetter_SetStatusPlayer(g_cCode_Correct, iRow, iLetter);
        else
            CAB_ForRowLetter_SetStatusPlayer(g_cCode_Incorrect, iRow, iLetter);
    }
    else
    { // whatever happens the character is set to the correct letter
        CAB_ForRowLetter_SetAnswerPlayer(cAnswer, iRow, iLetter);
        if ( cAnswer == cAnswerPlayerInitial )
            CAB_ForRowLetter_SetStatusPlayer(g_cCode_Correct, iRow, iLetter);
        else
            CAB_ForRowLetter_SetStatusPlayer(g_cCode_Corrected, iRow, iLetter);
        bChanged = true;            
    }
    CAB_ForRowLetter_SetButton(iRow, iLetter, cCodeFocusActiveInactive)
    return bChanged;
}

function CAB_ShowCheckActiveSquare(sToDo)
{
    if ( g_CAB_Focus_sId == '' )
        return false;
    var iRow    = CAB_RowFromId(g_CAB_Focus_sId);
    var iLetter = CAB_LetterFromId(g_CAB_Focus_sId);
    CAB_ForRowLetterShowCheckSquare(iRow, iLetter, sToDo, g_cCode_HasFocus);
    return true;
}

function CAB_RowLetterNext(iRow, iLetter)
{
    var iNewRow = iRow;
	var iNewLetter = iLetter;
    var iLettersThisRow = CAB_ForRow_GetLength(iNewRow);
	if ( iLetter < iLettersThisRow - 1 )
	{
		iNewLetter = iNewLetter + 1;
    }
    else
    {
        iNewLetter = 0;
        iNewRow++;
        if ( iNewRow > g_iAnswers - 1)
            iNewRow = 0;
    }
	if ( iNewRow > g_CAB_iClues - 1 )
    {
        iNewRow = 0;
        iNewLetter = 0;
    }
    var s = iNewRow.toString() + iNewLetter.toString();
    return s;
}

function CAB_RowLetterPrevious(iRow, iLetter)
{
    var iNewRow = iRow;
	var iNewLetter = iLetter;
	if ( iLetter == 0 )
	{
        iNewRow = iRow - 1;
        if ( iNewRow < 0 )
            iNewRow = g_iAnswers - 1;
        iNewLetter = CAB_ForRow_GetLength(iNewRow) - 1;
    }
    else
    {
        iNewLetter = iLetter - 1;
    }
	if ( iNewRow < 0  )
    {
        iNewRow = g_iAnswers - 1;
        iNewLetter =  g_CAB_aAnswers[iNewRow].length;
    }
    var s = iNewRow.toString() + iNewLetter.toString();
    return s;
}
