// TC-LoadExtraSolvedImages.js
var g_GRBMS_ExtraImage_bActive = false;
var g_sCABOnExtraImageClick = '';
var g_sGRBOnExtraImageClick = '';

function MakeExtraImageDiv()
{    
    var sExtraImage = '<img onclick="TC_HideExtraImage()" src="' + g_PuzzlePath_sName_Image_Extra + '" Id="ExtraImage" class="ExtraImage" width="100" alt="Cloudy Sky">';
    var sInner = '<DIV Id="ExtraImageDiv" class="ExtraImage">' + sExtraImage + '</DIV>'
    return sInner;
}

function TC_HideExtraImage()
{
    if ( !g_GRBMS_ExtraImage_bActive ) return;
//
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
    let elemTitle = document.getElementById("Div_PuzzleTitle");
    let rectTitle = elemTitle.getBoundingClientRect();
    elemImage.style.top = MakePixelString(rectTitle.bottom + 2 );
    elemImage.style.left = MakePixelString(0);//g_TC_Padding_Left_iSize)
    elemImage.style.width = MakePixelString(iWidth)
    elemImage.style.visibility = 'visible'

    g_sCABOnExtraImageClick = g_CAB_Focus_sId;
    g_sGRBOnExtraImageClick = g_GRB_Focus_sId;
    g_GRBMS_ExtraImage_bActive = true;
    ForIdSetVisibility("ScratchArea", true);
    setTimeout(function(){TC_HideExtraImage();}, 10000); 
}

var g_GRBMS_SolvedImage_bActive = false;
var g_sCABOnSolvedImageClick = '';
var g_sGRBOnSolvedImageClick = '';

function MakeSolvedImageDiv()
{    
    var sSolvedImage = '<img onclick="TC_HideSolvedImage()" src="' + g_PuzzlePath_sName_Image_Solved + '" Id="SolvedImage" class="SolvedImage StartHidden" width="100" alt="Cloudy Sky">';
    var sInner = '<DIV Id="SolvedImageDiv" class="SolvedImage">' + sSolvedImage + '</DIV>'
    return sInner;
}

function TC_HideSolvedImage()
{
    if ( !g_GRBMS_SolvedImage_bActive ) return;
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
    var iWidth = g_TC_iBiggestRight;
    var elemImage = document.getElementById("SolvedImage");
    elemImage.style.top = MakePixelString(100);
    elemImage.style.left = MakePixelString(g_TC_Padding_Left_iSize)
    elemImage.style.width = MakePixelString(iWidth)
    elemImage.style.visibility = 'visible'
    g_sCABOnSolvedImageClick = g_CAB_Focus_sId;
    g_sGRBOnSolvedImageClick = g_GRB_Focus_sId;
    g_GRBMS_SolvedImage_bActive = true;
    setTimeout(function(){TC_HideSolvedImage();}, 10000); 
}
