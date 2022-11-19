// TC-LoadExtraSolvedImages.js
var g_GRBMS_ExtraImage_bActive = false;
var g_sCABOnExtraImageClick = '';
var g_sGRBOnExtraImageClick = '';

function MakeExtraImageDiv()
{    
    var sExtraImage = '<img onclick="TC_HideExtraImage()" src="' + g_PuzzlePath_sThisPuzzle_Image_Extra + '" Id="ExtraImage" class="ExtraImage" width="100" alt="Cloudy Sky">';
    var sInner = '<DIV Id="ExtraImageDiv" class="ExtraImage">' + sExtraImage + '</DIV>'
    return sInner;
}

function TC_HideExtraImage()
{
    var elemImage = document.getElementById("ExtraImage");
    elemImage.style.visibility = 'hidden'
    if ( g_sCABOnExtraImageClick != '')
        document.getElementById(g_sCABOnExtraImageClick).focus();
    if ( g_sGRBOnInfoClick != '')
        document.getElementById(g_sGRBOnExtraImageClick).focus();
    g_sCABOnExtraImageClick = '';
    g_sGRBOnExtraImageClick = '';
    g_GRBMS_ExtraImage_bActive = false;
}

function TC_ShowExtraImage()
{
    var iWidth = g_TC_iBiggestRight;
    var elemImage = document.getElementById("ExtraImage");
    elemImage.style.top = MakePixelString(100);
    elemImage.style.left = MakePixelString(0);//g_TC_Padding_Left_iSize)
    elemImage.style.width = MakePixelString(iWidth)
    elemImage.style.visibility = 'visible'

    g_sCABOnExtraImageClick = g_CAB_Focus_sId;
    g_sGRBOnExtraImageClick = g_GRB_Focus_sId;
    g_GRBMS_ExtraImage_bActive = true;
}

var g_GRBMS_SolvedImage_bActive = false;
var g_sCABOnSolvedImageClick = '';
var g_sGRBOnSolvedImageClick = '';

function MakeSolvedImageDiv()
{    
    var sSolvedImage = '<img onclick="TC_HideSolvedImage()" src="' + g_PuzzlePath_sThisPuzzle_Image_Solved + '" Id="SolvedImage" class="SolvedImage" width="100" alt="Cloudy Sky">';
    var sInner = '<DIV Id="SolvedImageDiv" class="SolvedImage">' + sSolvedImage + '</DIV>'
    return sInner;
}

function TC_HideSolvedImage()
{
    var elemImage = document.getElementById("SolvedImage");
    elemImage.style.visibility = 'hidden'
    if ( g_sCABOnSolvedImageClick != '')
        document.getElementById(g_sCABOnSolvedImageClick).focus();
    if ( g_sGRBOnSolvedImageClick != '')
        document.getElementById(g_sGRBOnSolvedImageClick).focus();
    g_sCABOnSolvedImageClick = '';
    g_sGRBOnSolvedImageClick = '';
    g_GRBMS_SolvedImage_bActive = false;
}

function TC_ShowSolvedImage()
{
//    var elemImageDiv = document.getElementById("SolvedImageDiv");
//    elemImageDiv.style.top = MakePixelString(0);
//    elemImageDiv.style.left = MakePixelString(0);//g_TC_Padding_Left_iSize)
   
    var iWidth = g_TC_iBiggestRight;
    var elemImage = document.getElementById("SolvedImage");
    elemImage.style.top = MakePixelString(100);
    elemImage.style.left = MakePixelString(g_TC_Padding_Left_iSize)
    elemImage.style.width = MakePixelString(iWidth)
    elemImage.style.visibility = 'visible'
/*
    var elemImageDiv = document.getElementById("SolvedImageDiv");
    elemImageDiv.style.visibility = 'visible'
    elemImageDiv.style.left = MakePixelString(g_TC_Padding_Left_iSize)
    elemImageDiv.style.top = MakePixelString(100)
    var iWidth = g_TC_iBiggestRight - g_TC_Padding_Left_iSize - g_TC_Padding_Right_iSize;
    elemImageDiv.style.width = MakePixelString(iWidth)
    elemImageDiv.style.height = MakePixelString(iWidth)
    var elemImage = document.getElementById("SolvedImage");
    elemImage.style.visibility = 'visible'
    elemImage.style.top = MakePixelString(100)
    elemImage.style.left = MakePixelString(g_TC_Padding_Left_iSize)
    elemImage.style.width = MakePixelString(iWidth)
*/

    g_sCABOnSolvedImageClick = g_CAB_Focus_sId;
    g_sGRBOnSolvedImageClick = g_GRB_Focus_sId;
    g_GRBMS_SolvedImage_bActive = true;
}
