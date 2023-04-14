// TC-ThemeImage-Solved.js
// this is the static version no click but different position and size perhaps by function
// 

function TC_ThemeImage_Solved_ShowPopup()
{
    let iTop = 150;
    let iLeft = g_TC_Padding_Left_iSize;
    let iWidth = g_Window_iWidth;
    let iHeight = iWidth/GetWidthToHeightRatioOfImageWithId("ThemeImage_Base_ImageItself_Div");
    TC_ThemeImage_Popup_ShowPopup(g_PuzzlePath_sName_Image_Solved, iTop, iLeft, iHeight, iWidth, CAB_SpecialClueExpandClosed) 
}

function TC_ThemeImage_Solved_Create()
{
    let elemThemeImage = document.getElementById('ThemeImage_Solved_Div');
    let sImage = '';
    sImage += '<img Id="ThemeImage_Solved_ImageItself" class="ThemeImage_Solved_Image_Div" onclick="TC_ThemeImage_Solved_ShowPopup();" src="' + g_PuzzlePath_sName_Image_Solved + '" alt="Solved" height="200"></img>';
    elemThemeImage.innerHTML = sImage;
}

function TC_ThemeImage_Solved_PositionVisibility_PrintAndSolve(bVisible)
{
    let elemThemeImageDiv = document.getElementById("ThemeImage_Solved_Div");
    let elemThemeImageItself = document.getElementById("ThemeImage_Solved_ImageItself");

    let elemClues = document.getElementById("SG_Clues_Div");
    let rectClues = GetBoundingClientRectAbsolute(elemClues);
    let elemBottomMatter = document.getElementById("Div_BottomMatter");
    let rectBottomMatter = GetBoundingClientRectAbsolute(elemBottomMatter);

    let iTop = rectClues.bottom + g_TC_Padding_Inter_Vertical_iSize;
    let iBottom = rectBottomMatter.top - g_TC_Padding_Inter_Vertical_iSize;
    let iHeight = iBottom - iTop;


    let iWidth = GetWidthToHeightRatioOfImageWithId("ThemeImage_Solved_ImageItself")*iHeight;

    let iLeft = TC_LeftForCentering(iWidth);
    elemThemeImageDiv.style.top = MakePixelString(iTop);
    elemThemeImageDiv.style.left = MakePixelString(iLeft);
    elemThemeImageDiv.style.zIndex = 3;
    elemThemeImageDiv.style.height = MakePixelString(iHeight);
    elemThemeImageDiv.style.width = MakePixelString(iWidth);

    elemThemeImageItself.style.height = MakePixelString(iHeight);
    elemThemeImageItself.style.width = MakePixelString(iWidth);
    elemThemeImageItself.style.zIndex = 3;

    ForIdSetVisibility('ThemeImage_Solved_Div', bVisible)
    ForIdSetVisibility('ThemeImage_Solved_ImageItself', bVisible)
}

