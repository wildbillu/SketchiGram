// TC-Defines-ImageSupport.js

var g_sImagePath_General              = 'images/';
var g_sImagePath_GridNumbersAndFrames = 'images/GridNumbersAndFrames/';
var g_sImagePath_Letters              = 'images/Letters/';
var g_sImagePath_StatusIndicators     = 'images/StatusIndicators/';
var g_sImagePath_Buttons              = 'images/Buttons/';

var g_PuzzlePath_sBaseDirectory         = 'puzzles/';
var g_PuzzlePath_sTemplate_Directory    = 'puzzles/puzzle000/';
var g_PuzzleFile_sTemplate_Text         = 'puzzles/puzzle000/puzzle000.txt';
var g_PuzzlePath_sTemplate_Image        = 'puzzles/puzzle000/puzzle000.jpg';
var g_PuzzlePath_sTemplate_Image_Extra  = 'puzzles/puzzle000/puzzle000-extra.jpg';
var g_PuzzlePath_sTemplate_Image_Solved = 'puzzles/puzzle000/puzzle000-solved.jpg';
var g_PuzzlePath_sTemplate_ReplaceMe    = 'puzzle000'


var g_PuzzleFile_sName_Text         = '';
var g_PuzzlePath_sName_Image        = '';
var g_PuzzlePath_sName_Image_Extra  = '';
var g_PuzzlePath_sName_Image_Solved = '';

function TC_SetFinalPuzzleFileNames(sName)
{
    g_PuzzleFile_sName_Text         = g_PuzzleFile_sTemplate_Text.        replaceAll(g_PuzzlePath_sTemplate_ReplaceMe, sName);
    g_PuzzlePath_sName_Image        = g_PuzzlePath_sTemplate_Image.       replaceAll(g_PuzzlePath_sTemplate_ReplaceMe, sName);
    g_PuzzlePath_sName_Image_Extra  = g_PuzzlePath_sTemplate_Image_Extra. replaceAll(g_PuzzlePath_sTemplate_ReplaceMe, sName);
    g_PuzzlePath_sName_Image_Solved = g_PuzzlePath_sTemplate_Image_Solved.replaceAll(g_PuzzlePath_sTemplate_ReplaceMe, sName);
    g_sPuzzleNumber = sName;
}

var g_File_iMinimumLines = 20;

function TC_FullButtonName(sButton)
{
    sFull = g_sImagePath_Buttons + sButton;
    return sFull;
}

function TC_GetStatusOverlayImagePathAndName(cStatus)
{
    if ( cStatus == g_TC_cCodeMeaning_Normal )
        return g_sImagePath_StatusIndicators + g_sStatusButtonName_Empty;
//    if ( cStatus == g_TC_cCodeMeaning_Golden )
//    {
//        return g_sImagePath_StatusIndicators + g_sStatusButtonName_GoldenSquare;
//    }
if ( cStatus == g_TC_cCodeMeaning_Corrected )
        return g_sImagePath_StatusIndicators + g_sStatusButtonName_Corrected;
        if ( cStatus == g_TC_cCodeMeaning_Incorrect )
        {
            if ( g_bIsSketchiGram )
                return g_sImagePath_StatusIndicators + g_sStatusButtonName_Empty;
            else
                return g_sImagePath_StatusIndicators + g_sStatusButtonName_Incorrect;
        }
        if ( cStatus == g_TC_cCodeMeaning_IncorrectWithOverride )
        {
            return g_sImagePath_StatusIndicators + g_sStatusButtonName_Incorrect;
        }
        return '';
}

function TC_GetBlackSquareImagePathAndName()
{
    return g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_BlackSquare;
}

function TC_GetButtonFrameImagePathAndName()
{
    return g_sImagePath_GridNumbersAndFrames + g_sStatusButtonName_Frame;
}

function TC_GetLetterImagePathAndName(cLetter, cColor)
{
    var sLetterImage = g_sImagePath_Letters + 'L_' + cLetter + '_' + cColor + '.png';
    return sLetterImage;
}

function TC_GetGridNumberImagePathAndName(sNumber)
{
    var sGridNumberImageAndPathName = g_sImagePath_GridNumbersAndFrames + 'No-' + sNumber + '.png';
    return sGridNumberImageAndPathName;
}

function TC_GetStatusImagePathAndName(cSelection)
{
    var sStatusImage = g_sImagePath_StatusIndicators;
    if ( cSelection == g_TC_cCodeMeaning_HasFocus)
        sStatusImage += g_sStatusButtonName_Focus;
    else if ( cSelection == g_TC_cCodeMeaning_ActiveRow)
        sStatusImage += g_sStatusButtonName_ActiveRow;
    else
        sStatusImage += g_sStatusButtonName_Inactive;
    return sStatusImage;
}


