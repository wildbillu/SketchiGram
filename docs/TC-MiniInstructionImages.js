// TC-MiniInstructionImages.js

var g_MII_sDirectory = g_sImagePath_General + 'InfoScreens/';
var g_MII_Grid_sImage = g_MII_sDirectory + 'MII_Grid.jpg';
var g_MII_Hint_sImage = g_MII_sDirectory + 'MII_Hint.jpg';

var g_MII_sImageFraction = 0.9;

var g_MII_Grid_sId_Div      = "MII_Grid_Div";
var g_MII_Grid_sId_Image    = "MII_Grid_Image";
var g_MII_Grid_sClass_Div   = "MII_Grid_Div";
var g_MII_Grid_sClass_Image = "MII_Grid_Image";
var g_MII_Grid_bVisible     = false;

var g_MII_Grid_sActiveSquareId = '';

var g_MII_Hint_sId_Div      = "MII_Hint_Div";
var g_MII_Hint_sId_Image    = "MII_Hint_Image";
var g_MII_Hint_sClass_Div   = "MII_Hint_Div";
var g_MII_Hint_sClass_Image = "MII_Hint_Image";
var g_MII_Hint_bVisible     = false;

var g_MII_Hint_sActiveSquareId = '';

function TC_MII_Grid_RestoreFocus()
{
    if ( g_MII_Grid_sActiveSquareId == '' )
        return;
// if the focus hasnt been lost
if ( g_GRB_Focus_sId != '' || g_CAB_Focus_sId != '' )    
return;
let elem = document.getElementById(g_MII_Grid_sActiveSquareId);
    if ( g_MII_Grid_sActiveSquareId.indexOf('GRB') != -1 ) 
        GRB_onfocus(elem)
    else
        CAB_onfocus(elem);
    g_MII_Grid_sActiveSquareId = '';
}

function TC_MII_Hint_RestoreFocus()
{
    if ( g_MII_Hint_sActiveSquareId == '' )
        return;
// if the focus hasnt been lost
    if ( g_GRB_Focus_sId != '' || g_CAB_Focus_sId != '' )    
        return;
    if ( g_MII_Hint_sActiveSquareId.indexOf('GRB') != -1 ) 
        GRB_onfocus(elem)
    else
        CAB_onfocus(elem);
    g_MII_Hint_sActiveSquareId = '';
}

function TC_Preload_MII()
{
    let elemGrid = document.getElementById(g_MII_Grid_sId_Div);
    let sImageGrid = '';
    sImageGrid += '<img onclick="MII_Grid_Hide();" Id="' + g_MII_Grid_sId_Image + '" class="' + g_MII_Grid_sClass_Image + '" src="' + g_MII_Grid_sImage + '" alt="' + g_MII_Grid_sImage + '">';
    elemGrid.innerHTML = sImageGrid;
    let elemHint = document.getElementById(g_MII_Hint_sId_Div);
    let sImageHint = '';
    sImageHint += '<img onclick="MII_Hint_Hide();" Id="' + g_MII_Hint_sId_Image + '" class="' + g_MII_Hint_sClass_Image + '" src="' + g_MII_Hint_sImage + '" alt="' + g_MII_Hint_sImage + '">';
    elemHint.innerHTML = sImageHint;
}

function MII_Grid_SetLocationAndSize()
{
//
    let elem = document.getElementById(g_MII_Grid_sId_Div);
// centered horizontally
// top is 1/2 square down from top of grid
    let elemGrid = document.getElementById("Div_Grid")
    let rectGrid = GetBoundingClientRectAbsolute(elemGrid);
    let iWidth = Math.round(rectGrid.width * g_MII_sImageFraction )
    elem.style.width = MakePixelString(iWidth);
    let iLeft = TC_LeftForCentering(iWidth);
    elem.style.left = MakePixelString(iLeft);
    let elemImage = document.getElementById(g_MII_Grid_sId_Image);
    let fWtoH = GetWidthToHeightRatioOfImageWithId(g_MII_Grid_sId_Image);
    elemImage.style.width = MakePixelString(iWidth);
    let iHeight = iWidth/fWtoH;
    elem.style.height = MakePixelString(iHeight);
// put it just above the bottom
    elemImage.style.height = MakePixelString(iHeight);
    elem.style.top = MakePixelString(g_MII_Grid_iTop);
}

