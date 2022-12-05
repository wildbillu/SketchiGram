// TC-SG2-Base.js

function SG_HowToText()
{
    let sHowToText = ""
    sHowToText += 'Rearrange the letters to solve the Sketchi-Gram. Click Square (highlight magenta) and Drag to new position (highlight blue).';
    sHowToText += 'Correct squares will show green letters, and cannot be moved.';
    sHowToText += '\'Golden\' Squares are pre-set (correct.)';
    return sHowToText;
}

function SG2_LoadMainElements()
{
    var sMain = '';
    sMain += TC_Archive_MakeMenu();
    sMain += '<DIV Id="Div_PuzzleType" class="Div_PuzzleType StartHidden">Div_PuzzleType</DIV>';
    sMain += '<DIV Id="Div_StatusControl_Left" class="StatusControl_Div_Left StartHidden">Div_StatusControl_Left</DIV>';
    sMain += '<DIV Id="Div_StatusControl_Right" class="StatusControl_Div_Right StartHidden">Div_StatusControl_Right</DIV>';
    sMain += '<DIV Id="Div_PuzzleTitle" class="Div_PuzzleTitle StartHidden">Div_PuzzleTitle</DIV>';
    sMain += '<DIV Id="SG_HowToA_Div" class="SG_HowToA_Div StartHidden">' + SG_HowToText() + '</DIV>';
    sMain += '<DIV Id="Div_Grid" class="Div_Grid StartHidden">Div_Grid</DIV>';
    sMain += '<DIV Id="Div_Grid_Phantom" class="Div_Grid_Phantom StartHidden">Div_Phantom_Grid</DIV>';
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
    sMain += '<DIV Id="ElapsedTime_Div" class="ElapsedTime_Div StartHidden"></DIV>';
    sMain += '<DIV Id="DifficultyLevel_Div" class="DifficultyLevel_Div StartHidden">DifficultyLevel</DIV>';
    sMain += '<DIV Id="DisplayDualClue_Div" class="DisplayDualClue_Div StartHidden" onclick="TC_DisplayDualClue()">DisplayDualClue_Div</DIV>';
    document.getElementById("Body_Any").innerHTML = sMain;
}

function SG2_LoadAll(iSection)
{
    switch ( iSection)
    {
        case 0:
            getResolution(); 
            while ( document.readyState != "complete") {}
            HandleCookiesOnStart();
            TC_InitializeFromFileOrLoadAsJS();
            SG2_LoadMainElements();
            GRBMS_SetAllowedGridLetters()
            GRBMS_ScrambleCorrectAnswersToPlayer(false);
            let iMaxGridWidth = 0.85 * g_TC_iBiggestRight;
            SG2_SetSizes(iMaxGridWidth);
            TC_SetTopMatter();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 1:
            GRBMS_MakeGrid();
            GRBMS_MakeGrid_Phantom();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 500);    
            break;
        case 2:
            GRBMS_SetAllButtons();
            GRBMS_SetAllButtons_Phantom();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 3:
            let iGap = 0;
            SG2_Adjust_GridAndPhantomGridPosition(iGap);
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 4:
            SG_ActionMenu_SizeAndPosition();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 1);    
            break;
        case 5:
            let iWidthGrid = g_iGridWidth * g_GRBMS_Square_iSize;
            var iKBRows = KB_Mini_Setup(iWidthGrid);
            SG2_Adjust_KBAndIntro(iKBRows);
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 6:
                // we are going to do the show clues, but not make it visible to get spacing right
            let bShowLength = true;
            let bShowGridLocation = false;
            let bShowPlaceButtons = false;
            SG_ShowClues(bShowLength, bShowGridLocation, bShowPlaceButtons);
            TC_SetBottomMatter();
            TC_Archive_AdjustMenu();
// want to be just below             
            let iDisplayDualClueTop = 50;
            let elemStatusControlRight = document.getElementById("Div_StatusControl_Right");
            var rectStatusControlRight =  elemStatusControlRight.getBoundingClientRect();            
            TC_DisplayDualClue_Setup(iDisplayDualClueTop, g_TC_Padding_Left_iSize, rectStatusControlRight.left - 4 * g_TC_Padding_Left_iSize);
            let iDifficultyLevelTop = 310;
            TC_DifficultyLevel_Setup(iDifficultyLevelTop);            
// scratch area 
            TC_SA_EB_Setup();
            let iResultMessageTop = 85;
            TC_ResultMessage_Setup(iResultMessageTop);
            Status_Check(true);
            TC_AdjustSettings();
            if ( g_bSettings_ShowInfoOnStart )
                TC_ShowInfo();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 7:
            while ( document.readyState != "complete") 
            {
            }
//uninitialized - Has not started loading yet
//loading - Is loading
//loaded - Has been loaded
//interactive - Has loaded enough and the user can interact with it
//complete - Fully loaded
            SG_Clues_ShowCorrect();
            if ( g_Cookie_DifficultyLevel_iLevel > -1 )
                TC_DifficultyLevel_ChangedWork(g_Cookie_DifficultyLevel_iLevel, true);
            g_Cookie_DifficultyLevel_iLevel = -1;
            TC_ElapsedTime_Setup(460, 75);
            SG2_SetVisibles();
//            openFullscreen();
            break;
        default:
            alert('error section:' + iSection)                    
            break;
    }
}

function SG2_SetVisibles()
{
    let elemBody_Any = document.getElementById("Body_Any");
    elemBody_Any.className = 'Body_Any_AfterLoad'
    elemBody_Any.style.backgroundColor = 'white'
//    elemBody_Any.style.visibility = 'hidden';
//elemBody_Any.style.backgroundImage = 'url("images/InfoScreens/BlankBlueArea_SG2.jpg")'

    TC_SetVisible("Div_PuzzleType");
    TC_SetVisible("Div_PuzzleTitle");
    TC_SetVisible("Div_StatusControl_Right");
    TC_SetVisible("SG_HowToA_Div");
    TC_SetVisible("Div_Grid");
    TC_SetVisible("Div_Grid_Phantom");
    TC_SetVisible("KB_Mini_Div");
    TC_SetVisible("Div_BottomMatter");
    TC_SetVisible("Messages");
//    TC_SetVisible("ScratchArea");
//    TC_SetVisible("SG_AM_SmartMove");
//    TC_SetVisible("SG_ActionMenu_Div");
//    TC_SetVisible("MoreActions_Div");
//    TC_SetVisible("ResultMessage_Div");
    TC_SetVisible("DifficultyLevel_Div");
    TC_SetVisible("DisplayDualClue_Div");
    TC_SetVisible("ElapsedTime_Div");


}

