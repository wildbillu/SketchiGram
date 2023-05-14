// TC-DifficultyMenu-Actions.js
//
function AdjustForInitialDifficultyLevel()
{
    if ( g_AdjustForInitialDifficultyLevel_bActive )
    {
        if ( g_AdjustForInitialDifficultyLevel_iLevel == g_Difficulty_iLevel_Hard )
        {
            DM_ChangeToLevelHard(!g_AdjustForInitialDifficultyLevel_bNewPuzzle);
        }
        else if ( g_AdjustForInitialDifficultyLevel_iLevel == g_Difficulty_iLevel_Easy )
        {
            DM_ChangeToLevelHard(!g_AdjustForInitialDifficultyLevel_bNewPuzzle);
            DM_ChangeToLevelEasy(!g_AdjustForInitialDifficultyLevel_bNewPuzzle);
            TC_SetVisible("ScratchArea");
            TC_ThemeImage_Base_SetVisibility(false);
        }
    }
    else
    {
        if ( g_Difficulty_iLevel_Settings == g_Difficulty_iLevel_Hard )
        { // don't want to show extra stuff, but do want to change visibility
            g_Difficulty_iLevel_Operating = g_Difficulty_iLevel_Hard;
            TC_SetVisible("ScratchArea");
        }
        else if ( g_Difficulty_iLevel_Settings == g_Difficulty_iLevel_Easy )
        {
            g_Difficulty_iLevel_Operating = g_Difficulty_iLevel_Easy;
            SG_CA_UpdateAndSetVisibility(true);
            if ( g_MAM_bActive ) MAM_EnableDisable();
        }
        DM_SetButtons();
    }
}

function DM_UpdatesAfterDifficultyLevelChange()
{
    if ( g_TC_ShowScratchArea )
        TC_SetVisible("ScratchArea");
    if ( g_bShowCorrectLetters )
    {
        CA_ClearIncorrect();
    }
    if ( g_TC_SyncGridAndSpecialClueAnswers_bActive )
    {
        SG_ResetAnswerFromAnswersCorrectInGrid();
        SG_CA_UpdateAndSetVisibility(true);
    }
    GRBMS_SetAllButtons();
    CAB_SetAllButtons(g_cCode_Inactive);
    if ( g_TC_ShadeBackgroundOnStatus_bActive )
        Status_ShadeBackground()
    if ( g_MAM_bActive ) MAM_EnableDisable();
    DM_SetButtons();
}

function DM_AdjustSettingsForDifficultyLevel_ExpertValuesOnly()
{
    g_Difficulty_iLevel_Operating = g_Difficulty_iLevel_Expert;
    g_Difficulty_iLevel_Settings = g_Difficulty_iLevel_Expert;
//    StoreCookie_Settings();
    g_AGC_bAllowRepeats = false;
    g_bAllowCorrectLettersToChange = true;
    g_bShowCorrectLetters = false;
    g_bShowIntermediateToasts = false;
    g_TC_ShadeBackgroundOnStatus_bActive = false;
    g_TC_SyncGridAndSpecialClueAnswers_bActive = false;
    g_TC_ShowScratchArea = false;
    g_TC_ShowCorrectInScratchArea = false;
//    DM_UpdatesAfterDifficultyLevelChange()
}

function DM_AdjustSettingsForDifficultyLevel_Expert()
{
    g_Difficulty_iLevel_Operating = g_Difficulty_iLevel_Expert;
    g_Difficulty_iLevel_Settings = g_Difficulty_iLevel_Expert;
    StoreCookie_Settings();
    g_AGC_bAllowRepeats = false;
    g_bAllowCorrectLettersToChange = true;
    g_bShowCorrectLetters = false;
    g_bShowIntermediateToasts = false;
    g_TC_ShadeBackgroundOnStatus_bActive = false;
    g_TC_SyncGridAndSpecialClueAnswers_bActive = false;
    g_TC_ShowScratchArea = false;
    g_TC_ShowCorrectInScratchArea = false;
    DM_UpdatesAfterDifficultyLevelChange()
}

function DM_AdjustSettingsForDifficultyLevel_Hard()
{
    g_Difficulty_iLevel_Operating = g_Difficulty_iLevel_Hard;
    g_Difficulty_iLevel_Settings = g_Difficulty_iLevel_Hard;
    StoreCookie_Settings();
    g_AGC_bAllowRepeats = false;
    g_bAllowCorrectLettersToChange = true;
    g_bShowCorrectLetters = false;
    g_bShowIntermediateToasts = false;
    g_TC_ShadeBackgroundOnStatus_bActive = false;
    g_TC_SyncGridAndSpecialClueAnswers_bActive = false;
    g_TC_ShowScratchArea = true;
    g_TC_ShowCorrectInScratchArea = false;
    DM_UpdatesAfterDifficultyLevelChange()
}

