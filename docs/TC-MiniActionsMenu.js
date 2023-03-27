// TC-MiniActionsMenu.js
//
var g_TC_MAM_siDOnClick_CAB = '';
var g_TC_MAM_siDOnClick_GRB = '';
var g_TC_MAM_aIds        = [];

var g_TC_MAM_sClass_Enabled = 'MAM_MenuItem_Base MAM_MenuItem_Enabled';
var g_TC_MAM_sClass_Disabled = 'MAM_MenuItem_Base MAM_MenuItem_Disabled';
var g_TC_MAM_sClass_Selected = 'MAM_MenuItem_Base MAM_MenuItem_Selected';

function MIM_Reset_GoAhead()
{
}

function MIM_Reset_Cancel()
{
}

function MAM_ConfirmBox_Setup()
{
    let elemConfirmBox = document.getElementById("MAM_Confirm");
    let sInner = '';
    sInner += '<dialog open class="MAM_Confirm_Dialog">'
    sInner += '<div class="MAM_Confirm_Text">Do you really want reset the puzzle?</div>'
    sInner += '<div class="MAM_Confirm_Buttons">'
    sInner += '<button class="MAM_Confirm_CancelButton" onclick="MIM_Reset_Cancel();" type="button">Cancel</button>'
    sInner += '<button class="MAM_Confirm_GoAhead" onclick="MIM_Reset_GoAhead();" type="button">Yes</button>'
    sInner += '</div>'
    sInner += '</dialog>'
    elemConfirmBox.innerHTML = sInner;
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

function MAM_RevealSquare()
{
    if ( CAB_ShowCheckActiveSquare('Show') ) // this will take care of call to sync_CAChange as needed
    { // want to move focus
        let iRow = CAB_RowFromId(g_CAB_Focus_sId);
        let iLetter = CAB_LetterFromId(g_CAB_Focus_sId);
        CAB_SetFocusToNext(iRow, iLetter);
        return;
    }        
    SG_ShowCheckActiveSquare('Show'); // this will take care of call to sync_gridChange as needed
}

function MAM_ShowClues()
{
    SG_ResetAnswerFromAnswersCorrectInGrid();
    SG_CA_UpdateAndSetVisibility(true);
}

function MAM_SolvePuzzle()
{
    Dropdown_More_SolvePuzzle();
}

function MAM_ResetPuzzle()
{
    if ( !confirm("This will reset puzzle.  Do you want to continue?") )
        return;
    Dropdown_More_ResetPuzzle();
}

function TC_MAM_MakeDiv()
{    
    let sMAMInner = TC_MAM_MakeInnerHTML();
    let sInner = '<DIV Id="MAM_Div" class="MAM_Div" align=center>' + sMAMInner + '</DIV>';
    return sInner;
}

function MAM_SetPosition()
{
    let elemMAM = document.getElementById("MAM_Div");
    elemMAM.style.top = g_MAM_iTop;
    elemMAM.style.left = g_MAM_iLeft;
    MAM_EnableDisable();
//    MAM_ConfirmBox_Setup();
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



