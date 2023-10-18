// TC-Status-Process.js

var g_TC_iSquares = 0;
var g_TC_iSquares_Correct = 0;
var g_TC_iGridAnswers = 0;
var g_TC_iGridAnswers_Correct = 0;
var g_TC_iClueAnswers = 0;
var g_TC_iClueAnswers_Correct = 0;

var g_TC_Status_bFirstCheck = true;

function ActionsOnPuzzleSolved(bInitiallySolved)
{
    TC_ElapsedTime_Stop();
    GRB_SetAllButtons_Inactive();
    TC_SyncSpecialAnswersToGrid();
    CAB_SetAllButtons(g_cCode_Inactive);
    ForIdSetVisibility(g_MII_Grid_sId_Div, false);
    ForIdSetVisibility(g_MII_Hint_sId_Div, false);
    ForIdSetVisibility("MoreActions_Div", false);
    if ( !bInitiallySolved ) TC_CAL_Show();
    g_bSuppressGridNumbers = false;
    TC_CR_SetStatus("ChangeDirection", false)
    GRB_SetAllButtons_Inactive();
    SetMoreButton('Dropdown_More_SolveGrid', false);
}

function Status_Check()
{ // called everytime character is done, show answer(CA or GR), solve(CA, GR, All)
    let bInitiallySolved = g_bPuzzleSolved;
    Status_Check_Grid()
    g_bPuzzleSolved = g_bGridSolved;  
    if ( !bInitiallySolved && g_bPuzzleSolved && g_bSettings_CAGR_Display_Complete)
    {
        TC_ThemeImage_Solved_ShowPopup();
        if ( g_SpecialClueFrame_bActive ) TC_ShowSpecialClueAnswers();
    }
    g_TC_Status_bFirstCheck = false;
    if ( g_bPuzzleSolved ) 
        ActionsOnPuzzleSolved(bInitiallySolved);
    StoreCookie_Puzzle();
}

function Status_Check_Grid()
{
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
    if ( g_TC_iGridAnswers_Correct == g_TC_iGridAnswers )
        g_bGridSolved = true;
    else
        g_bGridSolved = false;
}