function MII_Hint_SetLocationAndSize()
{
    let elem = document.getElementById(g_MII_Hint_sId_Div);
    // we want to make it 80% width of grid
    // centered horizontally
    let elemGrid = document.getElementById("Div_Grid")
    let rectGrid = GetBoundingClientRectAbsolute(elemGrid);
    let iWidth = Math.round(rectGrid.width * g_MII_sImageFraction )
    elem.style.width = MakePixelString(iWidth);
    let iLeft = TC_LeftForCentering(iWidth);
    elem.style.left = MakePixelString(iLeft);
//
    let elemImage = document.getElementById(g_MII_Hint_sId_Image);
    elemImage.style.width = MakePixelString(iWidth);
    let fWtoH = GetWidthToHeightRatioOfImageWithId(g_MII_Hint_sId_Image);
    elemImage.style.width = MakePixelString(iWidth);
    let iHeight = Math.round(iWidth/fWtoH);
    elem.style.height = MakePixelString(iHeight);
    elemImage.style.height = MakePixelString(iHeight);
//
    elem.style.top = MakePixelString(g_MII_Hint_iTop);
}

function MII_Grid_Handler(iSecondsActive)
{
    if ( g_bPuzzleSolved )
        return;
    if ( g_TC_bMoveMade_Grid )
        return;
    if ( iSecondsActive < g_MII_Grid_ShowAfter_iSec )
        return;
    if ( g_MII_Grid_bVisible )
        return;
    g_TC_bMoveMade_Grid = true;
    g_MII_Grid_bVisible = true;
    ForIdSetVisibility(g_MII_Grid_sId_Div, true);
    if ( g_GRB_Focus_sId != '' )
        g_MII_Grid_sActiveSquareId = g_GRB_Focus_sId;
    if ( g_CAB_Focus_sId != '' )
        g_MII_Grid_sActiveSquareId = g_CAB_Focus_sId;
    g_MII_Grid_Show_iCloseTimerId = setInterval(MII_Grid_Hide, g_MII_Grid_ShowFor_iSec * 1000);
}

function MII_Grid_CancelTimer()
{
    if ( g_MII_Grid_Show_iCloseTimerId == 0 ) return;
    clearInterval(g_MII_Grid_Show_iCloseTimerId);
    g_MII_Grid_Show_iCloseTimerId = 0;
}

function MII_Grid_Hide()
{
    ForIdSetVisibility(g_MII_Grid_sId_Div, false);
    ForIdSetVisibility(g_MII_Grid_sId_Image, false);
    MII_Grid_CancelTimer();
    g_MII_Hint_bVisible = false;
    TC_MII_Grid_RestoreFocus();
}

function MII_Hint_Handler(iSecondsActive)
{
    if ( g_bPuzzleSolved )
        return;
    if ( g_TC_bMoveMade_Hint )
        return;
    if ( iSecondsActive < g_MII_Hint_ShowAfter_iSec )
        return;
        if ( g_MII_Hint_bVisible )
        return;
    g_MII_Hint_bVisible = true;
    g_TC_bMoveMade_Hint = true;
    ForIdSetVisibility(g_MII_Hint_sId_Div, true);
    g_MII_Hint_Show_iCloseTimerId = setInterval(MII_Hint_Hide, g_MII_Hint_ShowFor_iSec * 1000);
    if ( g_GRB_Focus_sId != '' )
        g_MII_Hint_sActiveSquareId = g_GRB_Focus_sId;
    if ( g_CAB_Focus_sId != '' )
        g_MII_Hint_sActiveSquareId = g_CAB_Focus_sId;
}

function MII_Hint_CancelTimer()
{
    if ( g_MII_Hint_Show_iCloseTimerId == 0 )
        return;
    clearInterval(g_MII_Hint_Show_iCloseTimerId);
    g_MII_Hint_Show_iCloseTimerId = 0;
}

function MII_Hint_Hide()
{
    ForIdSetVisibility(g_MII_Hint_sId_Div, false);
    ForIdSetVisibility(g_MII_Hint_sId_Image, false);
    MII_Hint_CancelTimer();
    g_MII_Hint_bVisible = false;
    TC_MII_Hint_RestoreFocus();
}

