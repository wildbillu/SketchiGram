// TC-ThemeImage-Solved.js
// this is the static version no click but different position and size perhaps by function
// 

function TC_ThemeImage_Solved_ShowPopup()
{
    let iTop = 150;
    let iLeft = g_TC_Padding_Left_iSize;
    let iWidth = g_Window_iWidth;
    let iHeight = iWidth/g_ThemeImage_All_fWidthToHeight;
    TC_ThemeImage_Popup_ShowPopup(g_PuzzlePath_sName_Image_Solved, iTop, iLeft, iHeight, iWidth, CAB_SpecialClueExpandClosed);
}

function TC_ThemeImage_Solved_Create()
{
    let elemThemeImage = document.getElementById('ThemeImage_Solved_Div');
    let sImage = '';
    sImage += '<img Id="ThemeImage_Solved_ImageItself" class="ThemeImage_Solved_Image_Div" onclick="TC_ThemeImage_Solved_ShowPopup();" src="' + g_PuzzlePath_sName_Image_Solved + '" alt="Solved" height="200">';
    elemThemeImage.innerHTML = sImage;
}
