// TC-SG2-Positioning.js

function SG2_Adjust_GridAndPhantomGridPosition(iGap)
{
    g_TC_iBiggestBottom += iGap;
// instruction line goes before the grid 
    let iWidthGrid = g_iGridWidth * g_GRBMS_Square_iSize;
    let iHeightGrid = g_iGridHeight * g_GRBMS_Square_iSize;
    let iLeftForPositioning = TC_LeftForCentering(iWidthGrid);
    if ( g_Grid_sJustification == 'right' )
        iLeftForPositioning = g_TC_iBiggestRight - iWidthGrid;
    if ( g_bHowToActive )
    {
        let elemHowToA = document.getElementById("SG_HowToA_Div");
        elemHowToA.style.width = MakePixelString(iWidthGrid);
        g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
        elemHowToA.style.top = MakePixelString(g_TC_iBiggestBottom);
        elemHowToA.style.left = MakePixelString(iLeftForPositioning);
        // make the width the width of the grid
        elemHowToA.style.width = MakePixelString(iWidthGrid);
        let rectelemHowToA = elemHowToA.getBoundingClientRect();
        g_TC_iBiggestBottom += rectelemHowToA.height;
    }
//
    let elemGrid = document.getElementById('Div_Grid');
    elemGrid.style.top = MakePixelString(g_TC_iBiggestBottom)
    elemGrid.style.width = MakePixelString(iWidthGrid);
    elemGrid.style.height = MakePixelString(iHeightGrid);
// put the grid in the middle
    elemGrid.style.left = MakePixelString(iLeftForPositioning);
// now the phantom grid
    let elemGrid_Phantom = document.getElementById('Div_Grid_Phantom');
    elemGrid_Phantom.style.top = MakePixelString(g_TC_iBiggestBottom);
    elemGrid_Phantom.style.left = MakePixelString(iLeftForPositioning);
    g_TC_iBiggestBottom += iHeightGrid;
}

function SG2_SetSizes(iMaxGridWidth)
{
// decide on button size based upon grid size
// looking for the grid to be around 200
// our choices are 40, 50, 60 
// allow grid to be 75% of width
    var iButtonSize = Math.round(iMaxGridWidth/g_iGridWidth);
//
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
    if ( iButtonSize > 69 )
    {
        g_GRBMS_Square_iSize = 70;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_70 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 79 )
    {
        g_GRBMS_Square_iSize = 80;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_80 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 89 )
    {
        g_GRBMS_Square_iSize = 90;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_90 TC_Button_Square_Absolute';
    }
// we can alter CAB size here also
    g_GRBMS_CAB_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_30 TC_Button_Square_Relative';
    g_GRBMS_CAB_Square_iSize = 30;    
}
