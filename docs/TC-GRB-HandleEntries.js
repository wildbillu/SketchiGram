// TC-GRB-HandleEntries.js

function GRBMS_ShowCheckGrid(sToDo)
{
    var iRowActive = -1;
    var iLetterActive = -1;
    if ( g_GRB_Focus_sId != '' )
    {
        iRowActive    = GRBMS_RowFromId(g_GRB_Focus_sId);
        iLetterActive = GRBMS_LetterFromId(g_GRB_Focus_sId);
    }
    for ( var iR = 0; iR < g_iGridHeight; iR++)
    {
        for ( var iL = 0; iL < g_iGridWidth; iL++ )
        {
            var cCodeFocusActiveInactive = g_TC_cCodeMeaning_Inactive;
            if ( g_GRB_bAcross )
            {
                if ( iR == iRowActive )
                {
                    cCodeFocusActiveInactive = g_TC_cCodeMeaning_ActiveRow;
                    if ( iL == iLetterActive )
                        cCodeFocusActiveInactive = g_TC_cCodeMeaning_HasFocus;
                }
            }
            else
            {
                if ( iL == iLetterActive )
                {
                    cCodeFocusActiveInactive = g_TC_cCodeMeaning_ActiveRow;
                    if ( iR == iRowActive )
                        cCodeFocusActiveInactive = g_TC_cCodeMeaning_HasFocus;
                }
            }
            GRBMS_ForRowLetterShowCheckSquare(iR, iL, sToDo, cCodeFocusActiveInactive, true);
            GRBMS_ForRowLetter_SetButton(iR, iL, g_TC_cCodeMeaning_Inactive);


        }
    }
    return true;
}

function GRB_ForLetterSetAnswerTo(iLetter, sForceAnswer)
{
    GRB_ForLetterMakeHints(iLetter, sForceAnswer);
//
// first we set the grid answer player then all else should happen
// we assume we cannot get here unless the right length
    var iForce = 0;
    for ( iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
        {
            var cAnswerPlayer_New = sForceAnswer.charAt(iForce);
            if ( CharValidEntry(cAnswerPlayer_New) && GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter))
            {
                var cAnswerPlayer_Existing = GRB_ForRowLetter_GetAnswerPlayer(iRow,iLetter);
                if ( cAnswerPlayer_New != cAnswerPlayer_Existing )
                {
                    GRB_ForRowLetter_SetStatusPlayer(g_TC_cCharMeaningNotSet, iRow, iLetter);
                    GRB_ForRowLetter_SetButton(iRow, iLetter, g_TC_cCodeMeaning_Inactive)
                }
                var sGridAnswerPlayerRow = g_aGridAnswersPlayer[iRow];
                sGridAnswerPlayerRow = replaceAt(sGridAnswerPlayerRow, iLetter, cAnswerPlayer_New);
                g_aGridAnswersPlayer[iRow] = sGridAnswerPlayerRow;
            }
            iForce++;
        }
    }
    for ( iRR = 0; iRR < g_iGridHeight; iRR++ )
    {
        if ( GRB_ForRowLetter_IsSquareValidForFocus(iRR, iLetter) )
        {
            GRB_ForRowLetter_SetButton(iRR, iLetter, g_TC_cCodeMeaning_Inactive);
            if ( g_bSettings_CAGR_Answers_CheckRow || g_bSettings_CAGR_Answers_ShowCorrectLetters )
            { // if correct we must mark it correct and set readonly
                GRB_ForRowLetterShowCheckSquare(iRR, iLetter, 'Check');
            }
        }
    }
    return true;
}

