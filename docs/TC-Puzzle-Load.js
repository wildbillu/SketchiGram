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
    g_SA_EB_aWords          = SA_EB_sWords.split(g_TC_cGeneralDelimiter);
    g_SA_EB_sWordStatus     = SA_EB_sWordStatus;
    if ( g_aClues.length != g_iClues || g_aAnswers.length != g_iClues || g_aAnswersPlayer.length != g_iClues || g_aAnswersStatusPlayer.length != g_iClues)
        setline('dataProblem.' + g_iClues + g_aClues.length + g_aAnswers.length + g_aAnswersPlayer.length + g_aAnswersStatusPlayer.length);
}

function GR_SetupGlobals(iGridWidth, iGridHeight, sGridAnswers, sGridAnswersPlayer, sGridStatusPlayer, sGridNumbering)
{
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
    for ( var iRR = 0; iRR < g_iGridHeight; iRR++ )
    {  // helpers for Grid - Across
        var sNumber = '';
        var sAnswer = '';
        for ( var iLL = 0; iLL < g_iGridWidth; iLL++ )
        {
            var cThisChar = GRB_ForRowLetter_GetAnswer(iRR, iLL);
            if ( cThisChar != g_TC_cCharacterDenotingBlackSquare )
            {
                sAnswer += cThisChar;
                if ( sNumber == '' )
                    sNumber = g_sGridNumbering.charAt(iRR*g_iGridWidth+iLL);
            }
        }
        g_GR_aAcrossAnswers.push(sAnswer);
        g_GR_aAcrossAnswersNumber.push(sNumber);
    }        
    for ( var iLL = 0; iLL < g_iGridWidth; iLL++ )
    {  // helpers for Grid - Down
        var sNumber = '';
        var sAnswer = '';
        for ( var iRR = 0; iRR < g_iGridHeight; iRR++ )
        {
            var cThisChar = GRB_ForRowLetter_GetAnswer(iRR, iLL);
            if ( cThisChar != g_TC_cCharacterDenotingBlackSquare )
            {
                sAnswer += cThisChar;
                if ( sNumber == '' )
                    sNumber = g_sGridNumbering.charAt(iRR*g_iGridWidth+iLL);
            }
        }
        g_GR_aDownAnswers.push(sAnswer);
        g_GR_aDownAnswersNumber.push(sNumber);
    }
}