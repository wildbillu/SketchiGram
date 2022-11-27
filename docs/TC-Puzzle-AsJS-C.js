// Surf and Turf
function TC_Puzzle_Load_AsJS()
{
    g_sPuzzleDate     = '2022-09-16';
    g_sPuzzleName     = 'SurfAndTurf';
    g_sPuzzleTitle    = "Dinner Anyone?";
    g_ST_sClue_Itself = 'Rhyming Restaurant Choice';
    g_ST_sClue_Intro = 'SketchiToons Clue to Dual Answers';
    g_sDualClueBefore = '  '; 
    g_sDualClueMiddle = '  and  '; 
    g_sDualClueEnd = '  '; 
    g_sPuzzleCreditAuthor = 'Puzzle By Sketchi Bill, Images By Sketchi Bill'
    g_sPuzzleCreditDate = 'September 25, 2022'
// CA Stuff
    var sClues  = 'A|And|Switch Position|Also|Apt name for a worrier|Unfit to be eaten, not Kosher|Made long for testing this One might have green filling for St. Pat\'s|Craft for ET';
    var sAnswers                    = 'SURF|TURF|OFF|TOO|STU|TREF|OREO|UFO';
    var sAnswersPlayer             = '----|----|---|---|---|----|----|---';
    var sStatusPlayer              = 'NNNN|NNNN|NNN|NNN|NNN|NNNN|NNNN|NNN';
    var sAnswerLocations           ='4 Across|1 Down|3 Down|1 Across|4 Down|5 Across|2 Down|6 Across';
    let SA_EB_sWords          = '|A|||||||||||';
    CA_SetupGlobals(sClues, sAnswers, sAnswersPlayer, sStatusPlayer, sAnswerLocations, SA_EB_sWords);
// GR_Stuff
    var iGridWidth      = 4;
    var iGridHeight     = 4;
    var sGridAnswers                = '.TOOSURFTREFUFO.';
    var sGridAnswersPlayer          = '.T-------------.';
    var sGridStatusPlayer           = '.GNNNNNNNNNNNNN.';
    var sGridNumbering              = '-0123---4---5---';
    GR_SetupGlobals(iGridWidth, iGridHeight, sGridAnswers, sGridAnswersPlayer, sGridStatusPlayer, sGridNumbering)
}
