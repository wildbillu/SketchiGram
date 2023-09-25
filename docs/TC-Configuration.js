// TC-Configuration.js
// 
//   size    total     special
//    4        4          1
//    5        7          2
//    6       12          3
//    7       14          4 
//    8       16          up to 5

var g_TopMatter_iTop = 20;

var g_iStartAtIndex = 0;
var g_iDelayForStart = 5000;
var g_InfoScreen_bHidden = false;
var g_OneLineInstruction_iTop = 40;

var g_CAL_iTop = 100; var g_CAL_iLeft = -1; var g_CAL_iPadding = 80

var g_GRB_TopRow_Buttons_iSize = 50;

var g_TC_SyncGridAndSpecialClueAnswers_bActive = false;

var g_Move_bSetFocusToDroppedSquare = true;

var g_Window_iWidth = 640;
var g_Window_iHeight = 1170;
var g_InfoSettingsButtons_iLeft = 10;
var g_InfoSettingsButtons_iTop  = 20;

var g_TitleLine_iTop  = 20;
var g_TitleLine_iWidth = 40;
var g_TitleLine_iHeight = 40;

var g_MoreMenu_iTop = 100;
var g_MoreMenu_iLeft = 100;

var g_bDisplayMessages = true;

var g_bSolveOnStart = false;
var g_bSolveOnStart_SuppressCorrectedIndicators = false;

var g_GR_Grid_iTop = 58;

var g_Timer_bActive = true; var g_Timer_iTop  = 30; var g_Timer_iLeft = 30; var g_Timer_sLabel = 'Elapsed'; // left determined by defined puzzle width
var g_Archive_iTop = 100;
var g_bSettingsActive = true;
var g_ShowExtraImageButton_bActive = true;

var g_SpecialClue_bShowImageButton = false;
var g_SpecialClueAnswerBoxes_bActive = true;
var g_SpecialClueFrame_bActive = true;  
var g_SpecialClueFrame_iTop = 100; 
var g_SpecialClueFrame_iFrameWidth = 1;

var g_ClueAnswers_iFrameWidth = 1;

var g_bMessageVisible = true; 
var g_bSuppressGridNumbers = false;
var g_bArchiveShow = true;

var g_ThemeImage_Base_iMinimumHeight = 250;

var g_Archive_iTop = 100;

var g_iBottomMatterTop = 800; 
var g_GRB_bShowSelectRowColumn      = false;
var g_CAB_bFillFromCorrectInGrid    = true;
var g_bGridAndCA                    = false;
var g_StatusControlRow_iTop   = 60;
var g_StatusControlRow_sAlign = 'center';
var g_SpecialClueFrame_iHeight = 110;

var g_SyncSketchiToonsClue = false;

function TC_Configuration_pick()
{
    setV3();
}

function setV3()
{
    g_TopMatter_iTop = 20;
    g_OneLineInstruction_iTop = 165;
    g_SpecialClueFrame_iTop = 820; g_SpecialClueFrame_iHeight = 110; g_SpecialClueFrame_bActive = true; 
    
    g_CAL_iTop = 300; g_CAL_iLeft = -1; g_CAL_iPadding = 80
    g_MoreMenu_iTop = 70; g_MoreMenu_iLeft = 250;
    g_Archive_iTop = 190;
    g_StatusControlRow_iTop   = 80;
    g_iBottomMatterTop = 945; 
    g_Timer_iTop  = 140; g_Timer_bActive = true; g_Timer_iLeft = 280; g_Timer_sLabel = ''; // left from defined puzzle width
    g_GR_Grid_iTop = 190;

    g_SyncSketchiToonsClue = false;
    g_bGridAndCA = false;
    g_StatusControlRow_sAlign = 'center';
    g_GRB_bShowSelectRowColumn      = true;
    g_CAB_bFillFromCorrectInGrid    = true;
    g_TC_SyncGridAndSpecialClueAnswers_bActive = true;
    g_bSettingsActive = true;
    g_ShowExtraImageButton_bActive = false;
    g_SpecialClueAnswerBoxes_bActive = true; 
    g_SpecialClue_bShowImageButton = true;
    g_bMessageVisible = true; 
    g_bSuppressGridNumbers = true;
    g_bArchiveShow = true;
}
