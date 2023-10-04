// TC-SG2-Positioning.js

function SG2_Adjust_GridPosition()
{
// instruction line goes before the grid 
    let iWidthGrid = g_iGridWidth * g_GRB_Square_iSize;
    let iHeightGrid = g_iGridHeight * g_GRB_Square_iSize;
    let iLeftForPositioning = TC_LeftForCentering(iWidthGrid);
//
    let elemGrid = document.getElementById('Div_Grid');
    elemGrid.style.top = MakePixelString(g_GR_Grid_iTop)
    elemGrid.style.width = MakePixelString(iWidthGrid);
    elemGrid.style.height = MakePixelString(iHeightGrid);
// put the grid in the middle
    elemGrid.style.left = MakePixelString(iLeftForPositioning);
}

