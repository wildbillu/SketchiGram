// TC-MiniActionsMenu.js
//
var g_TC_MAM_siDOnClick_CAB = '';
var g_TC_MAM_siDOnClick_GRB = '';
var g_TC_MAM_aIds        = [];

var g_TC_MAM_sClass_Enabled = 'MAM_MenuItem_Base MAM_MenuItem_Enabled';
var g_TC_MAM_sClass_Disabled = 'MAM_MenuItem_Base MAM_MenuItem_Disabled';
var g_TC_MAM_sClass_Selected = 'MAM_MenuItem_Base MAM_MenuItem_Selected';

function MAM_ConfirmReset_Open()
{
    DialogBox_SetupAndOpen(
        g_Dialog_ResetPuzzle_iTop, g_Dialog_ResetPuzzle_iLeft,  
        'MAM_ConfirmReset',
        'Are you sure you want to reset the puzzle?', 
        'Yes', Action_ResetPuzzle,
        'No', DialogBox_NoAction,
        '', '')
}

function MAM_ResetPuzzle()
{
    MAM_ConfirmReset_Open();
}

function MAM_SetMenuItemClass(sId, bEnabled)
{
    let elem = document.getElementById(sId);
    let sClass = g_TC_MAM_sClass_Enabled;
    if ( !bEnabled )
        sClass = g_TC_MAM_sClass_Disabled; 
    elem.className = sClass;
}

function MAM_EnableDisable()
{
    MAM_SetMenuItemClass('MAM_SolvePuzzle', !g_bGridSolved);
    MAM_SetMenuItemClass('MAM_ResetPuzzle', g_bGridSolved)
//
    let elemClues = document.getElementById("SG_Clues_Div");
//
    let bShowCluesEnabled = false;
    if ( window.getComputedStyle(elemClues).visibility === "hidden" ) 
        bShowCluesEnabled = true;
    MAM_SetMenuItemClass('MAM_ShowClues', bShowCluesEnabled);
    let bRevealSquareEnabled = false;
    if ( g_CAB_Focus_sId != '' )
        bRevealSquareEnabled = true;
    if ( g_GRBMS_Focus_sId != '' )
        bRevealSquareEnabled = true;
    if ( g_bGridSolved )
        bRevealSquareEnabled = false;
    MAM_SetMenuItemClass('MAM_RevealSquare', bRevealSquareEnabled)
}

function MAM_SolvePuzzle()
{
    if ( g_bPuzzleSolved)
        return;
    DialogBox_SetupAndOpen(
        g_Dialog_SolvePuzzle_iTop, g_Dialog_SolvePuzzle_iLeft,  
        'MAM_ConfirmSolve',
        'Are you sure you want to solve the puzzle?', 
        'Yes', Action_SolvePuzzle,
        'No', DialogBox_NoAction,
        '', '')
}

function TC_MAM_MakeDiv()
{    
    let sMAMInner = TC_MAM_MakeInnerHTML();
    let sInner = '<DIV Id="MAM_Div" class="MAM_Div TC_StartHidden" align=center>' + sMAMInner + '</DIV>';
    return sInner;
}

function MAM_SetPosition()
{
    let elemMAM = document.getElementById("MAM_Div");
    elemMAM.style.top = MakePixelString(g_MAM_iTop);
    let rectMAM = GetBoundingClientRectAbsolute(elemMAM);
    let iLeft = g_Window_iWidth - rectMAM.width - g_TC_Padding_Left_iSize;
    elemMAM.style.left = MakePixelString(iLeft);
    MAM_EnableDisable();
}

function MAM_Dispatch(elem)
{
    let sID = elem.id;
    switch ( sID )
    {
        case 'MAM_RevealSquare': MAM_RevealSquare(); break;
        case 'MAM_ShowClues'   : MAM_ShowClues(); break;
        case 'MAM_SolvePuzzle' : MAM_SolvePuzzle(); break;
        case 'MAM_ResetPuzzle' : MAM_ResetPuzzle(); break;
        default: break;
    }
    MAM_EnableDisable();
}

function TC_MAM_MakeInnerHTML()
{
    g_TC_MAM_aIds.length = 0;
    let sMAM = '';
    sMAM += '<DIV Id="MAM_Header" class="MAM_Header">Actions</DIV>';
    let sId = '';
    let sClass = '';
    sId = 'MAM_RevealSquare';
    sClass = g_TC_MAM_sClass_Disabled;
    sMAM += '<DIV Id="' + sId + '" class="' + sClass + '" onclick="MAM_Dispatch(this);"> <DIV>Reveal</DIV><DIV>Square</DIV></DIV>';
    g_TC_MAM_aIds.push(sId);
    sMAM += '<DIV " class="MAM_MenuItem_Spacer"></DIV>';
    sId = 'MAM_ShowClues';
    sClass = g_TC_MAM_sClass_Disabled;
    sMAM += '<DIV Id="' + sId + '" class="' + sClass + '" onclick="MAM_Dispatch(this);"> <DIV>Show</DIV><DIV>Clues</DIV></DIV>';
    g_TC_MAM_aIds.push(sId);
    sMAM += '<DIV " class="MAM_MenuItem_Spacer"></DIV>';
    sId = 'MAM_SolvePuzzle';
    sClass = g_TC_MAM_sClass_Disabled;
    sMAM += '<DIV Id="' + sId + '" class="' + sClass + '" onclick="MAM_Dispatch(this);"> <DIV>Solve</DIV><DIV>Puzzle</DIV></DIV>';
    g_TC_MAM_aIds.push(sId);
    sMAM += '<DIV " class="MAM_MenuItem_Spacer"></DIV>';
    sId = 'MAM_ResetPuzzle';
    sClass = g_TC_MAM_sClass_Enabled;
    sMAM += '<DIV Id="' + sId + '" class="' + sClass + '" onclick="MAM_Dispatch(this);"> <DIV>Reset</DIV><DIV>Puzzle</DIV></DIV>';
    g_TC_MAM_aIds.push(sId);
    return sMAM;
}



