// TC-ThemeImage-Extra.js
// this is the static version no click but different position and size perhaps
// 

function TC_ThemeImage_Extra_ShowPopup()
{
    let iTop = 150;
    let iLeft = g_TC_Padding_Left_iSize;
    let iWidth = g_Window_iWidth;
    let iHeight = iWidth/GetWidthToHeightRatioOfImageWithId("ThemeImage_Base_ImageItself_Div");
    TC_ThemeImage_Popup_ShowPopup(g_PuzzlePath_sName_Image_Extra, iTop, iLeft, iHeight, iWidth, CAB_SpecialClueExpandClosed)
}

function TC_ThemeImage_Extra_Create()
{
    let elemThemeImage = document.getElementById('ThemeImage_Extra_Div');
    let sImage = '';
    sImage += '<img Id="ThemeImage_Extra_ImageItself" class="ThemeImage_Extra_Image_Div" onclick="TC_ThemeImage_Extra_ShowPopup();" src="' + g_PuzzlePath_sName_Image_Extra + '" alt="Extra" height="200"></img>';
    elemThemeImage.innerHTML = sImage;
}

function TC_ThemeImage_Extra_PositionVisibility_Print(bVisible)
{
    let elemThemeImageDiv = document.getElementById("ThemeImage_Extra_Div");
    let elemThemeImageItself = document.getElementById("ThemeImage_Extra_ImageItself");

    let elemKB = document.getElementById("KB_Mini_Div");
    let rectKB = GetBoundingClientRectAbsolute(elemKB);
    let elemBottomMatter = document.getElementById("Div_BottomMatter");
    let rectBottomMatter = GetBoundingClientRectAbsolute(elemBottomMatter);

    let iTop = rectKB.bottom + g_TC_Padding_Inter_Vertical_iSize;
    let iBottom = rectBottomMatter.top - g_TC_Padding_Inter_Vertical_iSize;
    let iHeight = iBottom - iTop;
    let fWidthToHeight = GetWidthToHeightRatioOfImageWithId("ThemeImage_Base_ImageItself_Div");
    let iWidth = fWidthToHeight*iHeight;
    let iLeft = TC_LeftForCentering(iWidth);
    elemThemeImageDiv.style.top = MakePixelString(iTop);
    elemThemeImageDiv.style.left = MakePixelString(iLeft);
    
    elemThemeImageDiv.style.height = MakePixelString(iHeight);
    elemThemeImageDiv.style.width = MakePixelString(iWidth);

    elemThemeImageItself.style.height = MakePixelString(iHeight);
    elemThemeImageItself.style.width = MakePixelString(iWidth);
    ForIdSetVisibility('ThemeImage_Extra_Div', bVisible)
    ForIdSetVisibility('ThemeImage_Extra_ImageItself', bVisible)

}

