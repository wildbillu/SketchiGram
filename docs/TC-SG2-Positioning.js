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

