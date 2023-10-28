// FullInstructions.js

var g_FI_fOverallWidthFraction  = 0.9;
var g_FI_fRestWidthFraction     = 0.95;
var g_FI_fGridHintWidthFraction = 0.9;

var g_FI_iLeft                = -1;
var g_FI_iTop                 = 50;
var g_FI_CopyrightEtc_iHeight = 50;
var g_FI_Credits_iHeight      = 135;
var g_FI_Title_iHeight        = 35;
var g_FI_Intro_iHeight        = 135;

function FI_Hide()
{
    ForIdSetVisibility("FullInstructions_Div", false);    
}

function FI_Show()
{
    ForIdSetVisibility("FullInstructions_Div", true);
}

function FI_SizeAndPosition()
{
    let iWidthOverall = Math.round(g_Window_iWidth * g_FI_fOverallWidthFraction);
//
    let iWidthGridHint = Math.round(iWidthOverall * g_FI_fGridHintWidthFraction);
    let iGridHintLeft = Math.round((iWidthOverall - iWidthGridHint) / 2 );

    let iWidthRest = Math.round(iWidthOverall * g_FI_fRestWidthFraction)
    let iLeftRest  = Math.round((iWidthOverall - iWidthRest) / 2)
//    
    let elemGrid    = document.getElementById("FI_Grid_Div");
    let elemGridImage = document.getElementById("FI_Grid_Image_Div");
    let fWtoHGrid = GetWidthToHeightRatioOfImageWithId("FI_Grid_Image_Div");
    let iHeightGrid = Math.round(iWidthGridHint / fWtoHGrid);
    elemGrid.style.width  = MakePixelString(iWidthGridHint);
    elemGrid.style.height = MakePixelString(iHeightGrid);
    elemGrid.style.left   = MakePixelString(iGridHintLeft);
    elemGridImage.style.height = MakePixelString(iHeightGrid);
    elemGridImage.style.width  = MakePixelString(iWidthGridHint);
    //
    let elemHint    = document.getElementById("FI_Hint_Div");
    let elemHintImage = document.getElementById("FI_Hint_Image_Div");
    let fWtoHHint = GetWidthToHeightRatioOfImageWithId("FI_Hint_Image_Div");
    let iHeightHint = Math.round(iWidthGridHint / fWtoHHint);
    elemHint.style.width  = MakePixelString(iWidthGridHint);
    elemHint.style.height = MakePixelString(iHeightHint);
    elemHint.style.left = MakePixelString(iGridHintLeft);
    elemHintImage.style.height = MakePixelString(iHeightHint);
    elemHintImage.style.width  = MakePixelString(iWidthGridHint);
//
    let elemTitle = document.getElementById("FI_Title_Div");
    elemTitle.style.height = MakePixelString(g_FI_Title_iHeight);
    elemTitle.style.width = MakePixelString(iWidthRest);
    elemTitle.style.left = MakePixelString(iLeftRest);
//
    let elemIntro = document.getElementById("FI_Intro_Div");
    elemIntro.style.height = MakePixelString(g_FI_Intro_iHeight);
    elemIntro.style.width = MakePixelString(iWidthRest);
    elemIntro.style.left = MakePixelString(iLeftRest);
//
    let elemCredits = document.getElementById("FI_Credits_Div");
    elemCredits.style.height = MakePixelString(g_FI_Credits_iHeight);
    elemCredits.style.width = MakePixelString(iWidthRest);
    elemCredits.style.left = MakePixelString(iLeftRest);
//
    let elemCopyrightEtc = document.getElementById("FI_CopyrightEtc_Div");
    elemCopyrightEtc.style.height = MakePixelString(g_FI_CopyrightEtc_iHeight);
    elemCopyrightEtc.style.width = MakePixelString(iWidthRest);
    elemCopyrightEtc.style.left = MakePixelString(iLeftRest);
//
    let elemFI = document.getElementById("FullInstructions_Div");
    elemFI.style.width = MakePixelString(iWidthOverall);
    elemFI.style.top = MakePixelString(g_FI_iTop);
    if ( g_FI_iLeft != -1 )
        elemFI.style.left = MakePixelString(g_FI_iLeft)
    else
        elemFI.style.left = MakePixelString(Math.round(TC_LeftForCentering(iWidthOverall)));
    let FI_iHeight = 10;
    FI_iHeight += iHeightGrid;
    FI_iHeight += iHeightHint;
    FI_iHeight +=g_FI_CopyrightEtc_iHeight;
    FI_iHeight +=g_FI_Credits_iHeight;
    FI_iHeight +=g_FI_Title_iHeight;
    FI_iHeight +=g_FI_Intro_iHeight;
    elemFI.style.height = MakePixelString(FI_iHeight)
}

