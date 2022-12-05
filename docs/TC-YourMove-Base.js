// TC-GRBMS-BaseLoading.js

function YM_SetVisibles()
{
    TC_SetVisible("Div_PuzzleType");
    TC_SetVisible("Div_PuzzleTitle");
    TC_SetVisible("Div_StatusControl_Right");
    TC_SetVisible("StatusControl_Title");
    TC_SetVisible("StatusControl_CA"); 
    TC_SetVisible("StatusControl_GR"); 
    TC_SetVisible("Div_Grid");
    TC_SetVisible("Div_Grid_Phantom");
    TC_SetVisible("Div_Grid_Image");
    TC_SetVisible("KB_Mini_Div");
    TC_SetVisible("Div_BottomMatter");
    TC_SetVisible("Messages");
//    TC_SetVisible("ResultMessage_Div"); let it come up as needed
//    TC_SetVisible("SG_HowToA_Div"); doesnt exist
//    TC_SetVisible("ScratchArea"); doesnt exist
//    TC_SetVisible("DifficultyLevel_Div");  doesnt exist
//    TC_SetVisible("DisplayDualClue_Div"); doesnt exist
}

function GRBMS_LoadMainElements()
{
    var sMain = '';
    sMain += '<DIV Id="Div_PuzzleType" class="Div_PuzzleType">Div_PuzzleType</DIV>';
    sMain += '<DIV Id="Div_PuzzleTitle" class="Div_PuzzleTitle">Div_PuzzleTitle</DIV>';
    sMain += '<DIV Id="Div_StatusControl_Left" class="StatusControl_Div_Left">Div_StatusControl_Left</DIV>';
    sMain += '<DIV Id="Div_StatusControl_Right" class="StatusControl_Div_Right">Div_StatusControl_Right</DIV>';
    sMain += '<DIV Id="Div_Grid" class="Div_Grid StartHidden">Div_Grid</DIV>';
    sMain += '<DIV Id="Div_Grid_Phantom" class="Div_Grid_Phantom StartHidden">Div_Grid</DIV>';    
    sMain += '<DIV Id="Div_Grid_Image" class="Div_Grid_Image StartHidden">this is Div_Grid_Image</DIV>';
    sMain += '   <DIV Id="GRBMS_Div_CAB_DualClue" class="GRBMS_Div_CAB_DualClue">GRBMS_Div_CAB_DualClue</DIV>';
    sMain += '   <DIV Id="GRBMS_Div_CAB_Clues_Left" class="GRBMS_Div_CAB_Clues_Left">GRBMS_Div_CAB_Clues_Left</DIV>';
    sMain += '   <DIV Id="GRBMS_Div_CAB_Clues_Right" class="GRBMS_Div_CAB_Clues_Right">GRBMS_Div_CAB_Clues_Right</DIV>';
    sMain += '<DIV id="KB_Mini_Div" class="KB_Mini_FullArea">notset</DIV>';
    sMain += '<DIV Id="Div_BottomMatter" class="Div_BottomMatter">Div_BottomMatter</DIV>';
    sMain += '<DIV Id="Messages" class="Div_Message"></DIV>';
    sMain += MakeExtraImageDiv();
    sMain += MakeSolvedImageDiv();
    sMain += MakeInfoDiv();
    sMain += MakeSettingsDiv();
    sMain += MakeMoreActionsDiv();  
    if ( g_Place_bDirectPlaceSupport )    
    {
        sMain += '<Div Id="Div_Place_Direct_Across" class="Div_Place_Direct_Across">Div_Place_Direct_Across</Div>';
        sMain += '<Div Id="Div_Place_Direct_Down"   class="Div_Place_Direct_Down">  Div_Place_Direct_Down</Div>';    
    }    
    sMain += '<DIV Id="Test" style="ForTest"></DIV>';    
    sMain += '<DIV Id="Place_Popup_Locator" class="Place_Popup"></DIV>'
    sMain += '<DIV Id="ResultMessage_Div" class="ResultMessage_Div"></DIV>';    
//
    document.getElementById("Body_Any").innerHTML = sMain;
}

function GRBMS_LoadAll(iSection)
{
    switch ( iSection)
    {
        case 0:
            getResolution(); 
            HandleCookiesOnStart();
            var bLoadedFromFile = false;
            bLoadedFromFile = LoadPuzzleFromFile();
            if ( !bLoadedFromFile )
                TC_Puzzle_Load_AsJS();
            GRBMS_LoadMainElements();
            GRBMS_SetAllowedGridLetters()
            GRBMS_ScrambleCorrectAnswersToPlayer(false);
            GRBMS_SetSizes();
            TC_SetTopMatter();
            setTimeout(function(){GRBMS_LoadAll(iSection + 1);}, 100);    
            break;
        case 1:
            GRBMS_MakeGrid();
            GRBMS_MakeGrid_Phantom();
            setTimeout(function(){GRBMS_LoadAll(iSection + 1);}, 100);    
            TC_LoadGridImage();
            break;
        case 2:
            GRBMS_SetGridButtonsGridAndPhantomGridPosition();
            GRBMS_SetAllButtons_Phantom();
            setTimeout(function(){GRBMS_LoadAll(iSection + 1);}, 100);    
            break;
        case 3:
            TC_Adjust_GridAndImagePositions();
            setTimeout(function(){GRBMS_LoadAll(iSection + 1);}, 100);    
            break;
        case 4:
            CA_Place_Popup_Setup();
            setTimeout(function(){GRBMS_LoadAll(iSection + 1);}, 1);    
            break;
        case 5:
            GRBMS_LoadClueAnswer();
            setTimeout(function(){GRBMS_LoadAll(iSection + 1);}, 100);    
            break;
        case 6:
            KB_Mini_Setup(0.75*g_TC_iBiggestRight);
            TC_ResultMessage_Setup(0);
            YM_KB_Locate();
            TC_SetBottomMatter();
            Status_Check(true);
            TC_AdjustSettings();            
            YM_SetVisibles();
            if ( g_bSettings_ShowInfoOnStart )
                TC_ShowInfo();

            break;
        default:
            alert('error section')                    
            break;
    }
}

function YM_KB_Locate()
{
// for now we assume half width    
    var iWidth = 0.75 * g_TC_iBiggestRight; 
    var iLeft = (g_TC_iBiggestRight - iWidth)/2
  //
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    var elemGRBMS_KB = document.getElementById('KB_Mini_Div');
    elemGRBMS_KB.style.top = MakePixelString(g_TC_iBiggestBottom);
    elemGRBMS_KB.style.width = MakePixelString(iWidth);
    elemGRBMS_KB.style.left = MakePixelString(iLeft);

    var elemButtonDiv = document.getElementById("KB_Mini_ButtonRow_Div");
    elemButtonDiv.style.width = MakePixelString(iWidth);
    var elemInstructionsDiv = document.getElementById("KB_Mini_Instructions_Div");
    elemInstructionsDiv.style.width = MakePixelString(iWidth);

    var rectGRBMS_KB = elemGRBMS_KB.getBoundingClientRect();
    g_TC_iBiggestBottom += rectGRBMS_KB.height;
// !!!    elemGRBMS_KB.style.visibility = 'visible'
}

