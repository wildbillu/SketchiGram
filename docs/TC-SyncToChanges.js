// TC-SyncToChanges.js

function Sync_FocusChange(sFocusWith)
{
    if ( sFocusWith == 'GR')
    {
        
    }
    if ( sFocusWith == 'CA')
    {
        
    }
    if ( sFocusWith == 'SA')
    {
        
    }
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
