// TC-Configuration.js
// 
//   size    left     special
//    4       11          1
//    5       13          2
//    6       15          3
//    7       15          4 
//    8       15          4

var g_Archive_bDontShowFuturePuzzles = true;

var g_TitleInOpeningFrame_bShowPrefix = true;
var g_TitleInFullInstructionsFrame_bShowPrefix = true;
var g_TitleInMainFrame_bShowPrefix = true;

var g_ArchiveEntries_bShowPrefix = false; // true 10 ; false 20
var g_TC_Archive_Menu_iMaxItems = 20;


var g_MII_Grid_iTop = 300;var g_MII_Grid_ShowAfter_iSec = 60; var g_MII_Grid_ShowFor_iSec   = 10; var g_MII_Grid_Show_iCloseTimerId = 0;

var g_MII_Hint_iTop = 600;var g_MII_Hint_ShowAfter_iSec = 120;var g_MII_Hint_ShowFor_iSec   = 10;var g_MII_Hint_Show_iCloseTimerId = 0;

var g_Window_iWidth = 640;
var g_Window_iHeight = 1170;


var g_ThemeImage_Base_izIndex = 20; var g_ThemeImage_Hint_izIndex = 20; 
var g_ThemeImage_Solved_iTop = 155;var g_ThemeImage_Solved_izIndex = 20;


var g_CAL_iLineHeight = 22;
var g_CAL_izIndex = -1;
var g_CAL_iBottom = 1130; var g_CAL_iLeft = -1; var g_CAL_iPadding = 80

var g_Archive_bActive = true; var g_Archive_iTop = 190; var g_Archive_iLeft = 300; var g_Archive_iWidth = 200;
var g_Archive_iFudgeWidth = 30; var g_ArchiveList_iTop = 190;
var g_Archive_izIndex = 20;

var g_TopMatter_iTop = 20;
var g_BottomMatter_iTop = 1170;
var g_Message_bVisible = true; var g_Message_iTop = 1150;

var g_iStartAtIndex = 0;
var g_iDelayForStart = 5000;
var g_InfoScreen_bHidden = false;
var g_OneLineInstruction_iTop = 40;


var g_GRB_TopRow_Buttons_iSize = 50;


var g_InfoSettingsButtons_iLeft = 10;var g_InfoSettingsButtons_iTop  = 20;

var g_TitleLine_iTop  = 20;var g_TitleLine_iWidth = 40;var g_TitleLine_iHeight = 40;

var g_MoreMenu_iTop = 100;var g_MoreMenu_iLeft = 100;


var g_GR_Grid_iTop = 58;

var g_Timer_bActive = true; var g_Timer_iTop  = 30; var g_Timer_iLeft = 30; var g_Timer_sLabel = 'Elapsed'; // left determined by defined puzzle width

var g_bSettingsActive = true;

var g_SpecialClue_bShowImageButton = false; var g_SpecialClueAnswerBoxes_bActive = true;
var g_SpecialClueFrame_bActive = true;  var g_SpecialClueFrame_iTop = 100; var g_SpecialClueFrame_iFrameWidth = 1; var g_SpecialClueFrame_iHeight = 110;

var g_TC_SyncGridAndSpecialClueAnswers_bActive = false;
var g_ClueAnswers_iFrameWidth = 1;

var g_bSuppressGridNumbers = false;

var g_GRB_bShowSelectRowColumn      = false;

var g_StatusControlRow_iTop = 60; var g_StatusControlRow_iLeft = 50;

var g_Settings_iTop = 100; var g_Settings_iLeft = -1; var g_Settings_izIndex = 4;

var g_SyncSketchiToonsClue = false;

function TC_Configuration_pick()
{
// these dont move     
    g_TopMatter_iTop = 25;
    g_BottomMatter_iTop = 1145;
    g_Message_iTop = 1120;g_Message_bVisible = true; 
    g_CAL_iBottom = 1130; g_CAL_iLineHeight = 22; g_CAL_izIndex = 5; g_CAL_iLeft = -1; g_CAL_iPadding = 80

    // these adjust to space left for title
    let iTopAdjust = 125;
    g_Settings_iTop = iTopAdjust + 50; g_Settings_iLeft = -1; g_Settings_izIndex = 22;
    g_StatusControlRow_iTop = iTopAdjust; g_StatusControlRow_iLeft = 50; // -1 to center
    g_ArchiveActivationButton_iTop = iTopAdjust + 10; g_ArchiveActivationButton_iLeft = 380; g_ArchiveActivationButton_iWidth = 200;
    g_ArchiveList_iTop = iTopAdjust + 50;
    g_Archive_bActive = true; 
    g_Archive_izIndex = 5; 

    g_MoreMenu_iTop = 52; g_MoreMenu_iLeft = 195;

    g_Timer_iTop = iTopAdjust + 55; g_Timer_bActive = true; g_Timer_iLeft = 280; g_Timer_sLabel = ''; // left from defined puzzle width

    g_OneLineInstruction_iTop = iTopAdjust + 75;
    g_GR_Grid_iTop = iTopAdjust + 110;
    g_MII_Grid_iTop = iTopAdjust + 110;g_MII_Grid_ShowAfter_iSec = 60; g_MII_Grid_ShowFor_iSec   = 10;g_MII_Grid_Show_iCloseTimerId = 0;

    g_SpecialClueFrame_iTop = iTopAdjust + 730; g_SpecialClueFrame_iHeight = 110; g_SpecialClueFrame_bActive = true; 
    g_MII_Hint_iTop = iTopAdjust + 730;g_MII_Hint_ShowAfter_iSec = 120;g_MII_Hint_ShowFor_iSec   = 10;g_MII_Hint_Show_iCloseTimerId = 0;

    g_SyncSketchiToonsClue = false;
    g_bGridAndCA = false;
    g_GRB_bShowSelectRowColumn      = true;

    g_TC_SyncGridAndSpecialClueAnswers_bActive = true;
    g_bSettingsActive = true;

    g_SpecialClueAnswerBoxes_bActive = true; g_SpecialClue_bShowImageButton = true;
    
    g_ThemeImage_Base_izIndex = 20;
    g_ThemeImage_Hint_izIndex = 20;
    g_ThemeImage_Solved_izIndex = 20;
    g_ThemeImage_Solved_iTop = 160

    g_bSuppressGridNumbers = true;
}

