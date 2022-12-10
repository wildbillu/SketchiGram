// TC-GRB-Setup.js

function TC_LoadGridImage()
{
    let sImage = '';
    sImage += '<img Id="Grid_Image_Itself" class="Div_Grid_Image_Itself" onclick="TC_ShowExtraImage();" src="' + g_PuzzlePath_sName_Image + '" alt="BB" height="200"></img>';
    let elemDivGridImage = document.getElementById('Div_Grid_Image');
    elemDivGridImage.innerHTML = sImage;
    alert('TC_LoadGridImage')
}


function TC_Adjust_GridAndImagePositions()
{
    let elemGrid = document.getElementById('Div_Grid');
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    elemGrid.style.top = MakePixelString(g_TC_iBiggestBottom)

    // first determine the maximum height and width for the image
    let rectGrid = elemGrid.getBoundingClientRect();
    var iHeightGrid = rectGrid.height;
    var iWidthGrid = rectGrid.width;
    var iMaxWidth  = g_TC_iBiggestRight - iWidthGrid - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize - g_TC_Padding_Inter_Horizontal_iSize;
    var fImageWidthToHeight = GetWidthToHeightRatioOfImages();
// what happens if we make it iMaxHeight
    var iWidthIfMaxHeight = iHeightGrid / fImageWidthToHeight;
    if ( iWidthIfMaxHeight < iMaxWidth )
    {
        var elemImageItself = document.getElementById('Grid_Image_Itself');
        elemImageItself.style.height = MakePixelString(iHeightGrid);
        elemImageItself.style.width  = MakePixelString(iWidthIfMaxHeight);
        var elemDivGridImage = document.getElementById('Div_Grid_Image');
        elemDivGridImage.style.height = MakePixelString(iHeightGrid);
        elemDivGridImage.style.width  = MakePixelString(iWidthIfMaxHeight);
        elemDivGridImage.style.top = MakePixelString(g_TC_iBiggestBottom);
// space things equally horizontally        
        var iSpacing = (g_TC_iBiggestRight - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize - iWidthIfMaxHeight - iWidthGrid) / 3;
        elemGrid.style.left = MakePixelString(g_TC_Padding_Left_iSize + iSpacing);
        elemDivGridImage.style.left = MakePixelString(g_TC_Padding_Left_iSize + iSpacing + iWidthGrid + iSpacing)
    }
    else
    {
    alert('need very wide image case');
    }
    // now the phantom grid
    let elemGrid_Phantom = document.getElementById('Div_Grid_Phantom');
    if ( elemGrid_Phantom )
    {
        rectGrid = elemGrid.getBoundingClientRect();
        elemGrid_Phantom.style.top = MakePixelString(rectGrid.top);
        elemGrid_Phantom.style.left = MakePixelString(rectGrid.left);
    }
    g_TC_iBiggestBottom += iHeightGrid;
}


function GRB_MakeGridAsButtons()
{
    var sInner = '';
    for ( var iR = 0; iR < g_iGridHeight; iR++ )
    { 
        sInner += '<DIV class="' + g_GRB_Square_Div_sClass + '" Id="GRB_Div' + iR + '">aa</DIV>'
    }
    var elemGridRows = document.getElementById("Div_Grid");
    elemGridRows.innerHTML = sInner;
    for ( var iRow = 0; iRow < g_iGridHeight; iRow++ )
        GRB_MakeGridRowAsButtons(iRow);
    elemGridRows.style.height = MakePixelString( g_iGridHeight * g_GRB_Square_iSize );
    elemGridRows.style.width = MakePixelString(g_iGridWidth * g_GRB_Square_iSize );
}
    
function GRB_MakeGridRowAsButtons(iRow)
{
    var sInnerRowHTML = '';
    for ( var iLetter = 0; iLetter < g_iGridWidth; iLetter++ )
    {
        sFunctionsToCall = '';
        sFunctionsToCall += ' ondrop="TC_Place_Drop(event,' + iRow + ',' + iLetter + ');"'
        sFunctionsToCall += ' ondragover="TC_Place_AllowDrop(event,' + iRow + ',' + iLetter + ');"'
        sFunctionsToCall += ' onMouseDown="return GRB_onmousedown(' + iRow + ',' + iLetter + ');"'
        sFunctionsToCall += ' onkeypress="return GRB_onkeypress(event);"';
        sFunctionsToCall += ' onkeyup="return GRB_onkeyup(event.key,' + iRow + ',' + iLetter + ');"';
        sFunctionsToCall += ' onfocus="GRB_onfocus(this);"';
        sInnerRowHTML += '<BUTTON '
        sInnerRowHTML += GRB_MakeHTMLId(iRow, iLetter);
        sInnerRowHTML += ' class="' + g_GRB_Square_sClass + '"';
        sInnerRowHTML += sFunctionsToCall;
        sInnerRowHTML += '>';
    }
    var sDiv = 'GRB_Div' + iRow;
    document.getElementById(sDiv).innerHTML=sInnerRowHTML;
//
    for ( var iLL = 0; iLL < g_iGridWidth; iLL++ )
    {
        GRB_ForRowLetter_SetButton(iRow, iLL, g_TC_cCodeMeaning_Inactive)
    }
}
