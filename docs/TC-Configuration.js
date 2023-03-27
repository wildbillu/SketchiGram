// TC-Configuration.js

var g_bDisplayMessages = true;

var g_GR_GridOrInstruction_iTop = 58;
var g_KB_Buttons_Narrow = true;var g_KB_Active_Mini = false;var g_KB_Active_bAllGridChars = true;
var g_KB_sWidthDeterminedBy =  'BiggestRight';//'Grid'; //
var g_KB_fFractionAvailableWidth = 1.00; // 
var g_KB_sJustification = 'center'; // 'right' // 'grid'
var g_Grid_fFractionAvailableWidth = 0.80;
var g_Grid_sJustification = 'right';//'center'

var g_bDifficultyLevelActive = false;
var g_DM_bActive = true; var g_DM_iTop = 200; var g_DM_iLeft = g_TC_Padding_Left_iSize;
var g_MAM_bActive = true; var g_MAM_iTop = 400; var g_MAM_iLeft = g_TC_Padding_Left_iSize;

var gResultMessage_iTop = 75; 

var g_Timer_bActive = true; var g_Timer_iTop  = 30; var g_Timer_iLeft = 30; var g_Timer_sLabel = 'Elapsed';

var g_bResultMessageActive = true;
var g_bSettingsActive = true;
var g_ShowExtraImageButton_bActive = true;

var g_ActionMenu_bActive = false;  var g_ActionMenu_iTop = 150; var g_ActionMenu_iLeft = g_TC_Padding_Left_iSize;
var g_SG_AM_bShowDualClueCircles  = false;

var g_bDualClueAnswerBoxesActive = true;

var g_SpecialClueFrame_bActive = true;  var g_SpecialClueFrame_iTop = 100; 

var g_bMessageVisible = true; 
var g_bSuppressNonGolden = false;
var g_bPrintedFormat = false;
var g_bSuppressGridNumbers = false;
var g_bArchiveShow = true;

var g_HowTo_bActive = true;  var g_HowTo_iTop = 200;

function setNew()
{
    gResultMessage_iTop = 155;
    g_KB_Active_Mini = false;    g_KB_Active_bAllGridChars = true; g_KB_Buttons_Narrow = false;
    g_KB_sWidthDeterminedBy =  'BiggestRight'; g_KB_fFractionAvailableWidth = 1.00; g_KB_sJustification = 'center';

    g_Grid_fFractionAvailableWidth = 0.80; g_Grid_sJustification = 'center';

    g_bDifficultyLevelActive = false;
    g_DM_bActive = true; g_DM_iTop = 200; g_DM_iLeft = g_TC_Padding_Left_iSize;
    g_MAM_bActive = true; g_MAM_iTop = 200; g_MAM_iLeft = 480;
    g_ActionMenu_bActive = false; g_ActionMenu_iTop = 150; g_ActionMenu_iLeft = g_TC_Padding_Left_iSize;

    g_bSuppressNonGolden = false;

    g_bResultMessageActive = true;
    g_bSettingsActive = true;
    g_ShowExtraImageButton_bActive = false;

    g_bDualClueAnswerBoxesActive = true;
    g_SG_AM_bShowDualClueCircles  = true;

    g_Timer_bActive = true;  
//    g_Timer_iTop  = 45; g_Timer_iLeft = g_TC_Padding_Left_iSize; g_Timer_sLabel = 'Elapsed';
    g_Timer_iTop  = 150; g_Timer_iLeft = 480; g_Timer_sLabel = 'Elapsed:';

    g_SpecialClueFrame_bActive = true; g_SpecialClueFrame_iTop = 70; 
    g_HowTo_bActive = true;    g_HowTo_iTop    = 145;

    g_bMessageVisible = true; 
    g_bPrintedFormat = false;
    g_bSuppressGridNumbers = false;
    g_bArchiveShow = true;
}

