// TC-SG2-Base.js

function SG_HowToText()
{
    let sHowToText = ""
    sHowToText += 'Rearrange letters to solve the SketchiGram. Click Square (highlight magenta) and replace letter using keypad.';
    sHowToText += 'Or drag selected square to new location.';
    sHowToText += 'Pre-set \'Golden\' Squares and green letters are correct.';
    return sHowToText;
}

function SG2_LoadMainElements()
{
    var sMain = '';
    sMain += '<DIV Id="GRBMS_Div_CAB_DualClue" class="GRBMS_Div_CAB_DualClue StartHidden">GRBMS_Div_CAB_DualClue</DIV>';    

    sMain += TC_Archive_MakeMenu();
    sMain += '<DIV Id="Div_PuzzleType" class="Div_PuzzleType StartHidden">Div_PuzzleType</DIV>';
    sMain += '<DIV Id="Div_StatusControl_Left" class="StatusControl_Div_Left StartHidden">Div_StatusControl_Left</DIV>';
    sMain += '<DIV Id="Div_StatusControl_Right" class="StatusControl_Div_Right StartHidden">Div_StatusControl_Right</DIV>';
    sMain += '<DIV Id="Div_PuzzleTitle" class="Div_PuzzleTitle StartHidden">Div_PuzzleTitle</DIV>';
    sMain += '<DIV Id="SG_HowToA_Div" class="SG_HowToA_Div StartHidden">' + SG_HowToText() + '</DIV>';
    sMain += '<DIV Id="Div_Grid" class="Div_Grid StartHidden">Div_Grid</DIV>';
    sMain += '<DIV Id="Div_Grid_Phantom" class="Div_Grid_Phantom StartHidden">Div_Phantom_Grid</DIV>';
    sMain += '<DIV Id="Div_Grid_Image" class="Div_Grid_Image StartHidden">Div_Grid_Image</DIV>';
    sMain += '<DIV Id="KB_Mini_Div" class="KB_Mini_Div StartHidden">notset</DIV>';
    sMain += '<DIV Id="SG_Clues_Div" class="SG_Clues_Div StartHidden"></DIV>';
    sMain += '<DIV Id="Div_BottomMatter" class="Div_BottomMatter StartHidden">Div_BottomMatter</DIV>';
    sMain += MakeExtraImageDiv();
    sMain += MakeSolvedImageDiv();
    sMain += MakeInfoDiv();
    sMain += MakeSettingsDiv();
    sMain += MakeMoreActionsDiv();    
    if ( g_bActionMenuActive ) sMain += SG_ActionMenu_MakeDiv()
    sMain += '<DIV Id="Test" style="ForTest StartHidden"></DIV>';
    sMain += '<DIV Id="ScratchArea" class="ScratchArea StartHidden">SSSSSSWSSS</DIV>';
    sMain += '<DIV Id="ResultMessage_Div" class="ResultMessage_Div StartHidden"></DIV>';
    sMain += '<DIV Id="ElapsedTime_Div" class="ElapsedTime_Div StartHidden"></DIV>';
    sMain += '<DIV Id="DifficultyLevel_Div" class="DifficultyLevel_Div StartHidden">DifficultyLevel</DIV>';
    sMain += '<DIV Id="DisplayDualClue_Div" class="DisplayDualClue_Div StartHidden" onclick="TC_DisplayDualClue()">DisplayDualClue_Div</DIV>';
//sMain += TC_Button_V2_InDiv('AAAA', false, 'TC_Text();', 'New');
    document.getElementById("Body_Any").innerHTML = sMain;
}
function TC_Text()
{
    alert('TC')
    SG_PositionClues()
}

function TC_ActOnVisibilityChange(e)
{
    if (document.hidden) 
    { // need to stop the clock
        TC_ElapsedTime_Pause();
        return;
    }
    TC_ElapsedTime_Resume();
}

