// TC-DifficultyMenu.js
//
var g_DM_siDOnClick_CAB = '';
var g_DM_siDOnClick_GRB = '';
var g_DM_siDOnClick_SA = '';
var g_DM_aIds        = [];

var g_Difficulty_iLevel_Expert = 3;
var g_Difficulty_iLevel_Hard = 2;
var g_Difficulty_iLevel_Easy = 1;
var g_Difficulty_iLevel_Invalid = -1;

var g_Difficulty_iLevel_Operating = g_Difficulty_iLevel_Expert;
var g_Difficulty_iLevel_Settings = g_Difficulty_iLevel_Expert;
var g_Difficulty_iLevel_OnNewPuzzle = g_Difficulty_iLevel_Expert;

var g_DM_sClass_Enabled = 'DM_MenuItem_Base DM_MenuItem_Enabled';
var g_DM_sClass_Disabled = 'DM_MenuItem_Base DM_MenuItem_Disabled';
var g_DM_sClass_Selected = 'DM_MenuItem_Base DM_MenuItem_Selected';

function DM_SetButtons()
{
    if ( g_bPuzzleSolved )
    {
        if ( g_Difficulty_iLevel_Operating != g_Difficulty_iLevel_Expert) 
            DM_SetMenuItemClass('DM_Expert', g_DM_sClass_Disabled);
        else
            DM_SetMenuItemClass('DM_Expert', g_DM_sClass_Selected);
        if ( g_Difficulty_iLevel_Operating != g_Difficulty_iLevel_Hard ) 
            DM_SetMenuItemClass('DM_Hard', g_DM_sClass_Disabled);
        else
            DM_SetMenuItemClass('DM_Hard', g_DM_sClass_Selected);
        if ( g_Difficulty_iLevel_Operating != g_Difficulty_iLevel_Easy ) 
            DM_SetMenuItemClass('DM_Easy', g_DM_sClass_Disabled);
        else
            DM_SetMenuItemClass('DM_Easy', g_DM_sClass_Selected);
        return;
    }
    sClassNotSelected = g_DM_sClass_Disabled;
    if ( g_Difficulty_iLevel_Operating == g_Difficulty_iLevel_Expert ) 
    {
        DM_SetMenuItemClass('DM_Expert', g_DM_sClass_Selected);
        DM_SetMenuItemClass('DM_Hard', g_DM_sClass_Enabled);
        DM_SetMenuItemClass('DM_Easy', g_DM_sClass_Enabled);
        return;
    }
    if ( g_Difficulty_iLevel_Operating == g_Difficulty_iLevel_Hard ) 
    {
        DM_SetMenuItemClass('DM_Expert', g_DM_sClass_Disabled);
        DM_SetMenuItemClass('DM_Hard', g_DM_sClass_Selected);
        DM_SetMenuItemClass('DM_Easy', g_DM_sClass_Enabled);
        return;
    }
    DM_SetMenuItemClass('DM_Expert', g_DM_sClass_Disabled);
    DM_SetMenuItemClass('DM_Hard', g_DM_sClass_Disabled);
    DM_SetMenuItemClass('DM_Easy', g_DM_sClass_Selected);
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

function DM_MakeDiv()
{    
    let sDMInner = DM_MakeInnerHTML()
    let sInner = '<DIV Id="DM_Div" class="DM_Div TC_StartHidden">' + sDMInner + '</DIV>';
    return sInner;
}

function DM_MakeInnerHTML()
{
    g_DM_aIds.length = 0;
    let sDM = '';
    let sId = '';
    let sClass = ''
    sDM += '<DIV Id="DM_Header" class="DM_Header">Difficulty</DIV>';
    sId = 'DM_Expert';
    sClass = g_DM_sClass_Disabled;
    switch ( g_Difficulty_iLevel_Operating )
    {
        case 3: sClass = g_DM_sClass_Selected; break;
        case 2: sClass = g_DM_sClass_Disabled; break;
        case 1: sClass = g_DM_sClass_Disabled; break;
    }
    sDM += '<DIV Id="' + sId + '" class="' + sClass + '" onclick="DM_Dispatch(this);">Expert</DIV>';
    g_DM_aIds.push(sId);

    sId = 'DM_Hard';
    switch ( g_Difficulty_iLevel_Operating )
    {
        case 3: sClass = g_DM_sClass_Enabled; break;
        case 2: sClass = g_DM_sClass_Selected; break;
        case 1: sClass = g_DM_sClass_Disabled; break;
    }
    sDM += '<DIV Id="' + sId + '" class="' + sClass + '" onclick="DM_Dispatch(this);">Hard</DIV>';
    g_DM_aIds.push(sId);

    sId = 'DM_Easy';
    switch ( g_Difficulty_iLevel_Operating )
    {
        case 3: sClass = g_DM_sClass_Enabled; break;
        case 2: sClass = g_DM_sClass_Enabled; break;
        case 1: sClass = g_DM_sClass_Selected; break;
    }
    sDM += '<DIV Id="' + sId + '" class="' + sClass + '"" onclick="DM_Dispatch(this);">Easy</DIV>';
    g_DM_aIds.push(sId);
    return sDM;
}
