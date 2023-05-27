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
    let sMain = '';
    sMain += '<DIV Id="SpecialClue_Div" class="SpecialClue_Div TC_StartHidden">SpecialClue_Div</DIV>';    
    sMain += TC_Archive_MakeMenu();
    sMain += '<DIV Id="Div_PuzzleType" class="Div_PuzzleType TC_StartHidden">Div_PuzzleType</DIV>';
    sMain += '<DIV Id="Div_StatusControl_Left" class="StatusControl_Div_Left TC_StartHidden">Div_StatusControl_Left</DIV>';
    sMain += '<DIV Id="Div_StatusControl_Right" class="StatusControl_Div_Right TC_StartHidden">Div_StatusControl_Right</DIV>';
    sMain += '<DIV Id="Div_PuzzleTitle" class="Div_PuzzleTitle TC_StartHidden">Div_PuzzleTitle</DIV>';
    sMain += '<DIV Id="SG_HowToA_Div" class="SG_HowToA_Div TC_StartHidden">' + SG_HowToText() + '</DIV>';
    sMain += '<DIV Id="Div_Grid" class="Div_Grid TC_StartHidden">Div_Grid</DIV>';
    sMain += '<DIV Id="KB_Mini_Div" class="KB_Mini_Div TC_StartHidden">notset</DIV>';
    sMain += '<DIV Id="SG_Clues_Div" class="SG_Clues_Div TC_StartHidden"></DIV>';
    sMain += '<DIV Id="Div_BottomMatter" class="Div_BottomMatter TC_StartHidden">Div_BottomMatter</DIV>';
    if ( g_InfoSettingsButtons_bActive ){sMain += MakeInfoDiv(); sMain += MakeSettingsDiv(); }
    if ( g_DM_bActive ) sMain += DM_MakeDiv();
    if ( g_MAM_bActive ) sMain += TC_MAM_MakeDiv();
    sMain += '<DIV Id="Test" style="ForTestTC_StartHidden"></DIV>';
    sMain += '<DIV Id="ScratchArea" class="ScratchArea TC_StartHidden">SSSSSSWSSS</DIV>';
    sMain += '<DIV Id="ResultMessage_Div" class="ResultMessage_Div TC_StartHidden"></DIV>';
    sMain += '<DIV Id="ElapsedTime_Div" class="ElapsedTime_Div TC_StartHidden"></DIV>';
    sMain += '<DIV Id="DifficultyLevel_Div" class="DifficultyLevel_Div TC_StartHidden">DifficultyLevel</DIV>';
    sMain += '<DIV Id="ThemeImage_All_GetAspectRatio_Div" style="ThemeImage_Base_Div TC_StartHidden"></DIV>';
    sMain += '<DIV Id="ThemeImage_Base_Div" class="ThemeImage_Base_Div TC_StartHidden">ThemeImage_Base_Div</DIV>';
    sMain += '<DIV Id="ThemeImage_Extra_Div" class="ThemeImage_Extra_Div TC_StartHidden">ThemeImage_Extra_Div</DIV>';
    sMain += '<DIV Id="ThemeImage_Solved_Div" class="ThemeImage_Solved_Div TC_StartHidden">ThemeImage_Solved_Div</DIV>';
    sMain += '<DIV Id="ThemeImage_Popup_Div" class="ThemeImage_Popup_Div TC_StartHidden">ThemeImage_Popup_Div</DIV>';
    sMain += '<DIV Id="SharedDialog_Div" class="SharedDialog_Div TC_StartHidden">' + 'Box' + '<DIV>';
    document.getElementById("Body_Any").innerHTML = sMain;
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
// these reset global variables on reload or archive    
            TC_SquaresPlaced_Initialize();
            g_GRBMS_bAcross = true;
            g_GRBMS_ActiveId_sAcross = '';
            g_GRBMS_ActiveId_sDown = '';
            g_bPuzzleSolved = false;
            g_bGridSolved = false;
            g_AdjustForInitialDifficultyLevel_bActive = false;
            g_SG2_CAB_bVisible = false;
            g_bUsedCookie = false;
            g_TC_Status_bFirstCheck = true;
            DM_AdjustSettingsForDifficultyLevel_ExpertValuesOnly();
            TC_History_Clear();
