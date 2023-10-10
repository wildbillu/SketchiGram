// TC-SG2-Base.js
//background-color:transparent;

function SG2_RealStart()
{
    let elemBody_Intro = document.getElementById("Body_Real");
    elemBody_Intro.style.backgroundColor = '#EEEEEE'//'lightgray'
    if ( g_Timer_bActive ) TC_ElapsedTime_Setup();
    SG2_SetVisibles(true);
    document.getElementById("Body_Intro").style.visibility = 'hidden';
    document.getElementById("OpeningText").style.visibility = 'hidden';
    document.getElementById("Body_Real").style.visibility = 'visible';
}    

function SG2_SetVisibles(bVisible)
{
    let sVisible = 'hidden';
    if ( bVisible ) sVisible = 'visible'
    ForIdSetVisibility("Div_PuzzleType", sVisible);
    ForIdSetVisibility("Div_PuzzleTitle", sVisible);
    ForIdSetVisibility("Div_Grid", sVisible);
    ForIdSetVisibility("Div_BottomMatter", sVisible);
    ForIdSetVisibility("OneLineDirection_Div", sVisible);
    ForIdSetVisibility("Body_Real", sVisible);
//    if ( g_Message_bVisible )                ForIdSetVisibility("Messages", sVisible);
    if ( g_Timer_bActive )                  ForIdSetVisibility("ElapsedTime_Div", sVisible);
    if ( g_bSettingsActive )                ForIdSetVisibility("Div_StatusControl_Right", sVisible);
    if ( !g_SG2_CAB_bVisible )              ForIdSetVisibility("ThemeImage_Base_Div", sVisible);
    if ( g_SpecialClueAnswerBoxes_bActive ) ForIdSetVisibility("SpecialClue_Div", sVisible);
    if ( g_Archive_bActive)                    ForIdSetVisibility("Archive_Button_Activate", sVisible);
}

function Restart()
{
    TC_ElapsedTime_Clear();
    ForIdSetVisibility("ThemeImage_Solved_Div", false);
    ForIdSetVisibility("MII_Grid_Div", false);
    ForIdSetVisibility("MII_Hint_Div", false);
//
    ForIdSetVisibility("Body_Real", false);
    SG2_SetVisibles(false);
//
    let elemReal = document.getElementById("Body_Real");
    elemReal.style.backgroundColor = 'transparent'
    elemReal.style.height = MakePixelString(0);
    elemReal.style.width  = MakePixelString(0);
    elemReal.innerHTML = '';
    ForIdSetVisibility("Body_Intro", true);
    ForIdSetVisibility("OpeningText", true);
    SG2_LoadAll(0);
    setTimeout(function(){SG2_RealStart();}, 5000);   
}

