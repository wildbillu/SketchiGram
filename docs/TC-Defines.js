var g_sCookie;
var g_sPuzzleVersion = '&nbsp;&nbsp;&nbsp;V.0.0.020'
var g_bPuzzleSolved = false;
var g_bGridSolved = false;
var g_bAnswersSolved = false;

// base defines
var g_sPuzzleDate = '';
var g_sPuzzleName = '';
var g_sPuzzleTitle = '';
var g_sPuzzleCreditAuthor = 'By Sketchi Bill';
var g_sPuzzleCreditDate = 'September 26, 2022';
var g_bDisplayMessages = true;

//
var g_ST_sClue_Intro = 'SketchiToons Clue to Dual Answer';
var g_ST_sClue_Itself = '';
//
// these are overall featured
// these are for Twisti-Cross only
var g_Place_bDirectPlaceSupport = false;
var g_Place_bPopupPlaceSupport = true;//false;

// these are overall or general
var g_bIsTwistiCross = true;
var g_bIsYourMove = false;
var g_bIsSketchiGram = false;
var g_bIsSketchiGramVariant1 = false;
var g_bIsSketchiGramVariant2 = false;

// these are to help with positioning
// they should be updated after each section
var g_TC_iBiggestBottom = 0;
var g_TC_iBiggestRight  = 450;

var g_TC_Padding_Left_iSize = 2;
var g_TC_Padding_Right_iSize = 2;
var g_TC_Padding_Top_iSize = 2;
var g_TC_Padding_Bottom_iSize = 2;
var g_TC_Padding_Inter_Horizontal_iSize = 2;
var g_TC_Padding_Inter_Vertical_iSize = 2;

var g_sToDisplay = '';

var g_sStatusButtonName_BlackSquare  = 'Button_BlackSquare.png';
var g_sStatusButtonName_Frame        = 'Button_Frame.png';
var g_sStatusButtonName_Empty        = 'Button_Empty.png';
var g_sStatusButtonName_Focus        = 'Button_AbvocabMagenta_Transparent32.png';
var g_sStatusButtonName_Inactive     = 'Button_White.png';
var g_sStatusButtonName_ActiveRow    = 'Button_AbvocabBlue_Transparent64.png';
var g_sStatusButtonName_GoldenSquare = 'Button_Golden.png';
var g_sStatusButtonName_Corrected    = 'Button_Status_OrangeCorner.png';
var g_sStatusButtonName_Incorrect    = 'Button_Status_RedSlash.png';
