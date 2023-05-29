// TC-Status-Process.js

var g_TC_iSquares = 0;
var g_TC_iSquares_Correct = 0;
var g_TC_iGridAnswers = 0;
var g_TC_iGridAnswers_Correct = 0;
var g_TC_iClueAnswers = 0;
var g_TC_iClueAnswers_Correct = 0;

var g_TC_Status_bFirstCheck = true;
var g_TC_Status_iChanges    = 0;
var g_TC_Status_sChanges    = '';

var g_TC_ShadeBackgroundOnStatus_sId = "Body_Any";
var g_TC_ShadeBackgroundOnStatus_fMaxOpacity = 0.1;
var g_TC_ShadeBackgroundOnStatus_sColorCode = 'rgba(0,255,0,O)';

function Status_Check(bNonPlayerFixes)
{ // called everytime character is done, show answer(CA or GR), solve(CA, GR, All)
    g_TC_Status_iChanges    = 0;
    g_TC_Status_sChanges    = '';
    let bInitiallySolved = g_bPuzzleSolved;
    let sMessage = CAB_CheckForCorrectAnswer();
    if ( sMessage != '' )
        Status_Check_AddChange(sMessage);
    sMessage = Status_Check_Grid()
//    if ( sMessage != '' )
//        Status_Check_AddChange(sMessage);
    sMessage = Status_Check_Squares(g_TC_Status_bFirstCheck)
    if ( sMessage != '' )
        Status_Check_AddChange(sMessage);

    g_bPuzzleSolved = g_bGridSolved;  
    Status_ShadeBackground();
    if ( !bInitiallySolved && g_bPuzzleSolved && g_bSettings_CAGR_Display_Complete && !g_bPrintedFormat )
    {
        TC_ThemeImage_Solved_ShowPopup();
        if ( g_SpecialClueFrame_bActive ) TC_ShowSpecialClueAnswers();
    }
    else if ( !g_bPuzzleSolved && !g_TC_Status_bFirstCheck && ( g_TC_Status_iChanges > 0 ) && !g_bPrintedFormat )
    {
        let sMessageStyle = g_ResultMessage_sStyle_Positive;
        if ( bNonPlayerFixes )
            sMessageStyle = g_ResultMessage_sStyle_InfoOnly;
        TC_ResultMessage_DisplayForInterval(g_bPuzzleSolved, g_TC_Status_sChanges, sMessageStyle, g_TC_Status_iChanges, 3);
    }
    SG_MakeSpecialCluesAnswerStrings();
    SG_SetNormalClues();
    if ( g_bGridAndCA )
        SG_UpdateAnswersCorrectInGridAndDisplay();
    if ( SG_SetAnswersCorrectInGrid() ) 
        SG_ResetAnswerFromAnswersCorrectInGrid();
    FeaturesDependingOnPuzzleSolved();
    SG_PositionClueOverallDiv();
    if ( g_MAM_bActive ) MAM_EnableDisable();
    g_TC_Status_bFirstCheck = false;
    if ( g_bPuzzleSolved ) GRBMS_SetAllButtons();
    StoreCookie_Puzzle();
}

function TC_ClearSpecialClueAnswers()
{
    for ( let iA = 0; iA < 2; iA++ )
    {
        let iL = g_CAB_aAnswers[iA].length;
        g_CAB_aAnswersPlayer[iA] = '';
        g_CAB_aAnswersPlayerStatus[iA] = '';
        for ( let i = 0; i < iL; i++ )
        {
            g_CAB_aAnswersPlayer[iA]       += g_cCode_MeaningNotSet;
            g_CAB_aAnswersPlayerStatus[iA] += g_cCode_ColorUnknownLetter;
        }
    }
    if ( TC_ForIndexIsClueTypeSpecial(0) )CAB_ForRow_SetToInactive(0);
    if ( TC_ForIndexIsClueTypeSpecial(1) )CAB_ForRow_SetToInactive(1);
}

function Status_ShadeBackground()
{
    if ( g_bPrintedFormat )
        return;
    if ( !g_TC_ShadeBackgroundOnStatus_bActive && !g_bPuzzleSolved )
        return;
    var fFractionComplete = 0.0;
    var iTotal = g_TC_iSquares;// + g_TC_iGridAnswers;
    var iTotal_Correct = g_TC_iSquares_Correct;// + g_TC_iGridAnswers_Correct;
    fFractionComplete = iTotal_Correct/iTotal;
    var fOpacity = g_TC_ShadeBackgroundOnStatus_fMaxOpacity * fFractionComplete;
    var elemBody = document.getElementById(g_TC_ShadeBackgroundOnStatus_sId);
    var sOpacity = fOpacity.toString();
    var sRGBAColor = g_TC_ShadeBackgroundOnStatus_sColorCode.replace("O", sOpacity);
    elemBody.style.backgroundColor = sRGBAColor;
}

