// TC-ThemeImage.js

let g_ThemeImage_Base_bShown = false;

function TC_ThemeImage_Base_OnClosePopup()
{
    let elem = document.getElementById("ThemeImage_Base_ImageItself_Div");
    elem.style.cursor = "zoom-in";
    g_ThemeImage_Base_bShown = false;
}

function TC_ThemeImage_Base_TogglePopup()
{
    if ( g_ThemeImage_Base_bShown )
    {
        TC_ThemeImage_Popup_HidePopup();
        return;
    }
    let iTop = 150;
    let iLeft = g_TC_Padding_Left_iSize;
    let iWidth = g_Window_iWidth;
    let iHeight = iWidth/GetWidthToHeightRatioOfImageWithId("ThemeImage_Base_ImageItself_Div");
    TC_ThemeImage_Popup_ShowPopup(g_PuzzlePath_sName_Image, iTop, iLeft, iHeight, iWidth, TC_ThemeImage_Base_OnClosePopup);
    let elem = document.getElementById("ThemeImage_Base_ImageItself_Div");
    elem.style.cursor = "zoom-out";
    g_ThemeImage_Base_bShown = true;
}

function TC_ThemeImage_Base_Create()
{
    let sImage = '';
    sImage += '<img Id="ThemeImage_Base_ImageItself_Div" onclick="TC_ThemeImage_Base_TogglePopup()" class="ThemeImage_Base_ImageItself_Div Start_Hidden"  src="' + g_PuzzlePath_sName_Image + '" alt="BB" height="200"></img>';
    let elemDivGridImage = document.getElementById('ThemeImage_Base_Div');
    elemDivGridImage.innerHTML = sImage;
}

function TC_ThemeImage_Base_SetVisibility(bVisible)
{
    ForIdSetVisibility('ThemeImage_Base_Div', bVisible)
    ForIdSetVisibility('ThemeImage_Base_ImageItself_Div', bVisible)
}

function TC_ThemeImage_Base_SizeAndPosition()
{
    let elemKB = document.getElementById("KB_Mini_Div");
    let rectKB = GetBoundingClientRectAbsolute(elemKB);
    let iBottomKB = rectKB.bottom;
    // need the size to be height between bottom of KB and top of Archive Button
    let elemArchiveButton = document.getElementById("Archive_Button_Activate");
    let rectArchiveButton = GetBoundingClientRectAbsolute(elemArchiveButton)
    let iTopArchiveButton = rectArchiveButton.top;
    let iHeight = iTopArchiveButton - iBottomKB - 2 * g_TC_Padding_Inter_Vertical_iSize;
    let iWidth = GetWidthToHeightRatioOfImageWithId("ThemeImage_Base_ImageItself_Div")*iHeight;
    let iTop = iBottomKB + g_TC_Padding_Inter_Vertical_iSize;
    let iLeft = TC_LeftForCentering(iWidth);
//    
    let elemDiv = document.getElementById('ThemeImage_Base_Div');
    elemDiv.style.top          = MakePixelString(iTop);
    elemDiv.style.height       = MakePixelString(iHeight);
    elemDiv.style.left         = MakePixelString(iLeft);
    elemDiv.style.width         = MakePixelString(iWidth);
//    
    let elemImageItself = document.getElementById("ThemeImage_Base_ImageItself_Div");
    elemImageItself.style.height = MakePixelString(iHeight);
    elemImageItself.style.width  = MakePixelString(iWidth);
    ForIdSetVisibility('ThemeImage_Base_Div', true)
    ForIdSetVisibility('ThemeImage_Base_ImageItself_Div', true)
}