function setOld()
{
    g_KB_Buttons_Narrow = true;
    g_KB_Active_Mini = false;
    g_KB_Active_bAllGridChars = true;
    g_KB_sWidthDeterminedBy =  'Grid'; 
    g_KB_fFractionAvailableWidth = 1.00;
    g_KB_sJustification = 'grid';
    g_Grid_fFractionAvailableWidth = 0.80;
    g_Grid_sJustification = 'center'
    g_bDifficultyLevelActive = true;
    g_HowTo_bActive = true;
    g_bSuppressNonGolden = false;
    g_Timer_bActive = true;
    g_bResultMessageActive = true;
    g_bSettingsActive = true;
    g_ShowExtraImageButton_bActive = true;
    g_ActionMenu_bActive = false;
    g_bDualClueAnswerBoxesActive = false;
    g_bMessageVisible = true; 
    g_SG_AM_bShowDualClueCircles  = false;
    g_bPrintedFormat = false;
    g_bSuppressGridNumbers = false;
    g_bArchiveShow = true;
    g_SpecialClueFrame_bActive = false; 
    g_SpecialClueFrame_iTop = 100; 
}

function setForPrint()
{
    g_KB_Buttons_Narrow = true;
    g_KB_Active_Mini = false;
    g_KB_Active_bAllGridChars = true;
    g_KB_sWidthDeterminedBy =  'BiggestRight'; 
    g_KB_fFractionAvailableWidth = 1.00;
    g_KB_sJustification = 'center';
    g_Grid_fFractionAvailableWidth = 0.80;
    g_Grid_sJustification = 'center'
    g_bDifficultyLevelActive = false;
    g_HowTo_bActive = false;
    g_bSuppressNonGolden = true;
    g_Timer_bActive = false;
    g_bResultMessageActive = false;
    g_bSettingsActive = false;
    g_ShowExtraImageButton_bActive = false;
    g_ActionMenu_bActive = false;
    g_bDualClueAnswerBoxesActive = true;
    g_SpecialClueFrame_iTop = 100; 
    g_SpecialClueFrame_bActive = true; 
    g_bMessageVisible = false; 
    g_SG_AM_bShowDualClueCircles  = true;
    g_bPrintedFormat = true;
    g_bSuppressGridNumbers = true;
    g_bArchiveShow = true;
}

function AdjustForPrintSize()
{
    let elem_SpecialClue_Div = document.getElementById("SpecialClue_Div");
    let elemBM = document.getElementById("Div_BottomMatter");
    let rectBM = GetBoundingClientRectAbsolute(elemBM);
    let iBottom = rectBM.bottom;
    let r = iBottom / g_TC_iBiggestRight;
    let rDesired = 1.6;
    let iBottomDesired = g_TC_iBiggestRight * rDesired;
// move the bottom matter 
    let iHeightBM = rectBM.height;
    let iTopBM = iBottomDesired - iHeightBM;
    elemBM.style.top = MakePixelString(iTopBM);
    rectBM = GetBoundingClientRectAbsolute(elemBM);
// now figure out where the grid ends
    let elemKB = document.getElementById('KB_Mini_Div');
    let rectKB = GetBoundingClientRectAbsolute(elemKB);
// now set the theme image sizes 
    let iBuffer = 5;
    let iHeightTheme = iTopBM - rectKB.bottom - 2 * iBuffer;
    g_ThemeImage_NormalSize_iTop = rectKB.bottom + iBuffer;
    g_ThemeImage_NormalSize_iHeight = iHeightTheme;
    let iWidthTheme = GetWidthToHeightRatioOfImageWithId("ThemeImage")*iHeightTheme;
// now get the width and centering right
    g_ThemeImage_NormalSize_iLeft = TC_LeftForCentering(iWidthTheme);
    g_ThemeImage_NormalSize_iWidth = iWidthTheme;

    SG2_ThemeImage_NormalSize_SetTo();
    iBottom = rectBM.bottom;
}


