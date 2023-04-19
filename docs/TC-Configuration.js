// TC-Configuration.js


var g_Window_iWidth = 640;
var g_InfoSettingsButtons_bActive = true;
var g_InfoSettingsButtons_iLeft = 500;
var g_InfoSettingsButtons_iTop  = 20;
var g_TitleLine_iTop  = 20;
var g_TitleLine_iWidth = 40;
var g_TitleLine_iHeight = 40;

var g_Dialog_SetDifficultyLevel_iTop = 240;
var g_Dialog_SetDifficultyLevel_iLeft = 110;
var g_Dialog_ResetPuzzle_iTop = 350;
var g_Dialog_ResetPuzzle_iLeft = 340;
var g_Dialog_SolvePuzzle_iTop = 280;
var g_Dialog_SolvePuzzle_iLeft = 340;

var g_bDisplayMessages = true;
var g_SA_bActive = false;

var g_KB_Buttons_Narrow = true;
var g_KB_sWidthDeterminedBy =  'BiggestRight';//'Grid'; //
var g_KB_fFractionAvailableWidth = 1.00; // 
var g_KB_sJustification = 'center'; // 'right' // 'grid'
var g_KB_bBackspaceKeyActive = true;
var g_KB_bArrowKeysActive = true;

var g_bSolveOnStart = false;
var g_bSolveOnStart_SuppressCorrectedIndicators = false;

var g_GR_GridOrInstruction_iTop = 58;
var g_Grid_fFractionAvailableWidth = 0.80;
var g_Grid_sJustification = 'right';//'center'
var g_Grid_iTopIfNoHowTo = 145;
var g_HowTo_bActive = true;  var g_HowTo_iTop = 200;

var g_DM_bActive = true; var g_DM_iTop = 200; var g_DM_iLeft = g_TC_Padding_Left_iSize;
var g_DM_iWidth = 200;
var g_MAM_bActive = true; var g_MAM_iTop = 400; // left determined by defined width

var gResultMessage_iTop = 75; 

var g_Timer_bActive = true; var g_Timer_iTop  = 30; var g_Timer_sLabel = 'Elapsed'; // left determined by defined puzzle width

var g_TC_ShadeBackgroundOnStatus_bActive = true;
var g_bResultMessageActive = true;
var g_bSettingsActive = true;
var g_ShowExtraImageButton_bActive = true;

var g_SG_AM_bShowSpecialClueCircles  = false;

var g_SpecialClue_bShowImageButton = false;
var g_bSpecialClueAnswerBoxesActive = true;
var g_SpecialClueFrame_bActive = true;  var g_SpecialClueFrame_iTop = 100; 
var g_SpecialClueFrame_iFrameWidth = 1;

var g_ClueAnswers_iFrameWidth = 1;

var g_bMessageVisible = true; 
var g_bSuppressNonGolden = false;
var g_bPrintedFormat = false;
var g_bSuppressGridNumbers = false;
var g_bArchiveShow = true;

var g_ThemeImage_Base_bActive = true;


function TC_Configuration_pick()
{
  setNew();
//  setForPrint();
//    setForPrint_ShowSolution();
}

function setForPrint_ShowSolution()
{
    g_ThemeImage_Base_bActive = false;
    g_InfoSettingsButtons_bActive = false;

    g_SA_bActive = false;

    g_bSuppressNonGolden = false;//true;

    g_bSolveOnStart = true;
    g_bSolveOnStart_SuppressCorrectedIndicators = true;
    g_sStatusButtonName_Corrected    = 'Button_Clear.png';

    g_KB_Buttons_Narrow = true; 
    g_KB_sWidthDeterminedBy =  'BiggestRight'; g_KB_fFractionAvailableWidth = 1.00; g_KB_sJustification = 'center'; g_Grid_fFractionAvailableWidth = 0.80; g_Grid_sJustification = 'center'
    g_KB_bBackspaceKeyActive = false; g_KB_bArrowKeysActive = false;

    g_GR_GridOrInstruction_iTop = 58;
    g_Grid_iTopIfNoHowTo    = 145;

    g_HowTo_bActive = false;
    g_Timer_bActive = false;
    g_bResultMessageActive = false;
    g_bSettingsActive = false;
    g_TC_ShadeBackgroundOnStatus_bActive = false;

    g_ShowExtraImageButton_bActive = false;
    g_bSpecialClueAnswerBoxesActive = true; g_SpecialClueFrame_iTop = 70; g_SpecialClueFrame_bActive = true; 
    g_SG_AM_bShowSpecialClueCircles  = true;
    g_SpecialClue_bShowImageButton = false;

    g_DM_bActive = false; g_DM_iTop = 200; g_DM_iLeft = g_TC_Padding_Left_iSize;
    g_MAM_bActive = false; g_MAM_iTop = 400; 

    g_bMessageVisible = false; 
    g_bPrintedFormat = true;
    g_bSuppressGridNumbers = false;
    g_bArchiveShow = true;
}

