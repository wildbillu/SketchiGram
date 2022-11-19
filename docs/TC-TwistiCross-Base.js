// TC-TwistiCross-Base.js

function TC_SetVisibles()
{
    setline('SetVisibles')
    TC_SetVisible("Div_PuzzleType");
    TC_SetVisible("Div_PuzzleTitle");
    TC_SetVisible("Div_StatusControl_Right");
    TC_SetVisible("StatusControl_Title");
    TC_SetVisible("StatusControl_CA"); 
    TC_SetVisible("StatusControl_GR"); 
    TC_SetVisible("Div_Grid");
    TC_SetVisible("Div_Grid_Image");    
    TC_SetVisible("KB_Div");
    TC_SetVisible("Div_BottomMatter");
    TC_SetVisible("Messages");
//    TC_SetVisible("ResultMessage_Div"); let it come up as needed
//    TC_SetVisible("SG_HowToA_Div"); doesnt exist
//    TC_SetVisible("ScratchArea"); doesnt exist
//    TC_SetVisible("DifficultyLevel_Div");  doesnt exist
//    TC_SetVisible("DisplayDualClue_Div"); doesnt exist
}

function LoadTwistiCross()
{
    getResolution(); 
    HandleCookiesOnStart();
    var bLoadedFromFile = false;
    bLoadedFromFile = LoadPuzzleFromFile();
    if ( !bLoadedFromFile )
        TC_Puzzle_Load_AsJS();
    MakeItAll();
    TC_SetTopMatter();
    setTimeout(function(){LoadTwistiCross_PartB()}, 50);    
}
function LoadTwistiCross_PartB()
{
    TC_SetSizes();
    var elemDual = document.getElementById("GRBMS_Div_CAB_DualClue");
    elemDual.style.top = MakePixelString(350);
	GRB_MakeGridAsButtons();
	TC_LoadGridImage();
    TC_Adjust_GridAndImagePositions()
    GRBMS_MakeDualClue();
    CAB_ClueAnswerSection_Load();
    TC_CAB_AdjustSingleAnswerRows();
	KB_Set_innerHTML();
	CA_Place_Popup_Setup();
    TC_ResultMessage_Setup(0);
    TC_SetBottomMatter();    
    Status_Check(true);
    TC_SetVisibles();
    TC_AdjustSettings();
    SetInitialSelection();
    if ( g_bSettings_ShowInfoOnStart )
    {
        TC_ShowInfo();
        g_bSettings_ShowInfoOnStart = false;    
        StoreCookie_Settings();
    }
}

function MakeItAll()
{
    var sAllOfIt = '';
    sAllOfIt += '<DIV Id="Div_PuzzleType" class="Div_PuzzleType StartHidden">Div_PuzzleType</DIV>';
    sAllOfIt += '<DIV Id="Div_PuzzleTitle" class="Div_PuzzleTitle StartHidden">Div_PuzzleTitle</DIV>';        
    sAllOfIt += '<DIV Id="Div_StatusControl_Left" class="StatusControl_Div_Left StartHidden">Div_StatusControl_Left</DIV>';
    sAllOfIt += '<DIV Id="Div_StatusControl_Right" class="StatusControl_Div_Right StartHidden">Div_StatusControl_Right</DIV>';
    sAllOfIt += '<DIV Id="Div_Grid" class="Div_Grid StartHidden"></DIV>'
    sAllOfIt += '<DIV Id="Div_Grid_Image" class="Div_Grid_Image StartHidden"></DIV>';
    sAllOfIt += '<DIV Id="GRBMS_Div_CAB_DualClue" class="GRBMS_Div_CAB_DualClue StartHidden">GRBMS_Div_CAB_DualClue</DIV>';
    // now the rows
    var sGG = '';
    for ( iR = 2; iR < g_aClues.length; iR++ )
        sGG += CAB_MakeRowEntry2toN(iR);
    sAllOfIt += '<DIV Id="CA_ROWS_2_N">' + sGG + '</DIV>';
    sAllOfIt += '<DIV Id="KB_Div" class="KB_Div StartHidden">notset</DIV>';
    sAllOfIt += '<DIV Id="Div_BottomMatter" class="Div_BottomMatter StartHidden">BottomMatter</DIV>'
    sAllOfIt += '<DIV Id="Messages" class="Div_Message StartHidden"></DIV>';
    sAllOfIt += MakeExtraImageDiv();
    sAllOfIt += MakeSolvedImageDiv();
    sAllOfIt += MakeInfoDiv();
    sAllOfIt += MakeSettingsDiv();
    sAllOfIt += MakeMoreActionsDiv();  
    if ( g_Place_bDirectPlaceSupport )    
    {
        sAllOfIt += '<Div Id="Div_Place_Direct_Across" class="Div_Place_Direct_Across">Div_Place_Direct_Across</Div>';
        sAllOfIt += '<Div Id="Div_Place_Direct_Down"   class="Div_Place_Direct_Down">  Div_Place_Direct_Down</Div>';    
    }    
    sAllOfIt += '<DIV Id="Place_Popup_Locator" class="Place_Popup"></DIV>';
    sAllOfIt += '<DIV Id="Test" style="ForTest"></DIV>';
    sAllOfIt += '<DIV Id="ResultMessage_Div" class="ResultMessage_Div"></DIV>';
    document.getElementById("Body_Any").innerHTML=sAllOfIt;
    return true;
}

function SetInitialSelection()
{
    var elem = document.getElementById(CAB_MakeId(0,0));
    CAB_onfocus(elem);
}

function TC_SetSizes()
{
    if ( g_iGridWidth == 4 )
    {
        g_GRB_Square_iSize = 60;
        g_GRB_Square_Div_sClass = 'TC_Button_Div_Base TC_Div_60';  
        g_GRB_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_60 TC_Button_Square_Relative';
    }
    else if ( g_iGridWidth == 5 )
    {
        g_GRB_Square_iSize = 50;
        g_GRB_Square_Div_sClass = 'TC_Button_Div_Base TC_Div_50';  
        g_GRB_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_50 TC_Button_Square_Relative';
    }
}
