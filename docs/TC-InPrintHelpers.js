// TC-InPrintHelpers.js

// config for InPrintHelpers
var g_sScrambledUnplacedLettersAtStart = '';
//var g_bSuppressNonGoldenLetters = true;
//var g_sBodyBackgroundColor = g_Color_sWhite;
var g_bSuppressNonGoldenLetters = false;
var g_sBodyBackgroundColor = g_Color_sLightGray;

function GRB_ScrambledUnplacedLettersAtStart()
{
//    setlineAdd(' AfterScramble:' + g_aGridAnswersPlayer);
//    setlineAdd(' AfterScramble:' + g_aGridStatusPlayer);    
    let iAnswers = g_aGridAnswersPlayer.length;
    g_sScrambledUnplacedLettersAtStart = '';
    for ( let iAnswer = 0; iAnswer < iAnswers; iAnswer++)
    {
        let sAnswer_Row = g_aGridAnswersPlayer[iAnswer];
        let sStatus_Row = g_aGridStatusPlayer[iAnswer];
        let iRowLength = sAnswer_Row.length;
        for ( let iRowLetter = 0; iRowLetter < iRowLength; iRowLetter++ )
        {
            let cAnswer = sAnswer_Row.charAt(iRowLetter);
            let cStatus = sStatus_Row.charAt(iRowLetter);
            if ( cAnswer != g_cCode_BlackSquare)
            {
                if ( cStatus == g_cCode_Normal )
                g_sScrambledUnplacedLettersAtStart += cAnswer;
            }
        }
    }
    //setlineAdd(g_sPuzzleName + ':' + g_sScrambledUnplacedLettersAtStart);    
}