function SG2_LoadAll(iSection)
{
    switch ( iSection)
    {
        case 0:
            document.addEventListener('visibilitychange', TC_ActOnVisibilityChange);
            g_SG2_CAB_bVisible = false;
            g_bUsedCookie = false;
            g_TC_Status_bFirstCheck = true;
            g_TC_iBiggestRight  = 450;
            GetAndSplitCookies();
            FromCookies_GetCurrentPuzzle();
            getResolution(); 
            while ( document.readyState != "complete") {}
            TC_InitializeFromFileOrLoadAsJS();
            MakeAndStoreCookie_CurrentPuzzle();
            SG2_LoadMainElements();
            GRBMS_SetAllowedGridLetters()
            GRBMS_ScrambleCorrectAnswersToPlayer(false);
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 1:
            let iMaxGridWidth = 0.85 * g_TC_iBiggestRight;
            SG2_SetSizes(iMaxGridWidth);
            TC_SetTopMatter();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 2:
            GRBMS_MakeGrid();
            GRBMS_MakeGrid_Phantom();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 3:
            GRBMS_SetAllButtons();
            GRBMS_SetAllButtons_Phantom();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 4:
            SG2_Adjust_GridAndPhantomGridPosition(g_GR_GridOrInstruction_iTop);
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 150);    
            break;
        case 5:
            SG2_ThemeImage_Create();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 6:
            KB_SetupAndAdjust();
            if ( !g_bPuzzleSolved ) TC_SetVisible("KB_Mini_Div");
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 150);    
            break;
        case 7:
            // we are going to do the show clues, but not make it visible to get spacing right
            let bShowLength = true;
            let bShowGridLocation = false;
            let bShowPlaceButtons = false;
            SG_ShowClues(bShowLength, bShowGridLocation, bShowPlaceButtons);
            TC_SetBottomMatter();
            TC_Archive_AdjustMenu();
            SG2_ThemeImage_NormalSize_Setup();
            SG2_ThemeImage_NormalSize_SetTo();
            SG2_ThemeImage_EnlargedSize_Setup();
// want to be just below             
            let iDisplayDualClueTop = 50;
            let elemStatusControlRight = document.getElementById("Div_StatusControl_Right");
            let rectStatusControlRight =  GetBoundingClientRectAbsolute(elemStatusControlRight);            
            TC_DisplayDualClue_Setup(iDisplayDualClueTop, g_TC_Padding_Left_iSize, rectStatusControlRight.left - 4 * g_TC_Padding_Left_iSize);
            if ( g_bActionMenuActive ) SG_ActionMenu_SizeAndPosition();
// scratch area 
            let iResultMessageTop = 75;
            TC_ResultMessage_Setup(iResultMessageTop);
            Status_Check(true);
            TC_AdjustSettings();
            if ( g_bSettings_ShowInfoOnStart )
                TC_ShowInfo();
            if ( g_bDifficultyLevelActive )
            {
                let iDifficultyLevelTop = 300;
                TC_DifficultyLevel_Setup(iDifficultyLevelTop);
            }
            TC_SA_EB_Setup();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 8:
            while ( document.readyState != "complete") 
            {
            }
//uninitialized - Has not started loading yet
//loading - Is loading
//loaded - Has been loaded
//interactive - Has loaded enough and the user can interact with it
//complete - Fully loaded
            SG_Clues_ShowCorrect();
            if ( g_bDifficultyLevelActive )
            {
                if ( g_Cookie_DifficultyLevel_iLevel > -1 )
                    TC_DifficultyLevel_ChangedWork(g_Cookie_DifficultyLevel_iLevel, true);
                g_Cookie_DifficultyLevel_iLevel = -1;
            }
            if ( g_bTimerActive ) TC_ElapsedTime_Setup(460, 75);
            if ( g_bDualClueFrameActive ) GRBMS_MakeDualClue();
            SG2_SetVisibles();
            if ( g_bPrintedFormat ) AdjustForPrintSize();
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
    TC_SetVisible("Div_PuzzleType");
    TC_SetVisible("Div_PuzzleTitle");
    TC_SetVisible("Div_Grid");
    TC_SetVisible("Div_Grid_Phantom");
    if ( g_bHowToActive ) TC_SetVisible("SG_HowToA_Div");
    if ( !g_bPuzzleSolved ) TC_SetVisible("KB_Mini_Div");
    TC_SetVisible("Div_BottomMatter");
    if ( g_bMessageVisible ) TC_SetVisible("Messages");
    if ( g_bActionMenuActive ) SG_ActionMenu_SetVisible();
    if ( g_bDifficultyLevelActive) TC_SetVisible("DifficultyLevel_Div");
    if ( g_bShowDualClueActive ) TC_SetVisible("DisplayDualClue_Div");
    if ( g_bTimerActive )TC_SetVisible("ElapsedTime_Div");
    if ( g_bSettingsActive ) TC_SetVisible("Div_StatusControl_Right");
    if ( !g_SG2_CAB_bVisible ) TC_SetVisible("Div_Grid_Image");
    if ( g_bDualClueAnswerBoxesActive ) TC_SetVisible("GRBMS_Div_CAB_DualClue");
    if ( g_bArchiveShow) TC_SetVisible("Archive_Button_Activate");
}
