// TC-DifficultyMenu.js
//
var g_TC_DM_siDOnClick_CAB = '';
var g_TC_DM_siDOnClick_GRB = '';
var g_TC_DM_siDOnClick_SA = '';
var g_TC_DM_aIds        = [];

var g_Difficulty_iLevel_Expert = 3;
var g_Difficulty_iLevel_Hard = 2;
var g_Difficulty_iLevel_Easy = 1;
var g_Difficulty_iLevel_Invalid = -1;


var g_Difficulty_iLevel_Operating = g_Difficulty_iLevel_Expert;
var g_Difficulty_iLevel_Settings = g_Difficulty_iLevel_Expert;
var g_Difficulty_iLevel_OnNewPuzzle = g_Difficulty_iLevel_Expert;

var g_TC_DM_sClass_Enabled = 'DM_MenuItem_Base DM_MenuItem_Enabled';
var g_TC_DM_sClass_Disabled = 'DM_MenuItem_Base DM_MenuItem_Disabled';
var g_TC_DM_sClass_Selected = 'DM_MenuItem_Base DM_MenuItem_Selected';

function DM_SetButtons()
{
    if ( g_bPuzzleSolved )
    {
        if ( g_Difficulty_iLevel_Operating != g_Difficulty_iLevel_Expert) 
            DM_SetMenuItemClass('DM_Expert', g_TC_DM_sClass_Disabled);
        else
            DM_SetMenuItemClass('DM_Expert', g_TC_DM_sClass_Selected);
        if ( g_Difficulty_iLevel_Operating != g_Difficulty_iLevel_Hard ) 
            DM_SetMenuItemClass('DM_Hard', g_TC_DM_sClass_Disabled);
        else
            DM_SetMenuItemClass('DM_Hard', g_TC_DM_sClass_Selected);
        if ( g_Difficulty_iLevel_Operating != g_Difficulty_iLevel_Easy ) 
            DM_SetMenuItemClass('DM_Easy', g_TC_DM_sClass_Disabled);
        else
            DM_SetMenuItemClass('DM_Easy', g_TC_DM_sClass_Selected);
        return;
    }
    sClassNotSelected = g_TC_DM_sClass_Disabled;
    if ( g_Difficulty_iLevel_Operating == g_Difficulty_iLevel_Expert ) 
    {
        DM_SetMenuItemClass('DM_Expert', g_TC_DM_sClass_Selected);
        DM_SetMenuItemClass('DM_Hard', g_TC_DM_sClass_Enabled);
        DM_SetMenuItemClass('DM_Easy', g_TC_DM_sClass_Enabled);
        return;
    }
    if ( g_Difficulty_iLevel_Operating == g_Difficulty_iLevel_Hard ) 
    {
        DM_SetMenuItemClass('DM_Expert', g_TC_DM_sClass_Disabled);
        DM_SetMenuItemClass('DM_Hard', g_TC_DM_sClass_Selected);
        DM_SetMenuItemClass('DM_Easy', g_TC_DM_sClass_Enabled);
        return;
    }
    DM_SetMenuItemClass('DM_Expert', g_TC_DM_sClass_Disabled);
    DM_SetMenuItemClass('DM_Hard', g_TC_DM_sClass_Disabled);
    DM_SetMenuItemClass('DM_Easy', g_TC_DM_sClass_Selected);
}

function DM_SetPosition()
{
    let elemDM = document.getElementById("DM_Div");
    elemDM.style.top = g_DM_iTop;
    elemDM.style.left = g_DM_iLeft;
}

