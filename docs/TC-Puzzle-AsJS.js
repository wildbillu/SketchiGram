// Evil Twin
function TC_Puzzle_Load_AsJS()
{
    g_ST_sClue_Itself = 'Doppelg&#228;nger of the worst type?';
    g_sSpecialClueBefore = ''; 
    g_sSpecialClueMiddle = '    '; 
    g_sSpecialClueEnd = ''; 
    g_PuzzlePath_sName_Image          = 'puzzles/puzzle006/puzzle006.jpg';
    g_PuzzlePath_sName_Image_Extra    = 'puzzles/puzzle006/puzzle006-extra.jpg';
    g_PuzzlePath_sName_Image_Solved   = 'puzzles/puzzle006/puzzle006-solved.jpg';
// CA Stuff
    var sClueTypes                    = 'S|S|N|N|N|N|N|N'; 
    var sAnswers                      = 'EVIL|TWIN|PAVE|OPTS|NENE|SALE|WAWA|OWEN';
    var sAnswersPlayer                = '----|T---|----|----|----|----|----|----';
    var sStatusPlayer                 = 'NNNN|GNNN|NNNN|NNNN|NNNN|NNNN|NNNN|NNNN';
    var sAnswersSpecialClueLocations  = 'SSDS|SSDS|NNNN|NNNN|NNNN|NNNN|NNNN|NNNN';
    var sDummy = 'A'
    var sClues                        = 'Especially not good|Doppelg&#228;nger|Cover with tar|Chooses|Hawaiian goose|Red tag ____|Guitar Pedal (var.)|Actor Wilson';
    var sAnswerLocations              = '6 Across|3 Down|2 Down|1 Across|7 Across|4 Down|5 Across|1 Down';
    CA_SetupGlobals(sClues, sAnswers, sAnswersPlayer, sStatusPlayer, sAnswerLocations, sAnswersSpecialClueLocations, sClueTypes);
// GR_Stuff
    var iGridWidth      = 4;
    var iGridHeight     = 4;
    var sGridSpecialClueLocations   = 'NNSNNNSNSSDSNNSN';
    var sGridAnswers                = 'OPTSWAWAEVILNENE';
    var sGridAnswersPlayer          = '--T-WA----------';
    var sGridStatusPlayer           = 'NNGNGGNNNNNNNNNN';
    var sGridNumbering              = '1|2|3|4|5|0|0|0|6|0|0|0|7|0|0|0';
    GR_SetupGlobals(iGridWidth, iGridHeight, sGridAnswers, sGridAnswersPlayer, sGridStatusPlayer, sGridNumbering, sGridSpecialClueLocations)
    g_CAB_Square_iSize = 40;
}