// want to start things invisible
            document.addEventListener('visibilitychange', TC_ActOnVisibilityChange);
            TC_LoadPuzzleArchive_FromFile();
            GetAndSplitCookies();
            FromCookies_GetCurrentPuzzle();
            getResolution(); 
            while ( document.readyState != "complete") {}
            TC_InitializeFromFileOrLoadAsJS();
            MakeAndStoreCookie_CurrentPuzzle();
            SG2_LoadMainElements();
            GRBMS_SetAllowedGridLetters()
            if ( !g_bUsedCookie )
                GRBMS_ScrambleCorrectAnswersToPlayer(false);
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 1:
            TC_ThemeImage_GetAspectRatio_ForceLoad();
            TC_MakeClassesForSquares();
            TC_SetTopMatter();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 2:
            GRBMS_MakeGrid();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 3:
            GRBMS_SetAllButtons();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 4:
            SG2_Adjust_GridPosition(g_GR_GridOrInstruction_iTop);
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 150);    
            break;
        case 5:
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 6:
            KB_AllGridChars_Setup();
            KB_AllGridChars_Adjust(true);
            KB_SetUsageMode(g_KB_Mini_sUsageMode_Idle);
            if ( !g_bPuzzleSolved ) TC_SetVisible("KB_Mini_Div");
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 150);    
            break;
        case 7:
            // we are going to do the show clues, but not make it visible to get spacing right
            AnswersCorrectInGridInitialize();
            SG_SetupClueAnswers();
            TC_ThemeImage_Base_Create(); // these need to wait for load
            TC_ThemeImage_Extra_Create();
            TC_ThemeImage_Solved_Create();
            TC_ThemeImage_Popup_Create();
            TC_SetBottomMatter();
            TC_Archive_AdjustMenu();
// want to be just below             
            TC_ResultMessage_Setup();
            Status_Check(true);
            if ( g_InfoSettingsButtons_bActive ) TC_AdjustSettings();
            if ( g_bSettings_ShowInfoOnStart )
                TC_ShowInfo();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 200);    
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
            TC_ThemeImage_GetAspectRatio_Calculate();
            SG_UpdateAnswersCorrectInGridAndDisplay();
            if ( g_Timer_bActive ) TC_ElapsedTime_Setup();
            if ( g_SpecialClueFrame_bActive ) CAB_MakeSpecialClueAnswerDiv();
            if ( g_DM_bActive) DM_SetPosition();
            if ( g_MAM_bActive) MAM_SetPosition();
            if ( g_SA_bActive ) TC_SA_Setup();
            if ( g_ThemeImage_Base_bActive && !g_bPuzzleSolved )
            {
                TC_ThemeImage_Base_SizeAndPosition();
                TC_ThemeImage_Base_SetVisibility(true);
            }
            SG2_SetVisibles();
            ForIdSetVisibility("SG_Clues_Div", false);
            if ( g_bPrintedFormat ) 
            {
                 AdjustForPrintSize();
                 if ( g_bSolveOnStart ) 
                 {
                    Action_SolvePuzzle();
                    TC_ThemeImage_Solved_PositionVisibility_PrintAndSolve(true);
                }
                else    
                { 
                    TC_ThemeImage_Extra_PositionVisibility_Print(true);
                }
                ForIdSetVisibility("ThemeImage_Base_Div", false);                
            }
            SG_MakeSpecialCluesAnswerStrings()
            AdjustForInitialDifficultyLevel()
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
    if ( g_HowTo_bActive ) TC_SetVisible("SG_HowToA_Div");
    if ( !g_bPuzzleSolved ) TC_SetVisible("KB_Mini_Div");
    TC_SetVisible("Div_BottomMatter");
    if ( g_bMessageVisible ) TC_SetVisible("Messages");
    if ( g_Timer_bActive )TC_SetVisible("ElapsedTime_Div");
    if ( g_bSettingsActive ) TC_SetVisible("Div_StatusControl_Right");
    if ( !g_SG2_CAB_bVisible ) TC_SetVisible("ThemeImage_Base_Div");
    if ( g_bSpecialClueAnswerBoxesActive ) TC_SetVisible("SpecialClue_Div");
    if ( g_bArchiveShow) TC_SetVisible("Archive_Button_Activate");
    if ( g_DM_bActive ) TC_SetVisible("DM_Div");
    if ( g_MAM_bActive ) TC_SetVisible("MAM_Div");
}

