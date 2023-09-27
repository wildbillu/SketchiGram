// TC-More.js

function Action_Finishup()
{
    StoreCookie_Puzzle();    
    Status_Check();
}

function Action_ResetPuzzle()
{
    g_bResettingDoNotUseCookie = true;
    g_bPuzzleSolved = false;
    g_bGridSolved = false;
    TC_ElapsedTime_Clear()
    TC_HideMoreActions();
    Restart();
}

function Action_SolvePuzzle()
{
    GRB_SolveGrid();
    g_bGridSolved = true;    
    g_bPuzzleSolved = true;    
    TC_ThemeImage_Solved_ShowPopup();    
    Status_Check();
    TC_HideMoreActions();
}