function DM_SetMenuItemClass(sId, sClass)
{
    let elem = document.getElementById(sId);
    elem.className = sClass;
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

function DM_ChangeToLevelHard()
{
    let iShowExtra = DM_ShowCount();
    let iShown = 0;
    while (iShown < iShowExtra && !g_bGridSolved ) 
    {
        iShown++;
        SG_ShowExtraClue(false)
    }     
    TC_SetVisible("ScratchArea");
}

function DM_ChangeToLevelEasy()
{
    let iShowExtra = DM_ShowCount();
    let iShown = 0;
    let bSpecial = true;
    g_bGridAndCA = true;
    while (iShown < iShowExtra && !g_bGridSolved ) 
    {
        iShown++;
        SG_ShowExtraClue(bSpecial);
        bSpecial = false;
    }
    SG_ResetAnswerFromAnswersCorrectInGrid();
    CA_ClearIncorrect();
    SG_CA_UpdateAndSetVisibility(true);
    if ( g_MAM_bActive ) MAM_EnableDisable();
}

// use this so has cookie g_Difficulty_iLevel_Operating

function DM_Difficulty_Level_DefaultLevelHard()
{
    g_Difficulty_iLevel_Settings = g_Difficulty_iLevel_Hard;
    g_Difficulty_iLevel_OnNewPuzzle = g_Difficulty_iLevel_Hard;
    StoreCookie_Settings();
    DM_Difficulty_SetLevelHard();
}

function DM_Difficulty_Level_DefaultLevelEasy()
{
    g_Difficulty_iLevel_Settings = g_Difficulty_iLevel_Easy;
    g_Difficulty_iLevel_OnNewPuzzle = g_Difficulty_iLevel_Easy;
    StoreCookie_Settings();
    DM_Difficulty_SetLevelEasy();
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
                    'No', DM_Difficulty_SetLevelHard,
                    '', '')
                else
                    DM_Difficulty_SetLevelHard();
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
                'No', DM_Difficulty_SetLevelEasy,
                '', '')
            else
                DM_Difficulty_SetLevelEasy();
            break;
        }
        default:
            break;
    }
}

function DM_Difficulty_SetLevelEasy()
{
    if ( g_Difficulty_iLevel_Operating ==  g_Difficulty_iLevel_Expert )
    {
        DM_SetMenuItemClass('DM_Expert', g_TC_DM_sClass_Disabled);
        DM_ChangeToLevelHard();
    }
    DM_SetMenuItemClass('DM_Hard', g_TC_DM_sClass_Disabled);
    DM_SetMenuItemClass('DM_Easy', g_TC_DM_sClass_Selected);
    DM_ChangeToLevelEasy();
    g_Difficulty_iLevel_Operating = g_Difficulty_iLevel_Easy;
}

function DM_Difficulty_SetLevelHard()
{
    DM_ChangeToLevelHard();
    DM_SetMenuItemClass('DM_Expert', g_TC_DM_sClass_Disabled);
    DM_SetMenuItemClass('DM_Hard', g_TC_DM_sClass_Selected);
    g_Difficulty_iLevel_Operating = g_Difficulty_iLevel_Hard;
}

function TC_DM_MakeDiv()
{    
    let sDMInner = TC_DM_MakeInnerHTML()
    let sInner = '<DIV Id="DM_Div" class="DM_Div TC_StartHidden">' + sDMInner + '</DIV>';
    return sInner;
}

function TC_DM_MakeInnerHTML()
{
    g_TC_DM_aIds.length = 0;
    let sDM = '';
    let sId = '';
    sDM += '<DIV Id="DM_Header" class="DM_Header">Difficulty</DIV>';
    sId = 'DM_Expert';
//
    if ( g_Difficulty_iLevel_Settings != g_Difficulty_iLevel_Invalid )
    g_Difficulty_iLevel_Operating = g_Difficulty_iLevel_Settings;
    let sClass = g_TC_DM_sClass_Disabled;
    switch ( g_Difficulty_iLevel_Operating )
    {
        case 3: sClass = g_TC_DM_sClass_Selected; break;
        case 2: sClass = g_TC_DM_sClass_Disabled; break;
        case 1: sClass = g_TC_DM_sClass_Disabled; break;
    }
    sDM += '<DIV Id="' + sId + '" class="' + sClass + '" onclick="DM_Dispatch(this);">Expert</DIV>';
    g_TC_DM_aIds.push(sId);

    sId = 'DM_Hard';
    switch ( g_Difficulty_iLevel_Operating )
    {
        case 3: sClass = g_TC_DM_sClass_Enabled; break;
        case 2: sClass = g_TC_DM_sClass_Selected; break;
        case 1: sClass = g_TC_DM_sClass_Disabled; break;
    }
    sDM += '<DIV Id="' + sId + '" class="' + sClass + '" onclick="DM_Dispatch(this);">Hard</DIV>';
    g_TC_DM_aIds.push(sId);

    sId = 'DM_Easy';
    switch ( g_Difficulty_iLevel_Operating )
    {
        case 3: sClass = g_TC_DM_sClass_Enabled; break;
        case 2: sClass = g_TC_DM_sClass_Enabled; break;
        case 1: sClass = g_TC_DM_sClass_Selected; break;
    }
    sDM += '<DIV Id="' + sId + '" class="' + sClass + '"" onclick="DM_Dispatch(this);">Easy</DIV>';
    g_TC_DM_aIds.push(sId);
    return sDM;
}
