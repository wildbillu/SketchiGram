// TC-SG-SG2-ThemeImage.js

var g_GRBMS_ThemeImage_bActive = false;
var g_sCABOnThemeImageClick = '';
var g_sGRBOnThemeImageClick = '';
var g_ThemeImage_iTimeoutIndex = 0;

var g_ThemeImage_bIsNormalSize = true;
var g_ThemeImage_EnlargedSize_iHitCount = 0;

var g_ThemeImage_NormalSize_iTop;
var g_ThemeImage_NormalSize_iLeft;
var g_ThemeImage_NormalSize_iHeight;
var g_ThemeImage_NormalSize_iWidth;

var g_ThemeImage_EnlargedSize_iTop;
var g_ThemeImage_EnlargedSize_iLeft;
var g_ThemeImage_EnlargedSize_iHeight;
var g_ThemeImage_EnlargedSize_iWidth;

function TC_ThemeImage_SwitchSize()
{
    if ( g_ThemeImage_bIsNormalSize )
        TC_ThemeImage_SwitchTo_EnlargedSize();
    else
        TC_ThemeImage_SwitchTo_NormalSize();
}

function TC_ThemeImage_SwitchTo_NormalSize()
{
    if ( !g_GRBMS_ThemeImage_bActive ) return;
//
    if ( g_ThemeImage_iTimeoutIndex != 0 )
    {
        clearTimeout(g_ThemeImage_iTimeoutIndex);
        g_ThemeImage_iTimeoutIndex = 0;
    }
    SG2_ThemeImage_NormalSize_SetTo();
    if ( g_sCABOnThemeImageClick != '')
        document.getElementById(g_sCABOnThemeImageClick).focus();
    if ( g_sGRBOnThemeImageClick != '')
        document.getElementById(g_sGRBOnThemeImageClick).focus();
    g_sCABOnThemeImageClick = '';
    g_sGRBOnThemeImageClick = '';
    g_GRBMS_ThemeImage_bActive = false;
}

function TC_ThemeImage_SwitchTo_EnlargedSize()
{
    SG2_ThemeImage_EnlargedSize_SetTo();
    g_sCABOnThemeImageClick = g_CAB_Focus_sId;
    g_sGRBOnThemeImageClick = g_GRB_Focus_sId;
    g_GRBMS_ThemeImage_bActive = true;
    g_ThemeImage_EnlargedSize_iHitCount = 0;
    g_ThemeImage_iTimeoutIndex = setTimeout(function(){TC_ThemeImage_SwitchTo_NormalSize();}, 10000); 
}

var g_iFudgeSpace = 5;

function SG2_ThemeImage_Create()
{
    let sImage = '';
    sImage += '<img Id="Grid_Image_Itself" onclick="TC_ThemeImage_SwitchSize()" class="Div_Grid_Image_Itself"  src="' + g_PuzzlePath_sName_Image + '" alt="BB" height="200"></img>';
    let elemDivGridImage = document.getElementById('Div_Grid_Image');
    elemDivGridImage.innerHTML = sImage;
}

function SG2_ThemeImage_NormalSize_SetTo()
{
    let elemDivGridImage = document.getElementById('Div_Grid_Image');
    let elemDivGridImageItself = document.getElementById("Grid_Image_Itself");
    elemDivGridImage.style.top          = MakePixelString(g_ThemeImage_NormalSize_iTop);
    elemDivGridImage.style.height       = MakePixelString(g_ThemeImage_NormalSize_iHeight);
    elemDivGridImage.style.left         = MakePixelString(g_ThemeImage_NormalSize_iLeft);
    elemDivGridImageItself.style.height = MakePixelString(g_ThemeImage_NormalSize_iHeight);
    elemDivGridImageItself.style.width  = MakePixelString(g_ThemeImage_NormalSize_iWidth);
    elemDivGridImageItself.style.zIndex = 0;
    g_ThemeImage_bIsNormalSize = true;
}

function SG2_ThemeImage_NormalSize_Setup()
{
    let elemKB = document.getElementById("KB_Mini_Div");
    let rectKB = GetBoundingClientRectAbsolute(elemKB);
    let iBottomKB = rectKB.bottom;
    // need the size to be height between bottom of KB and top of Archive Button
    let elemArchiveButton = document.getElementById("Archive_Button_Activate");
    let rectArchiveButton = GetBoundingClientRectAbsolute(elemArchiveButton)
    let iTopArchiveButton = rectArchiveButton.top;
    let iHeight = iTopArchiveButton - iBottomKB - 2 * g_iFudgeSpace;
    let iWidth = GetWidthToHeightRatioOfImageWithId("Grid_Image_Itself")*iHeight;
    let iLeft = TC_LeftForCentering(iWidth);
//
    g_ThemeImage_NormalSize_iTop = iBottomKB + g_iFudgeSpace;
    g_ThemeImage_NormalSize_iLeft = iLeft;
    g_ThemeImage_NormalSize_iHeight = iHeight;
    g_ThemeImage_NormalSize_iWidth  = iWidth;
}

function SG2_ThemeImage_EnlargedSize_Setup()
{
//
    let iWidth = 0.75 * g_TC_iBiggestRight;
    let iHeight = iWidth/GetWidthToHeightRatioOfImageWithId("Grid_Image_Itself");
    let iLeft = TC_LeftForCentering(iWidth);
    let elemHowToA = document.getElementById("SG_HowToA_Div");
    let rectelemHowToA = elemHowToA.getBoundingClientRect();
    g_ThemeImage_EnlargedSize_iTop    = rectelemHowToA.top;
    g_ThemeImage_EnlargedSize_iLeft   = iLeft;
    g_ThemeImage_EnlargedSize_iHeight = iHeight;
    g_ThemeImage_EnlargedSize_iWidth  = iWidth;
}

function SG2_ThemeImage_EnlargedSize_SetTo()
{
    let elemDivGridImage = document.getElementById('Div_Grid_Image');
    let elemDivGridImageItself = document.getElementById("Grid_Image_Itself");
    elemDivGridImage.style.top          = MakePixelString(g_ThemeImage_EnlargedSize_iTop);
    elemDivGridImage.style.height       = MakePixelString(g_ThemeImage_EnlargedSize_iHeight);
    elemDivGridImage.style.left         = MakePixelString(g_ThemeImage_EnlargedSize_iLeft);
    elemDivGridImageItself.style.height = MakePixelString(g_ThemeImage_EnlargedSize_iHeight);
    elemDivGridImageItself.style.width  = MakePixelString(g_ThemeImage_EnlargedSize_iWidth);
    elemDivGridImageItself.style.zIndex = 2;
    g_ThemeImage_bIsNormalSize = false;
}
