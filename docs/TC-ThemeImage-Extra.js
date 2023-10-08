// TC-ThemeImage-Extra.js
// this is the static version no click but different position and size perhaps
// 

function TC_ThemeImage_Extra_ShowPopup()
{
    let iTop = 150;
    let iLeft = g_TC_Padding_Left_iSize;
    let iWidth = g_Window_iWidth;
    let iHeight = iWidth/g_ThemeImage_All_fWidthToHeight;
    TC_ThemeImage_Popup_ShowPopup(g_PuzzlePath_sName_Image_Extra, iTop, iLeft, iHeight, iWidth, CAB_SpecialClueExpandClosed, g_ThemeImage_Hint_izIndex)
}

function TC_ThemeImage_Extra_Create()
{
    let elemThemeImage = document.getElementById('ThemeImage_Extra_Div');
    let sImage = '';
    sImage += '<img Id="ThemeImage_Extra_ImageItself" class="ThemeImage_Extra_Image_Div" onclick="TC_ThemeImage_Extra_ShowPopup();" src="' + g_PuzzlePath_sName_Image_Extra + '" alt="Extra" height="200">';
    elemThemeImage.innerHTML = sImage;
}

