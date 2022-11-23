// TC-SG2-Positioning.js

function SG2_Adjust_KBAndIntro(iKBRows)
{
    let elemGrid = document.getElementById('Div_Grid');
    let rectGrid = elemGrid.getBoundingClientRect();
    let iKBWidth = rectGrid.width - 2; // account for border?
//
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    var elem_KB = document.getElementById('KB_Mini_Div');
    elem_KB.style.top = MakePixelString(g_TC_iBiggestBottom);
    elem_KB.style.width = MakePixelString(iKBWidth);
    elem_KB.style.left = MakePixelString(rectGrid.left);
//
    var elemButtonDiv = document.getElementById("KB_Mini_ButtonRow_Div");
    elemButtonDiv.style.width = MakePixelString(iKBWidth);
    var elemInstructionsDiv = document.getElementById("KB_Mini_Instructions_Div");
    elemInstructionsDiv.style.width = MakePixelString(iKBWidth);
    var rectInstructionsDiv = elemInstructionsDiv.getBoundingClientRect();
    elem_KB.style.height = MakePixelString(iKBRows * 47 + rectInstructionsDiv.height);// fix this?
    var rect_KB = elem_KB.getBoundingClientRect();
    g_TC_iBiggestBottom += rect_KB.height;
}

function SG2_Adjust_GridAndPhantomGridPosition(iGap)
{
    g_TC_iBiggestBottom += iGap;
// instruction line goes before the grid 
    let iWidthGrid = g_iGridWidth * g_GRBMS_Square_iSize;
    let iHeightGrid = g_iGridHeight * g_GRBMS_Square_iSize;
    let iLeftForCentering = TC_LeftForCentering(iWidthGrid)
    var elemHowToA = document.getElementById("SG_HowToA_Div");
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    elemHowToA.style.top = MakePixelString(g_TC_iBiggestBottom);
    elemHowToA.style.left = MakePixelString(iLeftForCentering);
    
    // make the width the width of the grid
    elemHowToA.style.width = MakePixelString(iWidthGrid);
    var rectelemHowToA = elemHowToA.getBoundingClientRect();
    g_TC_iBiggestBottom += rectelemHowToA.height;
//
    let elemGrid = document.getElementById('Div_Grid');
    elemGrid.style.top = MakePixelString(g_TC_iBiggestBottom)
    elemGrid.style.width = MakePixelString(iWidthGrid);
    elemGrid.style.height = MakePixelString(iHeightGrid);
// put the grid in the middle
    elemGrid.style.left = MakePixelString(iLeftForCentering);
// now the phantom grid
    let elemGrid_Phantom = document.getElementById('Div_Grid_Phantom');
    elemGrid_Phantom.style.top = MakePixelString(g_TC_iBiggestBottom);
    elemGrid_Phantom.style.left = MakePixelString(iLeftForCentering);
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
