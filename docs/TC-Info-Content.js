// TC-Info-Content.js

var g_GRBMS_Info_bActive = false;
var g_sCABOnInfoClick = ''; // support these 
var g_sGRBOnInfoClick = '';

function Make_Button_Info()
{
    sImage = '<img Id="Button_Info_Image" src="' + TC_FullButtonName('Button_Info.png') + '" alt="Info" width=100%>';
    sInnerHTML = '';
    sInnerHTML += '<BUTTON class="TopRowControl_Button" onclick="TC_ShowInfo();">';
    sInnerHTML += sImage;
    sInnerHTML += '</BUTTON>';
    return sInnerHTML;
}

function MakeInfoDiv()
{    
    var sInfoContent ='';
    sInfoContent += '<DIV Id="InfoDiv" class="Info_Div Info_DivBorder_Image Info_Image_SG2">'
    sInfoContent += '<DIV class="Info_Center"><text Id="Info_Content_AuthorCredit" class="Info_Content_Credits Info_Content_Credits_Author_SG2">Puzzle By: Sketchi Bill - Image By: Sketchi Bill</text></DIV>';
    sInfoContent += '<DIV class="Info_Center"><text Id="Info_Content_PuzzleDate" class="Info_Content_Credits Info_Content_Credits_Date_SG2">November 20, 2022</text></DIV>';
    sInfoContent += '<DIV class="Info_Left"><text Id="Info_Content_PuzzleVersion" class="Info_Content_Credits Info_Content_Credits_Version_SG2">November 19, 2022</text></DIV>';
    sInfoContent += '<DIV Id="Button_Close_Div" class="Button_Close_Div"><BUTTON class="Button_Info_CloseBox Id="Info_CloseBox" onclick="TC_HideInfo();">Close<BUTTON></DIV>';
    sInfoContent += '</DIV>';
    return sInfoContent;
}

function TC_HideInfo()
{
    var elemInfo = document.getElementById("InfoDiv");
    elemInfo.style.visibility = 'hidden'
    if ( g_sCABOnInfoClick != '')
        document.getElementById(g_sCABOnInfoClick).focus();
    if ( g_sGRBOnInfoClick != '')
        document.getElementById(g_sGRBOnInfoClick).focus();
    g_sCABOnInfoClick = '';
    g_sGRBOnInfoClick = '';
    g_GRBMS_Info_bActive = false;
}

function TC_ShowInfo()
{
    if ( g_GRBMS_Info_bActive )
    {
        TC_HideInfo();
        return;
    }
    g_sCABOnInfoClick = g_CAB_Focus_sId;
    g_sGRBOnInfoClick = g_GRBMS_Focus_sId;
    Make_Info_Content_Update()
    var iWidth = g_Window_iWidth - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize;
    var elemInfoDiv = document.getElementById("InfoDiv");
    var iTopAll = 100;
    elemInfoDiv.style.top = MakePixelString(iTopAll);
    var rectInfoDiv = elemInfoDiv.getBoundingClientRect()
    var iWidthInfo = rectInfoDiv.width;
    var iLeft = (iWidth-iWidthInfo)/2;
    elemInfoDiv.style.left = MakePixelString(iLeft);
    var elemInfoCloseDiv = document.getElementById("Button_Close_Div");
// close div is relative
    var iLeftButton = iWidthInfo - 110
    elemInfoCloseDiv.style.top = MakePixelString(0);
    elemInfoCloseDiv.style.left = MakePixelString(iLeftButton);
// now make it visibl    
    elemInfoDiv.style.visibility = 'visible'
    g_GRBMS_Info_bActive = true;
}

function Make_Info_Content_Update()
{
    document.getElementById("Info_Content_AuthorCredit").innerHTML = g_sPuzzleCreditAuthor;
    document.getElementById("Info_Content_PuzzleDate").innerHTML = g_sPuzzleCreditDate;
    document.getElementById("Info_Content_PuzzleVersion").innerHTML = g_sPuzzleVersion;
}




