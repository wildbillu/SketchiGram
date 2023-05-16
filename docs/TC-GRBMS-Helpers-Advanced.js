// TC-GRBMS-Helpers-Advanced.js

function GRBMS_ForAll_SetStatusFromState()
{
    for ( let iR = 0; iR < g_iGridWidth; iR++ )
        for ( let iL = 0; iL < g_iGridHeight; iL ++)
            GRBMS_ForRowLetter_SetStatusFromState(iR, iL)
}

function GRBMS_ForRowLetter_SetStatusFromState(iR, iL)
{
    let cInitialStatus = GRB_ForRowLetter_GetStatusPlayer(iR, iL);
    if ( TC_IsGoldenOrBlackSquare(cInitialStatus) || TC_IsCorrected(cInitialStatus))
    {
        return;
    }
    let cAnswer = GRB_ForRowLetter_GetAnswer(iR, iL);
    let cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iR, iL);
    let cStatus = g_cCode_Correct;
    if ( cAnswer != cAnswerPlayer )
        cStatus = g_cCode_Incorrect;
    GRB_ForRowLetter_SetStatusPlayer(cStatus, iR, iL);
    GRBMS_ForRowLetter_SetButton(iR, iL, g_cCode_Inactive);
}

function GRBMS_SolveGrid()
{
    GRBMS_LoseCurrentFocus();
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
                GRBMS_ForRowLetter_SetButton(iR, iL, g_cCode_Inactive);
            }
        }
    }
    Sync_GridChange();
    return true;
}

function GRBMS_ForRowLetterShowSquare(iRow, iLetter, sToDo, bIncorrectOverride)
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

function GRBMS_SwitchAnswers(A_iRow, A_iLetter, B_iRow, B_iLetter)
{
    let A_cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(A_iRow, A_iLetter);
    let B_cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(B_iRow, B_iLetter);
    // switch
    GRB_ForRowLetter_SetAnswerPlayer(A_cAnswerPlayer, B_iRow, B_iLetter);
    TC_History_Add_GridLetterPlaced(A_cAnswerPlayer, B_iRow, B_iLetter)
    GRB_ForRowLetter_SetAnswerPlayer(B_cAnswerPlayer, A_iRow, A_iLetter);
    // since we moved letters we no longer if the status is correct
    if ( g_bSettings_CAGR_Answers_ShowCorrectLetters )
    {
        GRBMS_ForRowLetterShowCheckSquare(A_iRow, A_iLetter, 'Check', false)
        GRBMS_ForRowLetterShowCheckSquare(B_iRow, B_iLetter, 'Check', false)
    }
    else
    {
        GRB_ForRowLetter_SetStatusPlayer(g_cCode_Normal, B_iRow, B_iLetter);
        GRB_ForRowLetter_SetStatusPlayer(g_cCode_Normal, A_iRow, A_iLetter);
    }
    GRBMS_ForRowLetter_SetButton(A_iRow, A_iLetter, g_cCode_Inactive);
    GRBMS_ForRowLetter_SetButton(B_iRow, B_iLetter, g_cCode_Inactive);
    KB_AGC_SetKeyboardButtons();
    Sync_GridChange();
    SyncTo_OthersLoseFocus('NoOne');
}

function GRBMS_FindFirstSquareWithPlayerAnswer(sUpper, bRejectSquaresThatMake2Changes, cLetterOfSquareBeingFixed)
{
    let aPossibles = [];
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            if ( GRB_ForRowLetter_IsSquareValidForFocus(iRow, iLetter) )
            { // shouldnt get here unless it is okay to change character
                let cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
                if ( cAnswerPlayer == sUpper )  
                {
                    aPossibles.push(GRBMS_MakeId(iRow, iLetter));
                }
            }
        }
    }
    let iPossibles = aPossibles.length;
    if ( iPossibles == 0 )
        return '';
    if ( iPossibles == 1 || !bRejectSquaresThatMake2Changes )
        return aPossibles[0];
    for ( let iC = 0; iC < iPossibles; iC++ )
    {
        let iRow    = GRBMS_RowFromId(aPossibles[iC])
        let iLetter = GRBMS_LetterFromId(aPossibles[iC]);
        let cThisOne = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
        if ( cThisOne != cLetterOfSquareBeingFixed )
            return aPossibles[iC];
    }
    return aPossibles[0];
}

function GRBMS_SetAllowedGridLetters()
{
    var sAllowedLetters = '';
    var sLocalGridSolution = g_aGridAnswers.join('');
    for ( var i = 0; i < sLocalGridSolution.length; i++ )
    {
        var cLetter = sLocalGridSolution.charAt(i);
        if ( !TC_IsBlackSquare(cLetter) && !sAllowedLetters.includes(cLetter))
            sAllowedLetters += cLetter;
    }
    g_GRBMS_sAllowedGridLetters = sAllowedLetters;
    let iLength = g_GRBMS_sAllowedGridLetters.length;
    for ( let i = 0; i < iLength; i++ )
        g_GRBMS_sAllowedGridLetters_Selectable += 'T';
}

function GRBMS_SetAllButtons()
{
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            GRBMS_ForRowLetter_SetButton(iRow, iLetter, g_cCode_Inactive)
        }
    }
}

function GRBMS_MakeGrid()
{
    let sButtons = ''
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++)
    {
        for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            sButtons += TC_GRBMS_MakeButton(iRow, iLetter, g_cCode_Normal);
        }
    }
    let elem = document.getElementById("Div_Grid");
    elem.innerHTML = sButtons;
}

function GRBMS_ForRowLetterShowCheckSquare(iRow, iLetter, sToDo, bIncorrectOverride)
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