function setForPrint()
{
    g_SA_bActive = false;
    g_ThemeImage_Base_bActive = false;
    g_InfoSettingsButtons_bActive = false;

    g_bSuppressNonGolden = true;

    g_bSolveOnStart = false;
    g_bSolveOnStart_SuppressCorrectedIndicators = true;


    g_KB_Buttons_Narrow = true; 
    g_KB_sWidthDeterminedBy =  'BiggestRight'; g_KB_fFractionAvailableWidth = 1.00; g_KB_sJustification = 'center'; g_Grid_fFractionAvailableWidth = 0.80; g_Grid_sJustification = 'center'
    g_KB_bBackspaceKeyActive = false; g_KB_bArrowKeysActive = false;

    g_GR_GridOrInstruction_iTop = 58;
    g_Grid_iTopIfNoHowTo    = 145;
    g_HowTo_bActive = false;
    g_Timer_bActive = false;
    g_bResultMessageActive = false;
    g_TC_ShadeBackgroundOnStatus_bActive = false;
    g_bSettingsActive = false;
    g_ShowExtraImageButton_bActive = false;
    g_bSpecialClueAnswerBoxesActive = true; g_SpecialClueFrame_iTop = 70; g_SpecialClueFrame_bActive = true; 
    g_SG_AM_bShowSpecialClueCircles  = true;
    g_SpecialClue_bShowImageButton = false;

    g_DM_bActive = false; g_DM_iTop = 200; g_DM_iLeft = g_TC_Padding_Left_iSize;
    g_MAM_bActive = false; g_MAM_iTop = 400; 

    g_bMessageVisible = false; 
    g_bPrintedFormat = true;
    g_bSuppressGridNumbers = true;
    g_bArchiveShow = true;
}


function setNew()
{
    g_SA_bActive = true;
    g_ThemeImage_Base_bActive = true;
    g_InfoSettingsButtons_bActive = true;

    gResultMessage_iTop = 155;
    g_KB_Buttons_Narrow = false;
    g_KB_sWidthDeterminedBy =  'BiggestRight'; g_KB_fFractionAvailableWidth = 1.00; g_KB_sJustification = 'center';
    g_KB_bBackspaceKeyActive = true; g_KB_bArrowKeysActive = true;

    g_Grid_fFractionAvailableWidth = 0.80; g_Grid_sJustification = 'center';

    g_DM_bActive = true; g_DM_iTop = 200; g_DM_iLeft = g_TC_Padding_Left_iSize;
    g_MAM_bActive = true; g_MAM_iTop = 200; // left determined by defined puzzle width

    g_bSuppressNonGolden = false;

    g_bResultMessageActive = true;
    g_bSettingsActive = true;
    g_ShowExtraImageButton_bActive = false;

    g_SpecialClueFrame_bActive = true; g_SpecialClueFrame_iTop = 70; 
    g_bSpecialClueAnswerBoxesActive = true; g_SG_AM_bShowSpecialClueCircles  = true;
    g_SpecialClue_bShowImageButton = true;

    g_TC_ShadeBackgroundOnStatus_bActive = true;


    g_Timer_bActive = true; g_Timer_iTop  = 150; g_Timer_sLabel = 'Elapsed:'; // left from defined puzzle width

    g_HowTo_bActive = true;    g_HowTo_iTop    = 145;
    g_GR_GridOrInstruction_iTop = 58;

    g_bMessageVisible = true; 
    g_bPrintedFormat = false;
    g_bSuppressGridNumbers = false;
    g_bArchiveShow = true;
}

function AdjustForPrintSize()
{
    let elemBM = document.getElementById("Div_BottomMatter");
    let rectBM = GetBoundingClientRectAbsolute(elemBM);
    let iBottom = rectBM.bottom;
    let rDesired = 1.6;
    let iBottomDesired = g_Window_iWidth * rDesired;
// move the bottom matter 
    let iHeightBM = rectBM.height;
    let iTopBM = iBottomDesired - iHeightBM;
    elemBM.style.top = MakePixelString(iTopBM);
    rectBM = GetBoundingClientRectAbsolute(elemBM);
// now figure out where the grid ends
    let elemKB = document.getElementById('KB_Mini_Div');
    iBottom = rectBM.bottom;
}


