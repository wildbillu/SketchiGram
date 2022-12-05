// TC-SG-Base.js

function SG_SetVisibles()
{
    TC_SetVisible("Div_PuzzleType");
    TC_SetVisible("Div_PuzzleTitle");
    TC_SetVisible("Div_PuzzleDualClue");
    TC_SetVisible("Div_StatusControl_Right");
    TC_SetVisible("Div_StatusControl_Left");
    TC_SetVisible("StatusControl_CA"); 
    TC_SetVisible("StatusControl_GR"); 
    TC_SetVisible("SG_HowToA_Div");
    TC_SetVisible("Div_Grid");
    TC_SetVisible("Div_Grid_Phantom");
    TC_SetVisible("Div_Grid_Image");
    TC_SetVisible("KB_Mini_Div");
//    TC_SetVisible("SG_Clues_Div"); // let this come up if needed
    TC_SetVisible("SG_ActionMenu_Div");
    TC_SetVisible("Div_BottomMatter");
    TC_SetVisible("Messages");
    TC_SetVisible("ScratchArea");
//    TC_SetVisible("ResultMessage_Div"); // let this come up as needed
//    TC_SetVisible("DifficultyLevel_Div");
//    TC_SetVisible("DisplayDualClue_Div"); // done a different way
}


function SG_HowToText()
{
    let sHowToText = ""
    sHowToText += 'Rearrange the letters to solve the Sketchi-Gram. Click Square and Drag to position new position.';
    sHowToText += '\'Golden\' Squares are pre-set correct.';
    return sHowToText;
}

function SG_LoadMainElements()
{
    var sMain = '';
    sMain += '<DIV Id="Div_PuzzleType" class="Div_PuzzleType StartHidden">Div_PuzzleType</DIV>';
    sMain += '<DIV Id="Div_StatusControl_Left" class="StatusControl_Div_Left StartHidden">Div_StatusControl_Left</DIV>';
    sMain += '<DIV Id="Div_StatusControl_Right" class="StatusControl_Div_Right StartHidden">Div_StatusControl_Right</DIV>';
    sMain += '<DIV Id="Div_PuzzleTitle" class="Div_PuzzleTitle StartHidden">Div_PuzzleTitle</DIV>';
    sMain += '<DIV Id="Div_PuzzleDualClue" class="Div_PuzzleDualClue StartHidden">DualClueGoesHere</DIV>';
    sMain += '<DIV Id="SG_HowToA_Div" class="SG_HowToA_Div StartHidden">' + SG_HowToText() + '</DIV>';
    sMain += '<DIV Id="Div_Grid" class="Div_Grid StartHidden">Div_Grid</DIV>';
    sMain += '<DIV Id="Div_Grid_Phantom" class="Div_Grid_Phantom StartHidden">Div_Grid</DIV>';    
    sMain += '<DIV Id="Div_Grid_Image" class="Div_Grid_Image StartHidden">Div_Grid_Image</DIV>';
    sMain += '<DIV Id="KB_Mini_Div" class="KB_Mini_FullArea StartHidden">notset</DIV>';
    sMain += '<DIV Id="SG_Clues_Div" class="SG_Clues_Div StartHidden"></DIV>';
    sMain += '<DIV Id="Div_BottomMatter" class="Div_BottomMatter StartHidden">Div_BottomMatter</DIV>';
    sMain += '<DIV Id="Messages" class="Div_Message StartHidden"></DIV>';
    sMain += MakeExtraImageDiv();
    sMain += MakeSolvedImageDiv();
    sMain += MakeInfoDiv();
    sMain += MakeSettingsDiv();
    sMain += MakeMoreActionsDiv();    
    sMain += SG_ActionMenu_MakeDiv()
    sMain += '<DIV Id="Test" style="ForTest StartHidden"></DIV>';
    sMain += '<DIV Id="ScratchArea" class="ScratchArea StartHidden"></DIV>';
    sMain += '<DIV Id="ResultMessage_Div" class="ResultMessage_Div StartHidden"></DIV>';
    sMain += '<DIV Id="DifficultyLevel_Div" class="DifficultyLevel_Div StartHidden">DifficultyLevel</DIV>';
    sMain += '<DIV Id="DisplayDualClue_Div" class="DisplayDualClue_Div StartHidden">DisplayDualClue_Div</DIV>';
//
    document.getElementById("Body_Any").innerHTML = sMain;
}

function SG_LoadAll(iSection)
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
            SG_LoadMainElements();
            GRBMS_SetAllowedGridLetters()
            GRBMS_ScrambleCorrectAnswersToPlayer(false);
            SG_SetSizes();
            TC_SetTopMatter();
            setTimeout(function(){SG_LoadAll(iSection + 1);}, 100);    
            break;
        case 1:
            GRBMS_MakeGrid();
            GRBMS_MakeGrid_Phantom();
            SG_LoadGridImage();
            setTimeout(function(){SG_LoadAll(iSection + 1);}, 100);    
            break;
        case 2:
            GRBMS_SetAllButtons();
            GRBMS_SetAllButtons_Phantom();            
            setTimeout(function(){SG_LoadAll(iSection + 1);}, 100);    
            break;
        case 3:
            SG_Adjust_GridAndPhantomGridPosition();
            setTimeout(function(){SG_LoadAll(iSection + 1);}, 100);    
            break;
        case 4:
            SG_AdjustGridImage();
            SG_ActionMenu_SizeAndPosition();
            let elemActionMenu = document.getElementById("SG_ActionMenu_Div");
            let rectActionMenu = elemActionMenu.getBoundingClientRect();
            let iTop = rectActionMenu.bottom + g_TC_Padding_Inter_Vertical_iSize;
            let iLeft = rectActionMenu.left;
            let iWidth  = rectActionMenu.width;
            TC_SA_EB_Setup(iTop, iLeft, 3, iWidth);
            TC_AdjustSettings();
            TC_ResultMessage_Setup(0);
            setTimeout(function(){SG_LoadAll(iSection + 1);}, 1);    
            break;
        case 5:
            var iWidthGrid = g_iGridWidth * g_GRBMS_Square_iSize;
            var iKBRows = KB_Mini_Setup(iWidthGrid);
            SG_Adjust_KBAndIntro(iKBRows);
            setTimeout(function(){SG_LoadAll(iSection + 1);}, 100);    
            break;
        case 6:
            TC_SetBottomMatter();
            TC_DisplayDualClue_Setup(100, 1, 400);
            TC_DifficultyLevel_Setup(100);
            Status_Check(true);
            if ( g_bSettings_ShowInfoOnStart )
                TC_ShowInfo();
            SG_SetVisibles();
            break;
        default:
            alert('error section')                    
            break;
    }
}

