// TC-ThemeImage.js

let g_ThemeImage_Base_bShown = false;
let g_ThemeImage_All_fWidthToHeight = 1.0;

function TC_ThemeImage_GetAspectRatio_ForceLoad()
{
    let sIdOuter = "ThemeImage_All_GetAspectRatio_Div"
    let elem = document.getElementById(sIdOuter);
    let sImage = '';
    sImage += '<img Id="ThemeImage_All_GetAspectRatio_ImageItself_Div" class="ThemeImage_Base_ImageItself_Div TC_StartHidden"  src="' + g_PuzzlePath_sName_Image_Extra + '" alt="BB" height="200">';
    elem.innerHTML = sImage;
}

function TC_ThemeImage_GetAspectRatio_Calculate()
{
    let sId = "ThemeImage_All_GetAspectRatio_ImageItself_Div"
    g_ThemeImage_All_fWidthToHeight = GetWidthToHeightRatioOfImageWithId(sId);
    g_sExtraInfo = 'WTH:' + g_ThemeImage_All_fWidthToHeight.toFixed(2);
}

function TC_ThemeImage_Base_Create()
{
    let sImage = '';
    sImage += '<img Id="ThemeImage_Base_ImageItself_Div" onclick="TC_ThemeImage_Base_TogglePopup()" class="ThemeImage_Base_ImageItself_Div TC_StartHidden"  src="' + g_PuzzlePath_sName_Image + '" alt="BB" height="200">';
    let elemDivGridImage = document.getElementById('ThemeImage_Base_Div');
    elemDivGridImage.innerHTML = sImage;
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
    let iHeight = iWidth/g_ThemeImage_All_fWidthToHeight;
    TC_ThemeImage_Popup_ShowPopup(g_PuzzlePath_sName_Image, iTop, iLeft, iHeight, iWidth, TC_ThemeImage_Base_OnClosePopup, g_ThemeImage_Hint_izIndex);
    let elem = document.getElementById("ThemeImage_Base_ImageItself_Div");
    elem.style.cursor = "zoom-out";
    g_ThemeImage_Base_bShown = true;
}


