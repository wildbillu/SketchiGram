// Evil Twin
function TC_Puzzle_Load_AsJS()
{
    g_sPuzzleDate     = '2022-10-21';
    g_sPuzzleName     = 'EvilTwin';
    g_sPuzzleTitle    = "A Dr. Jekyll and Mr. Hyde Moment?";
    g_ST_sClue_Itself = 'Doppelg&#228;nger of the worst type?';
    g_ST_sClue_Intro = 'SketchiToons Clue to Dual Answers';
    g_sDualClueBefore = '  '; 
    g_sDualClueMiddle = '  '; 
    g_sDualClueEnd = '  '; 
    g_sPuzzleCreditAuthor = 'Puzzle By Sketchi Bill, Images By Sketchi Bill'
    g_sPuzzleCreditDate = 'October 21, 2022'
    g_PuzzlePath_sName_Image          = 'puzzles/puzzle006/puzzle006.jpg';
    g_PuzzlePath_sName_Image_Extra    = 'puzzles/puzzle006/puzzle006-extra.jpg';
    g_PuzzlePath_sName_Image_Solved   = 'puzzles/puzzle006/puzzle006-solved.jpg';
// CA Stuff
    var sClues  = 'DummyA|DummyB|Cover with tar|Chooses|Hawaiian goose|Red tag ____|Guitar Pedal (var.)|Actor Wilson';
    var sAnswers                    = 'EVIL|TWIN|PAVE|OPTS|NENE|SALE|WAWA|OWEN';
    var sAnswersPlayer             =  '----|----|----|----|----|----|----|----';
    var sStatusPlayer              =  'NNNN|NNNN|NNNN|NNNN|NNNN|NNNN|NNNN|NNNN';
    var sAnswerLocations           ='6 Across|3 Down|2 Down|1 Across|7 Across|4 Down|5 Across|1 Down';
    var SA_EB_sWords          = '||||||||||||';
    var SA_EB_sWordStatus     = 'FFFFFFFFFFFF';
    CA_SetupGlobals(sClues, sAnswers, sAnswersPlayer, sStatusPlayer, sAnswerLocations, SA_EB_sWords, SA_EB_sWordStatus);
// GR_Stuff
    var iGridWidth      = 4;
    var iGridHeight     = 4;
    var sGridAnswers                = 'OPTSWAWAEVILNENE';
    var sGridAnswersPlayer          = 'O-------------N-';
    var sGridStatusPlayer           = 'GNNNNNNNNNNNNNGN';
    var sGridNumbering                = '1|2|3|4|5|0|0|0|6|0|0|0|7|0|0|0';
    GR_SetupGlobals(iGridWidth, iGridHeight, sGridAnswers, sGridAnswersPlayer, sGridStatusPlayer, sGridNumbering)
}
