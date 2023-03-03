// TC-Puzzle-Load.js

function CA_SetupGlobals(sClues, sAnswers, sAnswersPlayer, sStatusPlayer, sAnswerLocations, SA_EB_sWords, SA_EB_sWordStatus)
{
    g_aClues   = sClues.split(g_TC_cGeneralDelimiter);
    g_iClues   = g_aClues.length;
    g_aAnswers = sAnswers.split(g_TC_cGeneralDelimiter);
    g_iAnswers = g_aAnswers.length;
    g_aAnswersPlayer        = sAnswersPlayer.split(g_TC_cGeneralDelimiter);
    g_aAnswersStatusPlayer  = sStatusPlayer.split(g_TC_cGeneralDelimiter);
    g_aAnswerLocations      = sAnswerLocations.split(g_TC_cGeneralDelimiter);
    g_SA_EB_aWords.length = 0;
    g_SA_EB_aWords          = SA_EB_sWords.split(g_TC_cGeneralDelimiter);
    g_SA_EB_sWordStatus     = SA_EB_sWordStatus;
    if ( g_aClues.length != g_iClues || g_aAnswers.length != g_iClues || g_aAnswersPlayer.length != g_iClues || g_aAnswersStatusPlayer.length != g_iClues)
        setline('dataProblem.' + g_iClues + g_aClues.length + g_aAnswers.length + g_aAnswersPlayer.length + g_aAnswersStatusPlayer.length);
}

