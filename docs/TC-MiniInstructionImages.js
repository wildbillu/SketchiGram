// TC-MiniInstructionImages.js

var g_MII_sDirectory = g_sImagePath_General + 'InfoScreens/';
var g_MII_Grid_sImage = g_MII_sDirectory + 'MII_Grid.jpg';
var g_MII_Hint_sImage = g_MII_sDirectory + 'MII_Hint.jpg';

var g_MII_sImageFraction = 0.9;


var g_MII_Grid_sId_Div      = "MII_Grid_Div";
var g_MII_Grid_sId_Image    = "MII_Grid_Image";
var g_MII_Grid_sClass_Div   = "MII_Grid_Div";
var g_MII_Grid_sClass_Image = "MII_Grid_Image";

var g_MII_Hint_sId_Div      = "MII_Hint_Div";
var g_MII_Hint_sId_Image    = "MII_Hint_Image";
var g_MII_Hint_sClass_Div   = "MII_Hint_Div";
var g_MII_Hint_sClass_Image = "MII_Hint_Image";

var g_MII_Grid_ShowAfter_iSec = 60;
var g_MII_Grid_ShowFor_iSec   = 10;
var g_MII_Grid_Show_iCloseTimerId = 0;

var g_MII_Hint_ShowAfter_iSec = 120;
var g_MII_Hint_ShowFor_iSec   = 10;
var g_MII_Hint_Show_iCloseTimerId = 0;

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
    let elem = document.getElementById(g_MII_Grid_sId_Div);
// centered horizontally
// top is 1/2 square down from top of grid
    let elemGrid = document.getElementById("Div_Grid")
    let rectGrid = GetBoundingClientRectAbsolute(elemGrid);
    let iTop  = rectGrid.top + g_GRB_Square_iSize/2;
    let iWidth = Math.round(rectGrid.width * g_MII_sImageFraction )
    elem.style.top = MakePixelString(iTop);
    elem.style.width = MakePixelString(iWidth);
    let iLeft = TC_LeftForCentering(iWidth);
    elem.style.left = MakePixelString(iLeft);
    let elemImage = document.getElementById(g_MII_Grid_sId_Image);
    let fWtoH = GetWidthToHeightRatioOfImageWithId(g_MII_Grid_sId_Image);
    elemImage.style.width = MakePixelString(iWidth);
    let iHeight = iWidth/fWtoH;
    elem.style.height = MakePixelString(iHeight);
    elemImage.style.height = MakePixelString(iHeight);
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

    let elemSC = document.getElementById("SpecialClue_Div");
    let rectSC= GetBoundingClientRectAbsolute(elemSC);
    let iTop = rectSC.top - iHeight;
    elem.style.top = MakePixelString(Math.round(iTop));
}

function MII_Grid_Handler(iSecondsActive)
{
    if ( g_bPuzzleSolved )
        return;
    if ( g_TC_bMoveMade_Grid )
        return;
    if ( iSecondsActive < g_MII_Grid_ShowAfter_iSec )
        return;
    ForIdSetVisibility(g_MII_Grid_sId_Div, true);
setlineAdd('S:' + iSecondsActive + "|")    
    g_MII_Grid_Show_iCloseTimerId = setInterval(MII_Grid_Hide, g_MII_Grid_ShowFor_iSec * 1000);
}

function MII_Grid_Hide()
{
    ForIdSetVisibility(g_MII_Grid_sId_Div, false);
    ForIdSetVisibility(g_MII_Grid_sId_Image, false);
    if ( g_MII_Grid_Show_iCloseTimerId == 0 )
        return;
    clearInterval(g_MII_Grid_Show_iCloseTimerId);
    g_MII_Grid_Show_iCloseTimerId = 0;
}

function MII_Hint_Handler(iSecondsActive)
{
    if ( g_bPuzzleSolved )
        return;
    if ( g_TC_bMoveMade_Hint )
        return;
    if ( iSecondsActive < g_MII_Hint_ShowAfter_iSec )
        return;
    ForIdSetVisibility(g_MII_Hint_sId_Div, true);
    g_MII_Hint_Show_iCloseTimerId = setInterval(MII_Hint_Hide, g_MII_Hint_ShowFor_iSec * 1000);
}

function MII_Hint_Hide()
{
    ForIdSetVisibility(g_MII_Hint_sId_Div, false);
    ForIdSetVisibility(g_MII_Hint_sId_Image, false);
    if ( g_MII_Hint_Show_iCloseTimerId == 0 )
        return;
    clearInterval(g_MII_Hint_Show_iCloseTimerId);
    g_MII_Hint_Show_iCloseTimerId = 0;
}

