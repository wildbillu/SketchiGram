// TC-DifficultyMenu.js
//
var g_TC_DM_siDOnClick_CAB = '';
var g_TC_DM_siDOnClick_GRB = '';
var g_TC_DM_aIds        = [];

var g_TC_DM_sClass_Enabled = 'DM_MenuItem_Base DM_MenuItem_Enabled';
var g_TC_DM_sClass_Disabled = 'DM_MenuItem_Base DM_MenuItem_Disabled';
var g_TC_DM_sClass_Selected = 'DM_MenuItem_Base DM_MenuItem_Selected';

function DM_SetButtonsWhenSolved()
{
    if ( g_DifficultyLevel_iLevel != 3 ) DM_SetMenuItemClass('DM_Export', g_TC_DM_sClass_Disabled);
    if ( g_DifficultyLevel_iLevel != 2 ) DM_SetMenuItemClass('DM_Hard', g_TC_DM_sClass_Disabled);
    if ( g_DifficultyLevel_iLevel != 1 ) DM_SetMenuItemClass('DM_Easy', g_TC_DM_sClass_Disabled);
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

function DM_ChangeToLevel2()
{
    let iShowExtra = DM_ShowCount();
    let iShown = 0;
    while (iShown < iShowExtra && !g_bGridSolved ) 
    {
        iShown++;
        SG_ShowExtraClue(false)
    }        
}

function DM_ChangeToLevel1()
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
}

// use this so has cookie g_DifficultyLevel_iLevel
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
            if ( g_DifficultyLevel_iLevel == 3 )
            {
                DM_SetMenuItemClass('DM_Expert', g_TC_DM_sClass_Disabled);
                DM_SetMenuItemClass('DM_Hard', g_TC_DM_sClass_Selected);
                g_DifficultyLevel_iLevel = 2;
                DM_ChangeToLevel2();
            }
            break;
        }
        case 'DM_Easy':
        {
            if ( g_DifficultyLevel_iLevel ==  1)
            {
                break;
            }
            if ( g_DifficultyLevel_iLevel ==  3 )
            {
                DM_SetMenuItemClass('DM_Expert', g_TC_DM_sClass_Disabled);
                DM_ChangeToLevel2();
            }
            DM_SetMenuItemClass('DM_Hard', g_TC_DM_sClass_Disabled);
            DM_SetMenuItemClass('DM_Easy', g_TC_DM_sClass_Selected);
            DM_ChangeToLevel1();
            g_DifficultyLevel_iLevel = ``;
            break;
        }
        default:
            break;
    }
}

function TC_DM_MakeDiv()
{    
    let sDMInner = TC_DM_MakeInnerHTML()
    let sInner = '<DIV Id="DM_Div" class="DM_Div" align=center>' + sDMInner + '</DIV>';
    return sInner;
}

function TC_DM_MakeInnerHTML()
{
    g_TC_DM_aIds.length = 0;
    let sDM = '';
    let sId = '';
    sDM += '<DIV Id="DM_Header" class="DM_Header">Difficulty</DIV>';
    sId = 'DM_Expert';
    let sClass = g_TC_DM_sClass_Disabled;
    switch ( g_DifficultyLevel_iLevel )
    {
        case 3: sClass = g_TC_DM_sClass_Selected; break;
        case 2: sClass = g_TC_DM_sClass_Disabled; break;
        case 1: sClass = g_TC_DM_sClass_Disabled; break;
    }
    sDM += '<DIV Id="' + sId + '" class="' + sClass + '" onclick="DM_Dispatch(this);">Expert</DIV>';
    g_TC_DM_aIds.push(sId);

    sId = 'DM_Hard';
    switch ( g_DifficultyLevel_iLevel )
    {
        case 3: sClass = g_TC_DM_sClass_Enabled; break;
        case 2: sClass = g_TC_DM_sClass_Selected; break;
        case 1: sClass = g_TC_DM_sClass_Disabled; break;
    }
    sDM += '<DIV Id="' + sId + '" class="' + sClass + '" onclick="DM_Dispatch(this);">Hard</DIV>';
    g_TC_DM_aIds.push(sId);

    sId = 'DM_Easy';
    switch ( g_DifficultyLevel_iLevel )
    {
        case 3: sClass = g_TC_DM_sClass_Enabled; break;
        case 2: sClass = g_TC_DM_sClass_Enabled; break;
        case 1: sClass = g_TC_DM_sClass_Selected; break;
    }
    sDM += '<DIV Id="' + sId + '" class="' + sClass + '"" onclick="DM_Dispatch(this);">Easy</DIV>';
    g_TC_DM_aIds.push(sId);
    return sDM;
}

function TC_DM_FixWidthsReturnHeight(iWidth)
{
    elemSmartMoveButton = document.getElementById("SG_AM_SmartMove_Button");
    elemSmartMoveButton.style.left = MakePixelString(20);
    elemSmartMoveButton.style.top = MakePixelString(0);
    SG_ActionMenu_SetCheckBoxes();
    var iTotalHeight = 0; 
    for ( var iItem = 0; iItem < g_SG_ActionMenu_aIds.length; iItem++ )
    {
        var elemItem = document.getElementById(g_SG_ActionMenu_aIds[iItem]);
        elemItem.style.width = MakePixelString(iWidth)
        var rectItem = elemItem.getBoundingClientRect();
        iTotalHeight += rectItem.height;
    }
    return iTotalHeight;
}

function TC_DM_SizeAndPosition()
{
    let iWidth = 200;
    let elemActionMenuDiv = document.getElementById("SG_ActionMenu_Div")
    elemActionMenuDiv.style.top = MakePixelString(g_ActionMenu_iTop);
    elemActionMenuDiv.style.left = MakePixelString(g_ActionMenu_iLeft);
    elemActionMenuDiv.style.width = MakePixelString(iWidth);
    iTotalHeight = SG_ActionMenu_FixWidthsReturnHeight(iWidth);
    elemActionMenuDiv.style.height = MakePixelString(iTotalHeight);
    elemActionMenuDiv.style.zIndex = 2;
}
