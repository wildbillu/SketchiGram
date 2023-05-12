// TC-MiniActionsMenu-AffectingDifficultyLevel.js
//
function MAM_Action_ShowCluesHardToEasy()
{
    DM_AdjustSettingsForDifficultyLevel_Easy(); // does update and fixes menu
    DM_ChangeToLevelEasy(false);
}

function MAM_Action_ShowCluesExpertToEasy()
{
    DM_AdjustSettingsForDifficultyLevel_Easy(); // does update and fixes menu
    if ( CAB_ShowCheckActiveSquare('Show') ) // this will take care of call to sync_CAChange as needed
    { // want to move focus
        let iRow = CAB_RowFromId(g_CAB_Focus_sId);
        let iLetter = CAB_LetterFromId(g_CAB_Focus_sId);
        CAB_SetFocusToNext(iRow, iLetter);
        Status_Check(true);
//        return;
    }        
    SG_ShowCheckActiveSquare('Show'); // this will take care of call to sync_gridChange as needed
    Status_Check(true);
}

function MAM_Action_RevealSquareChangeExpertToHard()
{
    DM_AdjustSettingsForDifficultyLevel_Hard(); // does update and fixes menu
    if ( CAB_ShowCheckActiveSquare('Show') ) // this will take care of call to sync_CAChange as needed
    { // want to move focus
        let iRow = CAB_RowFromId(g_CAB_Focus_sId);
        let iLetter = CAB_LetterFromId(g_CAB_Focus_sId);
        CAB_SetFocusToNext(iRow, iLetter);
        Status_Check(true);
    }        
    SG_ShowCheckActiveSquare('Show'); // this will take care of call to sync_gridChange as needed
    Status_Check(true);
}

function MAM_ShowClues()
{
    if ( g_Difficulty_iLevel_Operating == g_Difficulty_iLevel_Expert )
    {
        DialogBox_SetupAndOpen(g_Dialog_ResetPuzzle_iTop, g_Dialog_ResetPuzzle_iLeft,  
            'MAM_ConfirmReset', 'This will change the Difficulty Level to Easy. Do you want to continue?', 
            'Yes', MAM_Action_ShowCluesExpertToEasy, 'No', DialogBox_NoAction, '', '')
    }
    else if ( g_Difficulty_iLevel_Operating == g_Difficulty_iLevel_Hard )
    {
        DialogBox_SetupAndOpen(g_Dialog_ResetPuzzle_iTop, g_Dialog_ResetPuzzle_iLeft,  
            'MAM_ConfirmReset', 'This will change the Difficulty Level to Easy. Do you want to continue?', 
            'Yes', MAM_Action_ShowCluesHardToEasy, 'No', DialogBox_NoAction, '', '')
    }
    else
    { // should not happen as button should be greyed
        SG_ResetAnswerFromAnswersCorrectInGrid();
        SG_CA_UpdateAndSetVisibility(true);
    }
}

function MAM_RevealSquare()
{
    if ( g_Difficulty_iLevel_Operating == g_Difficulty_iLevel_Expert )
    {
        DialogBox_SetupAndOpen(g_Dialog_ResetPuzzle_iTop, g_Dialog_ResetPuzzle_iLeft,  
            'MAM_ConfirmReset', 'This will change the Difficulty Level to Hard. Do you want to continue?', 
            'Yes', DM_ChangeToLevelHard_NoSuppress, 'No', DialogBox_NoAction, '', '');
    }            
    else
    {
        if ( CAB_ShowCheckActiveSquare('Show') ) // this will take care of call to sync_CAChange as needed
        { // want to move focus
            let iRow = CAB_RowFromId(g_CAB_Focus_sId);
            let iLetter = CAB_LetterFromId(g_CAB_Focus_sId);
            CAB_SetFocusToNext(iRow, iLetter);
            Status_Check(true);
            return;
        }        
        SG_ShowCheckActiveSquare('Show'); // this will take care of call to sync_gridChange as needed
        Status_Check(true);
    }
}
