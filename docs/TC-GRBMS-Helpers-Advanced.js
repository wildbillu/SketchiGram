// TC-GRBMS-Helpers-Advanced.js

function GRB_ScrambleCorrectAnswersToPlayer(bReplaceCorrectAndCorrected)
{ // reconstitute the string
    let sPlaced = '';
    let sGridAsString = g_aGridAnswers.join('');
    let sAllLettersToPlace = sGridAsString;
    sGridAsString = GRB_ChangeForbiddenCharactersToDot(sGridAsString, bReplaceCorrectAndCorrected)
    let sNoDots = '';
    let iMaxCheck = 0;
    sNoDots = removeAllChar(sGridAsString, '.');
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            let cStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter)
            let bMoveThisOne = true;
            if ( !bReplaceCorrectAndCorrected )
            {
                if ( cStatus == g_cCode_Corrected )
                    bMoveThisOne = false;
                if ( cStatus == g_cCode_Correct )
                    bMoveThisOne = false;
            }
            if ( GRB_ForRowLetter_IsSquareGoldenOrBlack(iRow, iLetter) )
                bMoveThisOne = false;
            if ( bMoveThisOne )
            {
                let iCheck = 0;
                let bReplaced = false;
                while ( !bReplaced )
                {
                    let iV = sNoDots.length;
                    let iP = Math.floor(Math.random() * iV);
                    let cLetter = sNoDots.charAt(iP)
                    let sAnswerPlayer = g_aGridAnswersPlayer[iRow];
                    let cAnswer = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
                    if ( cLetter != cAnswer || iCheck > 200)
                    {
                        sPlaced += cLetter;
                        g_aGridAnswersPlayer[iRow] = replaceAt(sAnswerPlayer, iLetter, cLetter);
                        let sNew = sNoDots.substring(0, iP);
                        sNew += sNoDots.substring(iP+1)
                        sNoDots = sNew;
                        GRB_ForRowLetter_SetStatusPlayer(g_cCode_Normal, iRow, iLetter);
                        bReplaced = true;
                    }
                    iCheck++;
                }
                if ( iCheck > iMaxCheck )
                    iMaxCheck = iCheck;
            }
            else
            {
                sPlaced += GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
            }
        }
    }         
    let iLettersPlaced = sPlaced.length;
    let iAllLettersToPlace = sAllLettersToPlace.length;
    if ( iLettersPlaced != iAllLettersToPlace)
        setlineAdd('Mismatch.Placed:' + iLettersPlaced + 'ToPlace:' + iAllLettersToPlace)
//    
}

function PlacedByPlayer_History(cLetter, iRow, iLetter)
{ // the moves actually represent letters placed by the player
    let iGridMoves = TC_aHistory_GridMoves.length;
    let bPlaced = false;
    for ( let i = 0; i < iGridMoves; i++ )
    {       
        let sEntry = TC_aHistory_GridMoves[i];
        let iRowMove = TC_History_GridEntry_iRow(sEntry);
        let iLetterMove = TC_History_GridEntry_iLetter(sEntry);
        let cLetterMove = TC_History_GridEntry_cLetter(sEntry);
        if ( iRowMove == iRow && iLetterMove == iLetter && cLetterMove == cLetter )
            bPlaced = true;
    }
    return bPlaced;
}

function GRB_ForAll_SetStatusFromState()
{
    for ( let iR = 0; iR < g_iGridWidth; iR++ )
        for ( let iL = 0; iL < g_iGridHeight; iL ++)
            GRB_ForRowLetter_SetStatusFromState(iR, iL)
}

function GRB_ForRowLetter_SetStatusFromState(iR, iL)
{
    let cInitialStatus = GRB_ForRowLetter_GetStatusPlayer(iR, iL);
    if ( TC_IsGoldenOrBlackSquare(cInitialStatus) || TC_IsCorrected(cInitialStatus) )
        return;
    let cAnswer = GRB_ForRowLetter_GetAnswer(iR, iL);
    let cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iR, iL);
    let cStatus = g_cCode_Correct;
    if ( cAnswer != cAnswerPlayer )
        cStatus = g_cCode_Incorrect;
    GRB_ForRowLetter_SetStatusPlayer(cStatus, iR, iL);
    GRB_ForRowLetter_SetButton(iR, iL, g_cCode_Inactive);
}

function GRB_SolveGrid()
{
    GRB_LoseCurrentFocus();
    for ( let iR = 0; iR < g_iGridHeight; iR++)
    {
        for ( let iL = 0; iL < g_iGridWidth; iL++ )
        {
            let cAnswer = GRB_ForRowLetter_GetAnswer(iR, iL);
            let cAnswerPlayerInitial = GRB_ForRowLetter_GetAnswerPlayer(iR, iL);
            if ( cAnswer != cAnswerPlayerInitial)
            {
                GRB_ForRowLetter_UpdateAnswersPlayer(cAnswer, iR, iL);
                GRB_ForRowLetter_SetStatusPlayer(TC_CodeCorrected(), iR, iL)
                GRB_ForRowLetter_SetButton(iR, iL, g_cCode_Inactive);
            }
        }
    }
    return true;
}