function GR_SetupGlobals(iGridWidth, iGridHeight, sGridAnswers, sGridAnswersPlayer, sGridStatusPlayer, sGridNumbering, sDualClueLocations)
{
    g_sDualClueLocations = sDualClueLocations;
    g_iGridWidth = iGridWidth;
    g_iGridHeight = iGridHeight;
    g_sGridNumbering = sGridNumbering;
    g_aGridAnswers.length = 0;
    g_aGridAnswersPlayer.length = 0;
    g_aGridStatusPlayer.length = 0;
//
    for ( iRow = 0; iRow < g_iGridHeight; iRow++ )      
    {
        g_aGridAnswers.      push(sGridAnswers.      substring(iRow*g_iGridWidth, (iRow+1)*g_iGridWidth));
        g_aGridAnswersPlayer.push(sGridAnswersPlayer.substring(iRow*g_iGridWidth, (iRow+1)*g_iGridWidth));
        g_aGridStatusPlayer. push(sGridStatusPlayer. substring(iRow*g_iGridWidth, (iRow+1)*g_iGridWidth));
    }
// new grid numbering helper
    g_aGridNumbers = g_sGridNumbering.split(g_TC_cGeneralDelimiter);
    g_GR_aAcrossAnswers.length = 0;
    g_GR_aAcrossAnswersNumber.length = 0;
    g_GR_aAcrossAnswersStartRow.length = 0;
    g_GR_aAcrossAnswersStartLetter.length = 0;
    g_GR_aAcrossAnswersClueNumber.length = 0;
    for ( var iRR = 0; iRR < g_iGridHeight; iRR++ )
    {  // helpers for Grid - Across
        let iNumber = -1;
        let sAnswer = '';
        let iStartRow = -1;
        let iStartLetter = -1;
        for ( var iLL = 0; iLL < g_iGridWidth; iLL++ )
        {
            var cThisChar = GRB_ForRowLetter_GetAnswer(iRR, iLL);
            if ( cThisChar != g_TC_cCharacterDenotingBlackSquare )
            {
                sAnswer += cThisChar;
                if ( iNumber == -1 )
                {
                    iNumber = g_aGridNumbers[iRR*g_iGridWidth+iLL];
                    iStartRow = iRR;
                    iStartLetter = iLL;
                }
            }
            else
            {
                if ( sAnswer != '' )
                {
                    if ( sAnswer.length != 1 )
                    {
                        g_GR_aAcrossAnswers.push(sAnswer);
                        g_GR_aAcrossAnswersNumber.push(iNumber);
                        g_GR_aAcrossAnswersStartRow.push(iStartRow);
                        g_GR_aAcrossAnswersStartLetter.push(iStartLetter);
                        g_GR_aAcrossAnswersClueNumber.push(SG_Clues_IndexOfAnswer(sAnswer));
                    }
                    iNumber = -1;
                    sAnswer = '';
                    iStartRow = -1;
                    sStartLetter = -1;
                }
            }
        }
        if ( sAnswer != '')
        {
            g_GR_aAcrossAnswers.push(sAnswer);
            g_GR_aAcrossAnswersNumber.push(iNumber);
            g_GR_aAcrossAnswersStartRow.push(iStartRow);
            g_GR_aAcrossAnswersStartLetter.push(iStartLetter);
            g_GR_aAcrossAnswersClueNumber.push(SG_Clues_IndexOfAnswer(sAnswer));
        }
    }
//    alert(g_GR_aAcrossAnswers);
//    alert(g_GR_aAcrossAnswersNumber);
//    alert(g_GR_aAcrossAnswersStartRow);
//    alert(g_GR_aAcrossAnswersStartLetter);
//    alert(g_GR_aAcrossAnswersClueNumber);
//
    g_GR_aDownAnswers.length = 0;
    g_GR_aDownAnswersNumber.length = 0
    g_GR_aDownAnswersStartRow.length = 0;
    g_GR_aDownAnswersStartLetter.length = 0;
    g_GR_aDownAnswersClueNumber.length = 0;

    for ( var iLL = 0; iLL < g_iGridWidth; iLL++ )
    {  // helpers for Grid - Down
        let iNumber = -1;
        let sAnswer = '';
        let iStartRow = -1;
        let iStartLetter = -1;
        for ( var iRR = 0; iRR < g_iGridHeight; iRR++ )
        {
            var cThisChar = GRB_ForRowLetter_GetAnswer(iRR, iLL);
            if ( cThisChar != g_TC_cCharacterDenotingBlackSquare )
            {
                sAnswer += cThisChar;
                if ( iNumber == -1 )
                {
                    iNumber = g_aGridNumbers[iRR*g_iGridWidth+iLL];
                    iStartRow = iRR;
                    iStartLetter = iLL;
                }
            }
            else
            {
                if ( sAnswer != '' )
                {
                    if ( sAnswer.length != 1 )
                    {
                        g_GR_aDownAnswers.push(sAnswer);
                        g_GR_aDownAnswersNumber.push(iNumber);
                        g_GR_aDownAnswersStartRow.push(iStartRow);
                        g_GR_aDownAnswersStartLetter.push(iStartLetter);
                        g_GR_aDownAnswersClueNumber.push(SG_Clues_IndexOfAnswer(sAnswer));
                    }
                    iNumber = -1;
                    sAnswer = '';
                }
            }
        }
        if ( sAnswer != '' )
        {
            g_GR_aDownAnswers.push(sAnswer);
            g_GR_aDownAnswersNumber.push(iNumber);
            g_GR_aDownAnswersStartRow.push(iStartRow);
            g_GR_aDownAnswersStartLetter.push(iStartLetter);
            g_GR_aDownAnswersClueNumber.push(SG_Clues_IndexOfAnswer(sAnswer));
        }
    }
//alert(g_GR_aDownAnswers);
//    alert(g_GR_aDownAnswersNumber);
//    alert(g_GR_aDownAnswersStartRow);
//    alert(g_GR_aDownAnswersStartLetter);
//alert(g_GR_aDownAnswersClueNumber);


}

function TC_FixNumber(sNumberAsString)
{
    let sReturn = sNumberAsString;
    if ( sNumberAsString == 'A') sReturn = 10
    if ( sNumberAsString == 'B') sReturn = '11'
    if ( sNumberAsString == 'C') sReturn = '12'
    if ( sNumberAsString == 'D') sReturn = '13'
    if ( sNumberAsString == 'E') sReturn = '14'
    if ( sNumberAsString == 'E') sReturn = '15'
    return sReturn;
}