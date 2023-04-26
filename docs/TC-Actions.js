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
    SyncTo_OthersLoseFocus('GR');
    if ( bChanged )
        Sync_GridChange();
    return bChanged;
}

function Action_Finishup(bNonPlayerFixes)
{
    StoreCookie_Puzzle();    
    Status_Check(bNonPlayerFixes);
    if ( g_MAM_bActive ) MAM_EnableDisable();
}

function Action_ResetPuzzle()
{
    g_bPuzzleSolved = false;
    DM_SetButtons();
    GRBMS_ScrambleCorrectAnswersToPlayer(true);
    GRBMS_SetAllButtons();
    if ( g_HowTo_bActive ) ForIdSetVisibility("SG_HowToA_Div", true);

    if ( g_ThemeImage_Base_bActive )
    {
        TC_ThemeImage_Base_SizeAndPosition();
        TC_ThemeImage_Base_SetVisibility(true);
    }

    SG_UpdateAnswersCorrectInGridAndDisplay();
    SG_CA_UpdateAndSetVisibility(false);
    ForIdSetVisibility("ScratchArea", false);
    TC_SA_ClearEntries();
    if ( g_SA_bActive ) TC_SA_Setup();
    TC_ElapsedTime_StartOver();
    TC_ThemeImage_Popup_HidePopup();
    if ( g_SpecialClueFrame_bActive ) TC_ClearSpecialClueAnswers();
    KB_AllGridChars_Setup();
    KB_AllGridChars_Adjust(false);
    g_CAB_abSetCorrect.length = 0;
    ForIdSetVisibility("KB_Mini_Div", true);
    Action_Finishup(true);
}

function Action_SolvePuzzle()
{
    CAB_ShowCheckAnswers('Show');
    SG_CA_UpdateAndSetVisibility(true);
    Action_SolveGrid();
    if ( !g_bPrintedFormat ) TC_ThemeImage_Solved_ShowPopup();    
    Status_Check(true);
}

function Action_SolveGrid()
{
    GRBMS_ShowGrid();
    Action_Finishup(true);
}
