// TC-Puzzle-Load.js

function CA_SetupGlobals(sClues, sAnswers, sAnswersPlayer, 
                         sStatusPlayer, sAnswerLocations, SA_EB_sWords, 
                         SA_EB_sWordStatus, sAnswersSpecialClueLocations, sClueTypes)
{
    g_CAB_aClues   = sClues.split(g_cGeneralDelimiter);
    g_CAB_iClues   = g_CAB_aClues.length;
    g_CAB_aAnswers = sAnswers.split(g_cGeneralDelimiter);
    g_iAnswers = g_CAB_aAnswers.length;
    g_CAB_aAnswersPlayer        = sAnswersPlayer.split(g_cGeneralDelimiter);
    g_CAB_aAnswersPlayerStatus  = sStatusPlayer.split(g_cGeneralDelimiter);
    g_CAB_aAnswerLocations      = sAnswerLocations.split(g_cGeneralDelimiter);
    g_CAB_aAnswerType           = sClueTypes.split(g_cGeneralDelimiter);
    g_CAB_aAnswerSpecialClueType   = sAnswersSpecialClueLocations.split(g_cGeneralDelimiter);
    g_SA_aWords.length = 0;
    g_SA_aWords          = SA_EB_sWords.split(g_cGeneralDelimiter);
    g_SA_sWordStatus     = SA_EB_sWordStatus;
    if ( g_CAB_aClues.length != g_CAB_iClues || g_CAB_aAnswers.length != g_CAB_iClues || g_CAB_aAnswersPlayer.length != g_CAB_iClues || g_CAB_aAnswersPlayerStatus.length != g_CAB_iClues)
        setline('dataProblem.' + g_CAB_iClues + g_CAB_aClues.length + g_CAB_aAnswers.length + g_CAB_aAnswersPlayer.length + g_CAB_aAnswersPlayerStatus.length);
}

function GR_SetupGlobals(iGridWidth, iGridHeight, sGridAnswers, sGridAnswersPlayer, sGridStatusPlayer, sGridNumbering, sGridSpecialClueLocations)
{
    g_GR_sGridSpecialClueLocations = sGridSpecialClueLocations;
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
    TC_GRBMS_GetGridClueNumbering();
}

function SG_Clues_IndexOfAnswer(sAnswer)
{
    for ( let i = 0; i < g_CAB_aAnswers.length; i++)
        if ( g_CAB_aAnswers[i] == sAnswer )
            return i;
    return -1; 
}
