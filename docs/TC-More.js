// TC-More.js

function SG_ShowCheckActiveSquare(sAction)
{
    SG_UpdateAnswersCorrectInGridAndDisplay();
    if ( g_GRBMS_Focus_sId == '' )
        return false;
    let bChanged = false;
    let iRow = GRBMS_RowFromId(g_GRBMS_Focus_sId);
    let iLetter = GRBMS_LetterFromId(g_GRBMS_Focus_sId);
    if ( sAction == 'Check' )
    {
        GRBMS_ForRowLetterShowCheckSquare(iRow, iLetter, sAction, true);
        GRBMS_ForRowLetter_SetButton(iRow, iLetter, g_cCode_HasFocus);
    }
    else
    {
        SG_FixSquare(iRow, iLetter);
        bChanged = true;
    }
    Sync_FocusChange();
    if ( bChanged )
        Sync_GridChange();
    return bChanged;
}

function Dropdown_More_CheckSquare()
{
    if ( !CAB_ShowCheckActiveSquare('Check') )
        SG_ShowCheckActiveSquare('Check');
    Dropdown_More_FinishUp(false);
    
}

function Dropdown_More_FinishUp(bNonPlayerFixes)
{
    StoreCookie_Puzzle();    
    Status_Check(bNonPlayerFixes);
    TC_HideMoreActions();
}

function Dropdown_More_ShowSquare()
{
    if ( !CAB_ShowCheckActiveSquare('Show') )
        SG_ShowCheckActiveSquare('Show')
    Dropdown_More_FinishUp(true);
}

function Dropdown_More_SolveGrid()
{
    GRBMS_ShowGrid();
    Dropdown_More_FinishUp(true);
}

function Dropdown_More_ResetPuzzle()
{
    GRBMS_ScrambleCorrectAnswersToPlayer(true);
    GRBMS_SetAllButtons();
    if ( g_bDifficultyLevelActive ) ForIdSetVisibility("DifficultyLevel_Div", true);
    if ( g_HowTo_bActive ) ForIdSetVisibility("SG_HowToA_Div", true);
    SG_UpdateAnswersCorrectInGridAndDisplay();
    SG_CA_UpdateAndSetVisibility(false);
    if ( g_bDifficultyLevelActive ) TC_DifficultyLevel_Set(3);
    ForIdSetVisibility("ScratchArea", false);
    TC_SA_EB_ClearEntries();
    TC_SA_EB_Setup();
    TC_ElapsedTime_StartOver();
    TC_HideSolvedImage();
    if ( g_SpecialClueFrame_bActive ) TC_ClearDualClueAnswers();
    KB_AllGridChars_Setup();
    KB_AllGridChars_Adjust(false);
    g_CAB_abSetCorrect.length = 0;
    ForIdSetVisibility("KB_Mini_Div", true);


    Dropdown_More_FinishUp(true);
}

function Dropdown_More_SolvePuzzle()
{
    Dropdown_More_SolveGrid();
    CAB_ShowCheckAnswers('Show');
    GRBMS_ShowGrid();
    Dropdown_More_FinishUp(true);
}

function SetMoreButton(sButton, bEnabled)
{
    var eButton = document.getElementById(sButton);
    eButton.disabled = !bEnabled;
    if ( bEnabled )
        eButton.className = 'Dropdown_More_Button';
    else 
        eButton.className = 'Dropdown_More_Button_Disabled';
}

function FeaturesDependingOnPuzzleSolved_MoreMenu()
{
    SetMoreButton_IfActive("Dropdown_More_SolveGrid", !g_bGridSolved);    
    SetMoreButton_IfActive("Dropdown_More_ShowSketchiToon_Answer", !g_bPuzzleSolved);
    SetMoreButton_IfActive("Dropdown_More_ShowSquare", !g_bPuzzleSolved);
    SetMoreButton_IfActive("Dropdown_More_SolvePuzzle", !g_bPuzzleSolved);
    SetMoreButton_IfActive("Dropdown_More_CheckSquare", !g_bPuzzleSolved);
    SetMoreButton_IfActive("Dropdown_More_ResetPuzzle", true);
}

function SetMoreButton_IfActive(sButtonId, bEnabled)
{
    for ( let i = 0; i < g_TC_MoreActions_aIds.length; i++ )
    {
        if ( sButtonId == g_TC_MoreActions_aIds[i] )
        {
            SetMoreButton(sButtonId, bEnabled);
            break;
        }
    }
}