function SG2_LoadMainElements()
{
    let sMain = '';
    sMain += '<DIV Id="OneLineDirection_Div" class="OneLineDirection_Div TC_StartHidden">Tap/Click Letter To Change then SWIPE RIGHT new letter</DIV>';    
    sMain += '<DIV Id="SpecialClue_Div" class="SpecialClue_Div TC_StartHidden">SpecialClue_Div</DIV>';    
    sMain += TC_Archive_MakeActivationButton();
    sMain += TC_Archive_Consolidated_Make_Div();
    sMain += '<DIV Id="Div_PuzzleType" class="Div_PuzzleType TC_StartHidden">Div_PuzzleType</DIV>';
    sMain += '<DIV Id="Div_StatusControl_Right" class="Div_StatusControl_Right TC_StartHidden">Div_StatusControl_Right</DIV>';
    sMain += '<DIV Id="Div_PuzzleTitle" class="Div_PuzzleTitle TC_StartHidden">Div_PuzzleTitle</DIV>';
    sMain += '<DIV Id="Div_Grid" class="Div_Grid TC_StartHidden">Div_Grid</DIV>';
    sMain += '<DIV Id="Div_BottomMatter" class="Div_BottomMatter TC_StartHidden">Div_BottomMatter</DIV>';
    sMain += '<DIV Id="ElapsedTime_Div" class="ElapsedTime_Div TC_StartHidden"></DIV>';
    sMain += '<DIV Id="ThemeImage_All_GetAspectRatio_Div" style="ThemeImage_Base_Div TC_StartHidden"></DIV>';
    sMain += '<DIV Id="ThemeImage_Base_Div" class="ThemeImage_Base_Div TC_StartHidden">ThemeImage_Base_Div</DIV>';
    sMain += '<DIV Id="ThemeImage_Extra_Div" class="ThemeImage_Extra_Div TC_StartHidden">ThemeImage_Extra_Div</DIV>';
    sMain += '<DIV Id="ThemeImage_Solved_Div" class="ThemeImage_Solved_Div TC_StartHidden">ThemeImage_Solved_Div</DIV>';
    sMain += '<DIV Id="ThemeImage_Popup_Div" class="ThemeImage_Popup_Div TC_StartHidden">ThemeImage_Popup_Div</DIV>';
    sMain += '<DIV Id="TopRowHint" class="TopRowHint TC_StartHidden">' + 'HINT' + '</DIV>';
    sMain += '<DIV Id="SharedDialog_Div" class="SharedDialog_Div TC_StartHidden">' + 'Box' + '</DIV>';
    sMain += '<DIV Id="MII_Grid_Div" class="MII_Grid_Div TC_StartHidden">MII_Grid_Div</DIV>';
    sMain += '<DIV Id="MII_Hint_Div" class="MII_Hint_Div TC_StartHidden">MII_Hint_Div</DIV>';
    sMain += '<DIV Id="CluesAsList_Div" class="CluesAsList_Div TC_StartHidden" onclick="CAL_Hide()">Clues_Div</DIV>';
    sMain += '<DIV onclick="FI_Hide();" Id="FullInstructions_Div" class="FullInstructions_Div TC_StartHidden">FullInstructions</DIV>';
    sMain += MakeSettingsDiv();
    document.getElementById("Body_Real").innerHTML = sMain;
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
    switch (iSection)
    {
        case -1:
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, g_iDelayForStart);    
            break;
        case 0:
            TC_SetActiveSize();
            ForIdSetVisibility("Messages", false);
            g_sToDisplay = '';
            // these reset global variables on reload or archive   
            g_CAB_Square_iSize  = 40;
            g_GRB_Focus_sId = '';
            g_CAB_Focus_sId = '';
            Settings_SetupVersions();
            TC_SquaresPlaced_Initialize();
            TC_Archive_ByDate_Clear();
            TC_Archive_BySize_Clear();
            MII_Grid_CancelTimer();
            MII_Hint_CancelTimer();
            g_TC_Archive_TodaysPuzzle_bDoing = false;
            g_TC_Archive_Menu_bActive = false;
            g_GRB_bAcross = true;
            g_GRB_ActiveId_sAcross = '';
            g_GRB_ActiveId_sDown = '';
            g_bPuzzleSolved = false;
            g_bGridSolved = false;
            g_SG2_CAB_bVisible = false;
            g_bUsedCookie = false;
            g_TC_Status_bFirstCheck = true;
            g_bSuppressGridNumbers = true;
            g_TC_bMoveMade_Hint = false;
            g_TC_bMoveMade_Grid = false;
            TC_History_Clear();
            document.addEventListener('visibilitychange', TC_ActOnVisibilityChange);
            TC_LoadPuzzleArchiveDefault();
            TC_LoadPuzzleArchive_FromFile();
            TC_Archive_SetTodaysPuzzleExist();
            GetAndSplitCookies();
            if ( !g_bResettingDoNotUseCookie )
            {
                FromCookies_GetCurrentPuzzle();
            }
            getResolution(); 
            while ( document.readyState != "complete") {}
            TC_InitializeFromFileOrLoadAsJS();
            TC_AddScreenInfo();
            MakeAndStoreCookie_CurrentPuzzle();
            SG2_LoadMainElements();
            TC_Archive_ByDate_MakeAvailableButtons()
            TC_Archive_ByDate_FillDivWithButtons();
            let iSize = g_TC_Archive_BySize_BaseMenu_iActiveSize;
            if ( iSize == -1 )
            {
                if ( g_TC_Archive_Cookie_iSize != -1 )
                    iSize = g_TC_Archive_Cookie_iSize;
                else
                    iSize = 4;
            }
            TC_Archive_BySize_BaseMenu_SelectFromSize(iSize, true);
            GRB_SetAllowedGridLetters()
            if ( !g_bUsedCookie || g_bResettingDoNotUseCookie )
                GRB_ScrambleCorrectAnswersToPlayer(false);
            g_bResettingDoNotUseCookie = false;
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 1:
            TC_ThemeImage_GetAspectRatio_ForceLoad();
            TC_MakeClassesForSquares();
            TC_MakeControlRow();
            TC_SetTopMatter();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 2:
            GRB_MakeGrid();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 3:
            GRB_SetAllButtons_Inactive();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 4:
            SG2_Adjust_GridPosition();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 150);    
            break;
        case 5:
            FI_Create();
            TC_Preload_MII();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 100);    
            break;
        case 6:
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 150);    
            break;
        case 7:
            // we are going to do the show clues, but not make it visible to get spacing right
            TC_ThemeImage_Base_Create(); // these need to wait for load
            TC_ThemeImage_Extra_Create();
            TC_ThemeImage_Solved_Create();
            TC_ThemeImage_Popup_Create();
            TC_SetBottomMatter();
            TC_Archive_ActivationButtonSetPosition();
            TC_Archive_Consolidated_Position_Div();
// want to be just below  
            if ( g_SpecialClueFrame_bActive ) CAB_MakeSpecialClueAnswerDiv();
            Status_Check();
            if ( g_bSettings_ShowInfoOnStart )  TC_ShowInfo();
            setTimeout(function(){SG2_LoadAll(iSection + 1);}, 200);    
            break;
        case 8:
            while ( document.readyState != "complete") 
            {
            }
            TC_ThemeImage_GetAspectRatio_Calculate();
            MII_Grid_SetLocationAndSize();
            MII_Hint_SetLocationAndSize();
            FI_SizeAndPosition();
//            TC_Archive_BySize_BaseMenu_SelectFromSize(4, true);
            TC_CAL_Fill();
            g_bPlaying = false;
            break;
        default:
            alert('error section:' + iSection)                    
            break;
    }
}