function FeaturesDependingOnPuzzleSolved()
{
    if ( !g_bGridSolved )
        return;
    TC_ElapsedTime_Clear();
    ForIdSetVisibility("KB_Mini_Div", false);
    if ( g_KB_bChangeDirectionKeyActive ) ForIdSetVisibility('ChangeDirection', false);
    if ( g_KB_bBackspaceKeyActive ) ForIdSetVisibility('Backspace', false);
    if ( g_KB_bArrowKeysActive )
    {
        ForIdSetVisibility("ArrowLeft", false);
        ForIdSetVisibility("ArrowRight", false);
    }
    ForIdSetVisibility("ScratchArea", false);
    if ( g_HowTo_bActive ) ForIdSetVisibility("SG_HowToA_Div", false);
    SG_CA_UpdateAndSetVisibility(true);
    if ( g_DM_bActive ) DM_SetButtons();
}

function Status_Check_Squares(bSuppressMessage)
{
    let iSquares_Correct_Starting = g_TC_iSquares_Correct;
    g_TC_iSquares_Correct = 0;
    g_TC_iSquares = 0;
    let sMessage = '';
    for ( let iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        for ( let iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
        {
            if ( !GRB_ForRowLetter_isThisSquareABlackSquare(iRow, iLetter) )
            {
                g_TC_iSquares++;
                if ( GRB_ForRowLetter_GetAnswer(iRow, iLetter) == GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter) )
                    g_TC_iSquares_Correct++;
            }
        }
    }
    if ( bSuppressMessage )
        return;
    if ( g_TC_iSquares_Correct > iSquares_Correct_Starting )
    {
        let iNew = g_TC_iSquares_Correct - iSquares_Correct_Starting;
        sMessage = iNew + ' Grid Square Solved ';
        if ( iNew > 1 )
            sMessage = iNew + ' Grid Squares Solved ';
    }
    return sMessage;
}

function Status_Check_Grid()
{
    let iGridAnswers_Correct_Starting = g_TC_iGridAnswers_Correct;
    g_TC_iGridAnswers_Correct = 0;
    let iGRRows = g_iGridWidth;
    for ( let iGRRow = 0; iGRRow < iGRRows; iGRRow++ )
    {
        if ( g_aGridAnswersPlayer[iGRRow] == g_aGridAnswers[iGRRow] )
            g_TC_iGridAnswers_Correct++;
    }
    let iGRLetters = g_iGridHeight
    // down grid answers - dont need to check for black squares cause player answer will have the .
    for (let iGRLetter = 0; iGRLetter < iGRLetters; iGRLetter++ )
    {
        let bLetterCorrect = true;
        for ( let iRow = 0; iRow < g_iGridHeight; iRow++)
        {
            if ( GRB_ForRowLetter_GetAnswer(iRow, iGRLetter) != GRB_ForRowLetter_GetAnswerPlayer(iRow, iGRLetter) )
                bLetterCorrect = false;
        }
        if ( bLetterCorrect )
            g_TC_iGridAnswers_Correct++;
    }
    g_TC_iGridAnswers = g_iGridWidth + g_iGridHeight;
    sGR = 'Grid: ' + g_TC_iGridAnswers_Correct + ' of ' + g_TC_iGridAnswers;
    let sMessage = CAB_CheckForCorrectAnswer();
    if ( sMessage != '' )
        Status_Check_AddChange(sMessage);
    if ( g_TC_iGridAnswers_Correct == g_TC_iGridAnswers )
        g_bGridSolved = true;
    else
        g_bGridSolved = false;
    if ( g_TC_iGridAnswers_Correct > iGridAnswers_Correct_Starting )
    {
        let iNew = g_TC_iGridAnswers_Correct - iGridAnswers_Correct_Starting;
        let sMessage = iNew + ' Grid Word Solved ';
        if ( iNew > 1 )
            sMessage = iNew + ' Grid Words Solved ';
        Status_Check_AddChange(sMessage);
        g_TC_Status_iChanges += iNew;
    }
    return sGR;
}

function Status_Check_AddChange(sNew)
{
    if ( sNew == '' )
        return;
    if ( g_TC_Status_sChanges == '' )
        g_TC_Status_sChanges += g_cGeneralDelimiter;
    g_TC_Status_sChanges += sNew;
    g_TC_Status_iChanges++
}
