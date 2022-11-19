// TC-GRBMS.js

function GRBMS_SetSizes()
{
// decide on button size based upon grid size
// looking for the grid to be around 200
// our choices are 40, 50, 60 
    var iHalfWidth = g_TC_iBiggestRight/2;
    var iButtonSize = Math.round(iHalfWidth/g_iGridWidth);
    g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_40 TC_Button_Square_Absolute';
    g_GRBMS_Square_iSize = 40;
    if ( iButtonSize > 49 )
    {
        g_GRBMS_Square_iSize = 50;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_50 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 59 )
    {
        g_GRBMS_Square_iSize = 60;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_60 TC_Button_Square_Absolute';
    }
// we can alter CAB size here also
    g_GRBMS_CAB_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_30 TC_Button_Square_Relative';
    g_GRBMS_CAB_Square_iSize = 30;
}


