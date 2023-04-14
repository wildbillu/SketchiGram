// TC-ThemeImage-Popup.js
// this handles popups from any of the places

let g_ThemeImage_Popup_TimerId = 0;
let g_ThemeImage_Popup_iSeconds = 10;
let g_ThemeImage_Popup_Active = false;
let g_ThemeImage_Popup_fnOnClose = TC_ThemeImage_Popup_DefaultOnClose;

function TC_ThemeImage_Popup_DefaultOnClose()
{
}

function TC_ThemeImage_Popup_HidePopup()
{
    if ( !g_ThemeImage_Popup_Active )  return; // nothing to do
    ForIdSetVisibility('ThemeImage_Popup_Div', false)
    ForIdSetVisibility('ThemeImage_Popup_ImageItself', false)
    g_ThemeImage_Popup_Active = false;
    clearInterval(g_ThemeImage_Popup_TimerId); 
    g_ThemeImage_Popup_TimerId = 0;
    g_ThemeImage_Popup_fnOnClose();
}

function TC_ThemeImage_Popup_SetImgHTML(sImageName)
{
    let sImageHTML = '<img Id="ThemeImage_Popup_ImageItself" class="ThemeImage_Popup_ImageItself_Div" onclick="TC_ThemeImage_Popup_HidePopup();" src="' + sImageName + '" alt="Popup" height="200"></img>';
    let elemThemeImage = document.getElementById('ThemeImage_Popup_Div');
    elemThemeImage.innerHTML = sImageHTML;
}

function TC_ThemeImage_Popup_ShowPopup(sImageName, iTop, iLeft, iHeight, iWidth, fnOnClose)
{
    if ( g_ThemeImage_Popup_Active )
    { // we need to close the existing one
        TC_ThemeImage_Popup_HidePopup();
//        clearInterval(g_ThemeImage_Popup_TimerId); 
//        g_ThemeImage_Popup_TimerId = 0;
    }

    g_ThemeImage_Popup_fnOnClose = fnOnClose;
//alert(g_ThemeImage_Popup_fnOnClose)

    // first we change the image name according to the requested
    TC_ThemeImage_Popup_SetImgHTML(sImageName)
    // now we move and resize the outer div
    let elemPopup = document.getElementById('ThemeImage_Popup_Div');
    elemPopup.style.top    = MakePixelString(iTop);
    elemPopup.style.left    = MakePixelString(iLeft);
    elemPopup.style.height    = MakePixelString(iHeight);
    elemPopup.style.width    = MakePixelString(iWidth);
// now we resize the image itself div
    let elemPopupImageItself = document.getElementById('ThemeImage_Popup_ImageItself');
    elemPopupImageItself.style.width    = MakePixelString(iWidth);
    elemPopupImageItself.style.height    = MakePixelString(iHeight);
    
    ForIdSetVisibility('ThemeImage_Popup_Div', true)
    ForIdSetVisibility('ThemeImage_Popup_ImageItself', true)
    elemPopupImageItself.style.zIndex = 2;
    g_ThemeImage_Popup_Active = true;
    g_ThemeImage_Popup_TimerId = setInterval(TC_ThemeImage_Popup_HidePopup, g_ThemeImage_Popup_iSeconds * 1000);
}

function TC_ThemeImage_Popup_Create()
{
    TC_ThemeImage_Popup_SetImgHTML(g_PuzzlePath_sName_Image);
}