function FI_Create()
{
    let sInner = "";
    sInner += '<DIV Id="FI_Title_Div" class="FI_Title">Title</DIV>';
    sInner += '<DIV Id="FI_Intro_Div" class="FI_Intro">Intro</DIV>';
    sInner += '<DIV Id="FI_Grid_Div" class="FI_Grid">image</DIV>';
    sInner += '<DIV Id="FI_Hint_Div" class="FI_Hint">Hint</DIV>';
    sInner += '<DIV Id="FI_Credits_Div" class="FI_Credits">Credits</DIV>';
    sInner += '<DIV Id="FI_CopyrightEtc_Div" class="FI_CopyrightEtc">Credits</DIV>';
    let elemFI = document.getElementById("FullInstructions_Div");
    elemFI.innerHTML = sInner;
//
    let elemTitle   = document.getElementById("FI_Title_Div");
    let sTitle = 'About SketchiGram&trade; Puzzles';
    elemTitle.innerHTML = sTitle;
//
    let elemIntro   = document.getElementById("FI_Intro_Div");
    let sIntro = '';
    sIntro += 'Concept' + '<br>' ;
    sIntro += 'The SketchiGram is or a 2-D Anagram or Jumble, presented as a scrambled crossword grid.'
    sIntro += ' Your job is to rearrange the scrambled letters into a proper crossword.'
    sIntro += ' To help you there is a clue and a SketchiToons&reg; cartoon.'
    elemIntro.innerHTML = sIntro;

    let elemGrid    = document.getElementById("FI_Grid_Div");
    let sGridImageId = 'FI_Grid_Image_Div'
    let sGrid = '';
    sGrid += '<img Id="' + sGridImageId + '" class="' + g_MII_Grid_sClass_Image + '" src="' + g_MII_Grid_sImage + '" alt="' + g_MII_Grid_sImage + '">';
    elemGrid.innerHTML = sGrid;

    let elemHint    = document.getElementById("FI_Hint_Div");
    let sHintImageId = 'FI_Hint_Image_Div'
    let sHint = '';
    sHint += '<img Id="' + sHintImageId + '" class="' + g_MII_Hint_sClass_Image + '" src="' + g_MII_Hint_sImage + '" alt="' + g_MII_Hint_sImage + '">';
    elemHint.innerHTML = sHint;

    let elemCredits = document.getElementById("FI_Credits_Div");
    let sCredits = TC_Archive_SetIntroScreenCreditsHTML(g_TitleInFullInstructionsFrame_bShowPrefix);
    elemCredits.innerHTML = sCredits;

    let elemCopyrightEtc = document.getElementById("FI_CopyrightEtc_Div");
    let sCopyrightEtc = ''
    sCopyrightEtc += 'From Absolutely Vocabulous&trade; with SketchiToons&reg; by Sketchi Bill' + '<br>';
    sCopyrightEtc += '&copy;2022 Northeast by Southwest, Inc.' + '<br>';
    sCopyrightEtc += g_sPuzzleVersion + '&nbsp;&nbsp;' + g_PuzzleFile_sName_Text;
    elemCopyrightEtc.innerHTML = sCopyrightEtc;
}
