// TC-Keyboard-Dispatch.js

function KB_SetupAndAdjust()
{
    if ( g_KB_Active_Mini )
    {
        let iKBWidth = g_iGridWidth * g_GRBMS_Square_iSize;
        let iKBRows = KB_Mini_Setup(iKBWidth);
        KB_Mini_Adjust(iKBRows);
        return;
    }
    KB_AllGridChars_Setup();
    KB_AllGridChars_Adjust(true);
}

function KB_SetUsageMode(sUsageMode)
{
    if ( g_KB_Active_Mini )
    {
        KB_Mini_SetUsageMode(sUsageMode)
        return;
    }
    KB_Mini_SetUsageMode(sUsageMode)
}

function KB_SpecialButtonEnable(b)
{
    if ( g_KB_Active_Mini )
    {
        KB_Mini_SpecialButtonEnable(b)
        return;
    }
}
function KB_DisableLettersFullyPlaced()
{
    if ( g_KB_Active_Mini )
    {
        KB_Mini_DisableLettersFullyPlaced()
        return;
    }
}