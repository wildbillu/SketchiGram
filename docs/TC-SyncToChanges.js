// TC-SyncToChanges.js

let g_SyncTo_KB_sActiveUsageMode = '';
let g_SyncTo_LastWithFocus = 'NoOne';

function SyncTo_OthersLoseFocus(sFocusIs)
{
    if ( sFocusIs == 'NoOne' && g_SyncTo_LastWithFocus != 'NoOne' )
    {
        TC_SA_LoseFocus();
        CAB_FocusLostSetActiveToInActive();
        GRBMS_LoseCurrentFocus();
        if ( g_SyncTo_KB_sActiveUsageMode != g_KB_Mini_sUsageMode_Idle )
        {
            KB_SetUsageMode(g_KB_Mini_sUsageMode_Idle);
        }
    }
    else if ( sFocusIs == 'GR' && g_SyncTo_LastWithFocus != 'GR' )
    {
        TC_SA_LoseFocus();
        CAB_FocusLostSetActiveToInActive();
        if ( g_SyncTo_KB_sActiveUsageMode != g_KB_Mini_sUsageMode_ActiveGrid )
            KB_SetUsageMode(g_KB_Mini_sUsageMode_ActiveGrid);
    }
    else if ( sFocusIs == 'CA' && g_SyncTo_LastWithFocus != 'CA' )
    {
        TC_SA_LoseFocus();
        GRBMS_LoseCurrentFocus();
        if ( g_SyncTo_KB_sActiveUsageMode != g_KB_Mini_sUsageMode_SpecialClue )
            KB_SetUsageMode(g_KB_Mini_sUsageMode_SpecialClue);
    }
    else if ( sFocusIs == 'SA' && g_SyncTo_LastWithFocus != 'SA' )
    {
        CAB_FocusLostSetActiveToInActive();
        GRBMS_LoseCurrentFocus();
        if ( g_SyncTo_KB_sActiveUsageMode != g_KB_Mini_sUsageMode_ActiveWords )
            KB_SetUsageMode(g_KB_Mini_sUsageMode_ActiveWords);
    }
    g_SyncTo_LastWithFocus = sFocusIs;
    if ( g_MAM_bActive) MAM_EnableDisable();
}

function Sync_CAChange()
{
    if ( g_bGridAndCA )
    {
        if ( TC_SyncGridToSpecialAnswers() )
            TC_SyncSpecialAnswersToGrid();
    }
    if ( g_MAM_bActive) MAM_EnableDisable();
}

function Sync_GridChange()
{
    if ( g_bGridAndCA )
    {
        if ( TC_SyncSpecialAnswersToGrid() )
            TC_SyncGridToSpecialAnswers();
    }
    if ( g_MAM_bActive) MAM_EnableDisable();
}