function GRB_ForRowLetterShowSquare(iRow, iLetter, sToDo, bIncorrectOverride)
{
    if ( !GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
        return; // actually we should never get here
    var bSetLetter = GRB_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter)
    var cAnswer = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
    var cAnswerPlayerInitial = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    if ( sToDo == 'Check' )
    { // if the character is not set and it is Check we do nothing
        if ( !bSetLetter )
            return;
            if ( cAnswer == cAnswerPlayerInitial)
            GRB_ForRowLetter_SetStatusPlayer(g_cCode_Correct, iRow, iLetter);
        else
        {
            if ( !bIncorrectOverride )
                GRB_ForRowLetter_SetStatusPlayer(g_cCode_Incorrect, iRow, iLetter);
            else
                GRB_ForRowLetter_SetStatusPlayer(g_cCode_IncorrectWithOverride, iRow, iLetter);
        }
    }
    else if ( sToDo == 'Show' )
    { // whatever happens the character is set to the correct letter
        GRB_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iLetter);
        if ( cAnswer == cAnswerPlayerInitial )
            GRB_ForRowLetter_SetStatusPlayer(g_cCode_Correct, iRow, iLetter);
        else
            GRB_ForRowLetter_SetStatusPlayer(g_cCode_Corrected, iRow, iLetter);
    }
}

function GRB_ForRowLetter_IsSquareGoldenOrBlack(iRow, iLetter)
{
    if ( GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
        return true;
    if ( GRB_ForRowLetter_IsGoldenSquare(iRow, iLetter) )
        return true;
    return false;
}

function GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter)
{
    return TC_IsBlackSquare(GRB_ForRowLetter_GetAnswer(iRow, iLetter));
}

function GRB_ForRowLetter_IsGoldenSquare(iRow, iLetter)
{
    return TC_IsGolden(GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter));
}

function GRB_ForRowLetter_IsPlayerAnswerCorrected(iRow, iLetter)
{
    TC_IsCorrected(GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter));
}

function GRB_ForRowLetter_IsPlayerAnswerCorrect(iRow, iLetter)
{
    if ( GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter) == g_cCode_Correct )
        return true;
    return false;
}

function TC_AddWrappedUrlToString(sStarting, sNew, bSingle)
{
    let sFinal = sStarting;
    if ( sStarting != '' )
        sFinal += ', '
    sFinal += MakeURLWrappedString(sNew, bSingle);
    return sFinal;
}

function GRB_AddWrappedUrlToString(sStarting, sNew)
{
    let sFinal = sStarting;
    if ( sStarting != '' )
        sFinal += ', '
    sFinal += MakeURLWrappedString(sNew, false);
    return sFinal;
}

function GRB_SwitchAnswers(A_iRow, A_iLetter, B_iRow, B_iLetter)
{
    g_TC_bMoveMade_Grid = true;
    let A_cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(A_iRow, A_iLetter);
    let B_cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(B_iRow, B_iLetter);
    TC_History_AddEntry_GridExchange(A_iRow, A_iLetter, B_iRow, B_iLetter);
    // switch
    GRB_ForRowLetter_SetAnswerPlayer(A_cAnswerPlayer, B_iRow, B_iLetter);
    GRB_ForRowLetter_SetAnswerPlayer(B_cAnswerPlayer, A_iRow, A_iLetter);
    // since we moved letters we no longer if the status is correct
    GRB_ForRowLetter_SetStatusPlayer(g_cCode_Normal, B_iRow, B_iLetter);
    GRB_ForRowLetter_SetStatusPlayer(g_cCode_Normal, A_iRow, A_iLetter);
    GRB_ForRowLetter_SetButton(A_iRow, A_iLetter, g_cCode_Inactive);
    GRB_ForRowLetter_SetButton(B_iRow, B_iLetter, g_cCode_Inactive);
    SyncTo_OthersLoseFocus('NoOne');
}

function GRB_SetAllButtons_Inactive()
{
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            GRB_ForRowLetter_SetButton(iRow, iLetter, g_cCode_Inactive)
        }
    }
}

function GRB_MakeGrid()
{
    let sButtons = ''
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            sButtons += TC_GRB_MakeButton(iRow, iLetter, g_cCode_Normal);
        }
    }
    let elem = document.getElementById("Div_Grid");
    elem.innerHTML = sButtons;
}

function GRB_ForRowLetterShowCheckSquare(iRow, iLetter, sToDo, bIncorrectOverride)
{
    if ( !GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
        return; // actually we should never get here
    var bSetLetter = GRB_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter)
    var cAnswer = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
    var cAnswerPlayerInitial = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    if ( sToDo == 'Check' )
    { // if the character is not set and it is Check we do nothing
        if ( !bSetLetter )
            return;
            if ( cAnswer == cAnswerPlayerInitial)
            GRB_ForRowLetter_SetStatusPlayer(g_cCode_Correct, iRow, iLetter);
        else
        {
            if ( !bIncorrectOverride )
                GRB_ForRowLetter_SetStatusPlayer(g_cCode_Incorrect, iRow, iLetter);
            else
                GRB_ForRowLetter_SetStatusPlayer(g_cCode_IncorrectWithOverride, iRow, iLetter);
        }
    }
    else if ( sToDo == 'Show' )
    { // whatever happens the character is set to the correct letter
        GRB_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iLetter);
        if ( cAnswer == cAnswerPlayerInitial )
            GRB_ForRowLetter_SetStatusPlayer(g_cCode_Correct, iRow, iLetter);
        else
            GRB_ForRowLetter_SetStatusPlayer(g_cCode_Corrected, iRow, iLetter);
    }
}
