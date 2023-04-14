// TC-SG2-Positioning.js

function SG2_Adjust_GridPosition(iGap)
{
    g_TC_iBiggestBottom += iGap;
// instruction line goes before the grid 
    let iWidthGrid = g_iGridWidth * g_GRBMS_Square_iSize;
    let iHeightGrid = g_iGridHeight * g_GRBMS_Square_iSize;
    let iLeftForPositioning = TC_LeftForCentering(iWidthGrid);
    if ( g_Grid_sJustification == 'right' )
        iLeftForPositioning = g_Window_iWidth - iWidthGrid;
    if ( g_HowTo_bActive )
    {
        let elemHowToA = document.getElementById("SG_HowToA_Div");
        elemHowToA.style.width = MakePixelString(iWidthGrid);
        g_TC_iBiggestBottom = g_HowTo_iTop;
        elemHowToA.style.top = MakePixelString(g_TC_iBiggestBottom);
        elemHowToA.style.left = MakePixelString(iLeftForPositioning);
        // make the width the width of the grid
        elemHowToA.style.width = MakePixelString(iWidthGrid);
        let rectelemHowToA = elemHowToA.getBoundingClientRect();
        g_TC_iBiggestBottom += rectelemHowToA.height;
    }
    else
    {
        g_TC_iBiggestBottom = g_Grid_iTopIfNoHowTo;
    }
//
    let elemGrid = document.getElementById('Div_Grid');
    elemGrid.style.top = MakePixelString(g_TC_iBiggestBottom)
    elemGrid.style.width = MakePixelString(iWidthGrid);
    elemGrid.style.height = MakePixelString(iHeightGrid);
// put the grid in the middle
    elemGrid.style.left = MakePixelString(iLeftForPositioning);
    g_TC_iBiggestBottom += iHeightGrid;
}

let iButtonSize = 40;
function SG2_SetSizes(iMaxGridWidth)
{
    iButtonSize = Math.round(iMaxGridWidth/g_iGridWidth);
// SG2 Only
    if ( g_bPrintedFormat ) 
    {
        switch ( g_iGridWidth )
        {
            case 4:
                iButtonSize = 90;
                break;
            case 5:
                iButtonSize = 70;
                break;
            case 6:
                iButtonSize = 50;
                break;
            case 7:
                iButtonSize = 40;
                break;
        }
    }
//
    g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_40 TC_Button_Square_Character_40 TC_Button_Square_Absolute';
    g_GRBMS_Square_iSize = 40;
    if ( iButtonSize > 49 )
    {
        g_GRBMS_Square_iSize = 50;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_50 TC_Button_Square_Character_50 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 59 )
    {
        g_GRBMS_Square_iSize = 60;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_60 TC_Button_Square_Character_60 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 69 )
    {
        g_GRBMS_Square_iSize = 70;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_70 TC_Button_Square_Character_70 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 79 )
    {
        g_GRBMS_Square_iSize = 80;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_80 TC_Button_Square_Character_80 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 89 )
    {
        g_GRBMS_Square_iSize = 90;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_90 TC_Button_Square_Character_90 TC_Button_Square_Absolute';
    }
}
