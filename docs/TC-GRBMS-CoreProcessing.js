// TC-GRBMS-CoreProcessing.js

function GRB_onfocus(elem)
{
    let sThisId = elem.id;
    GRB_DirectionControl(sThisId);
    GRB_LoseCurrentFocus();
    let iThisRow     = GRB_RowFromId(sThisId);
    let iThisLetter  = GRB_LetterFromId(sThisId);
    if ( !GRB_ForRowLetter_IsSquareValidForFocus(iThisRow, iThisLetter) )
    {
        setlineAdd('INVALID:' + sThisId)        
        return;
    }
    GRB_ForRowLetter_SetButton(iThisRow, iThisLetter,  g_cCode_HasFocus);
    if ( g_GRB_bShowSelectRowColumn )
    {
        if ( g_GRB_bAcross )
            GRB_SetActiveRow(sThisId)
        else
            GRB_SetActiveLetter(sThisId)
    }
    SyncTo_OthersLoseFocus('GR');
    TC_CR_SetStatus('Deselect', true);
    g_GRB_Focus_sId = sThisId;
}    

function GRB_LoseCurrentFocus()
{
    if ( g_GRB_Focus_sId == '')
        return;
    GRB_ClearOldActiveRow(g_GRB_Focus_sId);
    GRB_ClearOldActiveColumn(g_GRB_Focus_sId);
    let iRow = GRB_RowFromId(g_GRB_Focus_sId);
    let iLetter = GRB_LetterFromId(g_GRB_Focus_sId);
    GRB_ForRowLetter_SetButton(iRow, iLetter, g_cCode_Inactive);
    let elem = document.getElementById(g_GRB_Focus_sId);
    elem.style.cursor="default";
    let elemWithFocus = document.getElementById(g_GRB_Focus_sId);
    elemWithFocus.blur();
    g_GRB_Focus_sId = '';
}