function GRB_ForRowSetAnswerTo(iRow, sForceAnswer)
{ // we assume we cannot get here unless the right length
    var sGridAnswerPlayerRow = g_aGridAnswersPlayer[iRow];
    var iForce = 0;
    for ( iCC = 0; iCC < g_iGridWidth; iCC++ )
    {
        if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iCC) )
        {
            var cAnswerPlayer_New = sForceAnswer.charAt(iForce);
            if ( CharValidEntry(cAnswerPlayer_New) && GRB_ForRowLetter_IsSquareValidForFocus(iRow, iCC) )
            {
                var cAnswerPlayer_Existing = GRB_ForRowLetter_GetAnswerPlayer(iRow,iCC);
                if ( cAnswerPlayer_New != cAnswerPlayer_Existing )
                {
                    GRB_ForRowLetter_SetStatusPlayer(g_TC_cCharMeaningNotSet, iRow, iCC);
                    GRB_ForRowLetter_SetButton(iRow, iCC, g_TC_cCodeMeaning_Inactive)
                }
                sGridAnswerPlayerRow = replaceAt(sGridAnswerPlayerRow, iCC, cAnswerPlayer_New )
            }
            iForce++;
        }
    }
    g_aGridAnswersPlayer[iRow] = sGridAnswerPlayerRow;
    for ( iC = 0; iC < g_iGridWidth; iC++ )
    {
        if ( GRB_ForRowLetter_IsSquareValidForFocus(iRow, iC) )
        {
            GRB_ForRowLetter_SetButton(iRow, iC, g_TC_cCodeMeaning_Inactive);
            if ( g_bSettings_CAGR_Answers_CheckRow || g_bSettings_CAGR_Answers_ShowCorrectLetters )
            { // if correct we must mark it correct and set readonly
                GRB_ForRowLetterShowCheckSquare(iRow, iC, 'Check');
            }
        }
    }
    Status_Check(false);
    return true;
}

function GRB_ForLetterMakeHints(iLetter, sAnswerPlace)
{
    var iSetCorrectToIncorrect = 0;
    var iOverrideExistingAnswers = 0;
    var cStatus ='';
    var cAnswer ='';
    var cAnswerPlayer = '';
    var cAnswerPlace = '';
    var iIndex = 0;
    for ( iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
        {
            cAnswerPlace = sAnswerPlace.charAt(iIndex);
            if ( CharValidEntry(cAnswerPlace) )
            {
                cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
                cAnswer = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
                cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
                if ( cStatus == g_TC_cCodeMeaning_Correct && cAnswerPlace != cAnswer )
                    iSetCorrectToIncorrect++;
                else if ( CharValidEntry(cAnswerPlayer) && cAnswerPlace != cAnswerPlayer )
                    iOverrideExistingAnswers++;
            }
            iIndex++;
        }
    }
    var sWarningMessage = '';
    if ( iSetCorrectToIncorrect )
    sWarningMessage += 'Overrides (' + iSetCorrectToIncorrect +') Correct letters.'
    if ( iOverrideExistingAnswers )
        sWarningMessage += 'Overrides (' + iOverrideExistingAnswers +') Set letters'
    if ( sWarningMessage == '' )
        sWarningMessage = 'No Warnings';
    return sWarningMessage;
}

