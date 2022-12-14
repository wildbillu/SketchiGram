// Evil Twin
function TC_Puzzle_Load_AsJS()
{
    g_sPuzzleDate     = '2022-10-21';
    g_sPuzzleName     = 'EvilTwin';
    g_sPuzzleTitle    = "A Dr. Jekyll and Mr. Hyde Moment?";
    g_ST_sClue_Itself = 'Doppelgänger of the worst type?';
    g_ST_sClue_Intro = 'SketchiToons Clue to Dual Answers';
    g_sDualClueBefore = '  '; 
    g_sDualClueMiddle = '  '; 
    g_sDualClueEnd = '  '; 
    g_sPuzzleCreditAuthor = 'Puzzle By Sketchi Bill, Images By Sketchi Bill'
    g_sPuzzleCreditDate = 'October 21, 2022'
// CA Stuff
    var sClues  = 'DummyA|DummyB|Cover with tar|Chooses|Hawaiian goose|Red tag ____|Guitar Pedal (var.)|Actor Wilson';
    var sAnswers                    = 'EVIL|TWIN|PAVE|OPTS|NENE|SALE|WAWA|OWEN';
    var sAnswersPlayer             =  '----|----|----|----|----|----|----|----';
    var sStatusPlayer              =  'NNNN|NNNN|NNNN|NNNN|NNNN|NNNN|NNNN|NNNN';
    var sAnswerLocations           ='6 Across|3 Down|2 Down|1 Across|7 Across|4 Down|5 Across|1 Down';
    let SA_EB_sWords          = '|A|||||||||||';
    CA_SetupGlobals(sClues, sAnswers, sAnswersPlayer, sStatusPlayer, sAnswerLocations, SA_EB_sWords);
// GR_Stuff
    var iGridWidth      = 4;
    var iGridHeight     = 4;
    var sGridAnswers                = 'OPTSWAWAEVILNENE';
    var sGridAnswersPlayer          = '---W------------';
    var sGridStatusPlayer           = 'NNNNGNNNNNNNNNNN';
    var sGridNumbering              = '01234...5...6...';
    GR_SetupGlobals(iGridWidth, iGridHeight, sGridAnswers, sGridAnswersPlayer, sGridStatusPlayer, sGridNumbering)
}
