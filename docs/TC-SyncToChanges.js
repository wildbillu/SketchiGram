// TC-SyncToChanges.js

let g_SyncTo_LastWithFocus = 'NoOne';

function SyncTo_OthersLoseFocus(sFocusIs)
{
    if ( sFocusIs == 'NoOne' && g_SyncTo_LastWithFocus != 'NoOne' )
    {
        CAB_FocusLostSetActiveToInActive();
        GRB_LoseCurrentFocus();
        TC_CR_SetStatus('Deselect', false);
    }
    else if ( sFocusIs == 'GR' && g_SyncTo_LastWithFocus != 'GR' )
    {
        CAB_FocusLostSetActiveToInActive();
    }
    else if ( sFocusIs == 'CA' && g_SyncTo_LastWithFocus != 'CA' )
    {
        GRB_LoseCurrentFocus();
    }
    else if ( sFocusIs == 'SA' && g_SyncTo_LastWithFocus != 'SA' )
    {
        CAB_FocusLostSetActiveToInActive();
        GRB_LoseCurrentFocus();
    }
    g_SyncTo_LastWithFocus = sFocusIs;
}