function GRB_ForRowMakeHints(iRow, sAnswerPlace)
{
    var sWarningMessage = 'No Conflicts Detected;';
    var iSetCorrectToIncorrect = 0;
    var iOverrideExistingAnswers = 0;
    var cStatus ='';
    var cAnswer ='';
    var cAnswerPlayer = '';
    var cAnswerPlace = '';
    var iIndex = 0;
    for ( iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
    {
        if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
        {
            cAnswerPlace = sAnswerPlace.charAt(iIndex);
            if ( CharValidEntry(cAnswerPlace) )
            {
                cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
                cAnswer = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
                cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
                if ( TC_CorrectOrGolden(cStatus) && cAnswerPlace != cAnswer )
                    iSetCorrectToIncorrect++;
                else if ( CharValidEntry(cAnswerPlayer) && cAnswerPlace != cAnswerPlayer )
                    iOverrideExistingAnswers++;
            }
            iIndex++;
        }
    }
    var sWarningMessage = '';
    if ( iSetCorrectToIncorrect )
    sWarningMessage += 'Overrides (' + iSetCorrectToIncorrect +') Correct letters.'
    if ( iOverrideExistingAnswers )
        sWarningMessage += 'Overrides (' + iOverrideExistingAnswers +') Set letters'
    if ( sWarningMessage == '' )
        sWarningMessage = 'No Warnings';
    return sWarningMessage;
}

function GRB_ShowCheckGrid(sToDo)
{
    var iRowActive = -1;
    var iLetterActive = -1;
    if ( g_GRB_Focus_sId != '' )
    {
        iRowActive    = GRB_RowFromId(g_GRB_Focus_sId);
        iLetterActive = GRB_LetterFromId(g_GRB_Focus_sId);
    }
    for ( var iR = 0; iR < g_iGridHeight; iR++)
    {
        for ( var iL = 0; iL < g_iGridWidth; iL++ )
        {
            var cCodeFocusActiveInactive = g_TC_cCodeMeaning_Inactive;
            if ( g_GRB_bAcross )
            {
                if ( iR == iRowActive )
                {
                    cCodeFocusActiveInactive = g_TC_cCodeMeaning_ActiveRow;
                    if ( iL == iLetterActive )
                        cCodeFocusActiveInactive = g_TC_cCodeMeaning_HasFocus;
                }
            }
            else
            {
                if ( iL == iLetterActive )
                {
                    cCodeFocusActiveInactive = g_TC_cCodeMeaning_ActiveRow;
                    if ( iR == iRowActive )
                        cCodeFocusActiveInactive = g_TC_cCodeMeaning_HasFocus;
                }
            }
            GRB_ForRowLetterShowCheckSquare(iR, iL, sToDo, cCodeFocusActiveInactive)
        }
    }
    return true;
}

function GRB_ShowCheckAnswerActiveRowOrColumn(sToDo)
{
    if ( g_GRB_Focus_sId == '' )
        return false;
    var iRow    = GRB_RowFromId(g_GRB_Focus_sId);
    var iLetter    = GRB_LetterFromId(g_GRB_Focus_sId);
    if ( g_GRB_bAcross )
    {
        for ( var iL = 0; iL < g_iGridWidth; iL++ )
        {
            if ( iL == iLetter )
                GRB_ForRowLetterShowCheckSquare(iRow, iL, sToDo, g_TC_cCodeMeaning_HasFocus)
            else
                GRB_ForRowLetterShowCheckSquare(iRow, iL, sToDo, g_TC_cCodeMeaning_ActiveRow)
        }
    }
    else 
    {
        for ( var iR = 0; iR < g_iGridHeight; iR++ )
        {
            if ( iR == iRow )
                GRB_ForRowLetterShowCheckSquare(iR, iLetter, sToDo, g_TC_cCodeMeaning_HasFocus)
            else
                GRB_ForRowLetterShowCheckSquare(iR, iLetter, sToDo, g_TC_cCodeMeaning_ActiveRow)
        }
    }
    return true;
}

function GRB_ForRowLetterShowCheckSquare(iRow, iLetter, sToDo, cCodeFocusActiveInactive)
{
    if ( !GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
        return; // actually we should never get here
    var cInitialStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cInitialStatus == g_TC_cCodeMeaning_Corrected )
        return; 
    if ( TC_CorrectOrGolden(cInitialStatus) )
        return;
    var bSetLetter = GRB_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter)
    var cAnswer = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
    var cAnswerPlayerInitial = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    if ( sToDo == 'Check' )
    { // if the character is not set and it is Check we do nothing
        if ( !bSetLetter )
            return;
        if ( cAnswer == cAnswerPlayerInitial)
            GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Correct, iRow, iLetter);
        else
            GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Incorrect, iRow, iLetter);
    }
    else if ( sToDo == 'Show' )
    { // whatever happens the character is set to the correct letter
        GRB_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iLetter);
        if ( cAnswer == cAnswerPlayerInitial )
            GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Correct, iRow, iLetter);
        else
            GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Corrected, iRow, iLetter);
    }
    GRB_ForRowLetter_SetButton(iRow, iLetter, cCodeFocusActiveInactive)
}

function GRB_ShowCheckActiveSquare(sToDo)
{
    if ( g_GRB_Focus_sId == '' )
        return false;
    var iRow    = GRB_RowFromId(g_GRB_Focus_sId);
    var iLetter = GRB_LetterFromId(g_GRB_Focus_sId);
    GRB_ForRowLetterShowCheckSquare(iRow, iLetter, sToDo, g_TC_cCodeMeaning_HasFocus);
    return true;
}

function GRB_ClearGrid()
{
    for ( var iR = 0; iR < g_iGridHeight; iR++)
    {
        for ( var iL = 0; iL < g_iGridWidth; iL++ )
        {
            if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iR, iL) )
            {
                GRB_ForRowLetter_SetAnswerPlayer(g_TC_cCharMeaningNotSet, iR, iL);
                GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Normal, iR, iL);
                GRB_ForRowLetter_SetButton(iR, iL, g_TC_cCodeMeaning_Inactive);
            }
        }
    }
}