function DM_AdjustSettingsForDifficultyLevel_Easy()
{
    g_Difficulty_iLevel_Operating = g_Difficulty_iLevel_Easy;
    g_Difficulty_iLevel_Settings = g_Difficulty_iLevel_Easy;
    StoreCookie_Settings();
    g_AGC_bAllowRepeats = false;
    g_bAllowCorrectLettersToChange = false;
    g_bShowCorrectLetters = true;
    g_bShowIntermediateToasts = true;
    g_TC_ShadeBackgroundOnStatus_bActive = true;
    g_TC_SyncGridAndSpecialClueAnswers_bActive = true;
    g_TC_ShowScratchArea = true;
    g_TC_ShowCorrectInScratchArea = true;
    DM_UpdatesAfterDifficultyLevelChange()
}

function DM_ShowCount()
{
    let iShowExtra = 1;
    switch ( g_iGridWidth )
    {
        case 4: iShowExtra = 1; break;
        case 5: iShowExtra = 1; break;
        case 6: iShowExtra = 2; break;
        case 7: iShowExtra = 2; break;
        case 8: iShowExtra = 3; break;
        default: break;
    }
    return iShowExtra;
}

function DM_ChangeToLevelHard_NoSuppress()
{
    DM_ChangeToLevelHard(false)
}

function DM_ChangeToLevelHard_Suppress()
{
    DM_ChangeToLevelHard(true)
}


function DM_ChangeToLevelHard(bSuppressNewShows)
{
    DM_AdjustSettingsForDifficultyLevel_Hard()
    let iShowExtra = DM_ShowCount();
    let iShown = 0;
    if ( bSuppressNewShows )
        return;
    while (iShown < iShowExtra && !g_bGridSolved ) 
    {
        iShown++;
        SG_ShowExtraClue(false)
    }     
}

function DM_ChangeToLevelEasy_NoSuppress()
{
    DM_ChangeToLevelEasy(false);
}

function DM_ChangeToLevelEasy(bSuppressNewShows)
{
    if ( g_Difficulty_iLevel_Operating ==  g_Difficulty_iLevel_Expert )
        DM_ChangeToLevelHard(bSuppressNewShows);
    DM_AdjustSettingsForDifficultyLevel_Easy()
    let iShowExtra = DM_ShowCount();
    let iShown = 0;
    let bSpecial = true;
    g_bGridAndCA = true;
    if ( bSuppressNewShows )
        return;
    while (iShown < iShowExtra && !g_bGridSolved ) 
    {
        iShown++;
        SG_ShowExtraClue(bSpecial);
        bSpecial = false;
    }
}

// use this so has cookie g_Difficulty_iLevel_Operating

function DM_Difficulty_Level_DefaultLevelExpert()
{
    g_Difficulty_iLevel_OnNewPuzzle = g_Difficulty_iLevel_Expert;
    StoreCookie_Settings();
    DM_Difficulty_SetLevelExpert();
}

function DM_Difficulty_Level_DefaultLevelHard()
{
    g_Difficulty_iLevel_OnNewPuzzle = g_Difficulty_iLevel_Hard;
    StoreCookie_Settings();
    DM_ChangeToLevelHard(true);
}

function DM_Difficulty_Level_DefaultLevelEasy()
{
    g_Difficulty_iLevel_OnNewPuzzle = g_Difficulty_iLevel_Easy;
    StoreCookie_Settings();
    DM_ChangeToLevelEasy(false);
}

function DM_Dispatch(elem)
{
    if ( g_bGridSolved ) return;
    let sID = elem.id;
    switch ( sID )
    {
        case 'DM_Expert':
        { // we never take action when this button is pressed - cannot go back 
            break;
        }
        case 'DM_Hard':
        {
            if ( g_Difficulty_iLevel_Operating == g_Difficulty_iLevel_Expert )
            {
                if ( g_bConnectionIsWebBased )
                    DialogBox_SetupAndOpen(g_Dialog_SetDifficultyLevel_iTop, g_Dialog_SetDifficultyLevel_iLeft, 
                    'DM_ConfirmSetting',
                    'Do you want to set \'Hard\' as your default level?', 
                    'Yes', DM_Difficulty_Level_DefaultLevelHard,
                    'No', DM_ChangeToLevelHard_NoSuppress,
                    '', '')
                else
                DM_ChangeToLevelHard(false);
            }
            break;
        }
        case 'DM_Easy':
        {
            if ( g_Difficulty_iLevel_Operating ==  g_Difficulty_iLevel_Easy)
                break;
            if ( g_bConnectionIsWebBased )
                DialogBox_SetupAndOpen(g_Dialog_SetDifficultyLevel_iTop, g_Dialog_SetDifficultyLevel_iLeft, 
                'DM_ConfirmSetting',
                'Do you want to set \'Easy\' as your default level for new puzzles?', 
                'Yes', DM_Difficulty_Level_DefaultLevelEasy,
                'No', DM_ChangeToLevelEasy_NoSuppress,
                '', '')
            else
                DM_ChangeToLevelEasy_NoSuppress();
            break;
        }
        default:
            break;
    }
}
