var g_sCookie;
var g_sPuzzleVersion = '&nbsp;&nbsp;&nbsp;V.0.0.020'
var g_bPuzzleSolved  = false;
var g_bGridSolved    = false;
var g_bResettingDoNotUseCookie = false;

var g_TC_bMoveMade_Grid = false;
var g_TC_bMoveMade_Hint = false;

// base defines
var g_sPuzzleName = 'puzzle026';
//
var g_ST_sClue_Itself = '';
//
// these are overall or general
// these are to help with positioning
// they should be updated after each section

var g_TC_Padding_Left_iSize = 2;
var g_TC_Padding_Right_iSize = 2;
var g_TC_Padding_Top_iSize = 2;
var g_TC_Padding_Bottom_iSize = 2;
var g_TC_Padding_Inter_Horizontal_iSize = 2;
var g_TC_Padding_Inter_Vertical_iSize = 8;

var g_sToDisplay = '';

var g_sStatusButtonName_BlackSquare  = 'Button_BlackSquare.png';
var g_sStatusButtonName_Frame        = 'Button_Frame.png';
var g_sStatusButtonName_Frame_Rounded_ForNoNumberSquares      = 'Button_SquarePlusRoundedFrame.png';
var g_sStatusButtonName_Frame_Rounded_ForNumberSquares        = 'Button_SquarePlusRoundedFrameNoTopLeft.png';
var g_sStatusButtonName_Frame_DoubleRounded_ForNoNumberSquares = 'Button_SquarePlusDualRoundedFrame.png';
var g_sStatusButtonName_Frame_DoubleRounded_ForNumberSquares = 'Button_SquarePlusDualRoundedFrameNoTopLeft.png';

var g_sStatusButtonName_Empty        = 'Button_Empty.png';
var g_sStatusButtonName_Focus        = 'Button_AbvocabMagenta_Transparent32_WideBorder.png';
//var g_sStatusButtonName_Focus        = 'Button_AbvocabMagenta_Transparent32.png';
var g_sStatusButtonName_BeingSwiped  = 'Button-SwipeMe.png';

var g_sStatusButtonName_Inactive     = 'Button_Clear.png';
var g_sStatusButtonName_ActiveRow    = 'Button_AbvocabBlue_Transparent64.png';
var g_sStatusButtonName_GoldenSquare = 'Button_Golden.png';
var g_sStatusButtonName_Corrected    = 'Button_Status_OrangeCorner.png';
var g_sStatusButtonName_SolvedSpecial= 'Button_AbvocabMagenta_Transparent32.png';

