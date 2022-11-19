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
    sMain += '<DIV Id="Div_PuzzleType" class="Div_PuzzleType StartHidden">Div_PuzzleType</DIV>';
    sMain += '<DIV Id="Div_StatusControl_Left" class="StatusControl_Div_Left StartHidden">Div_StatusControl_Left</DIV>';
    sMain += '<DIV Id="Div_StatusControl_Right" class="StatusControl_Div_Right StartHidden">Div_StatusControl_Right</DIV>';
    sMain += '<DIV Id="Div_PuzzleTitle" class="Div_PuzzleTitle StartHidden">Div_PuzzleTitle</DIV>';
    sMain += '<DIV Id="Div_PuzzleDualClue" class="Div_PuzzleDualClue StartHidden">DualClueGoesHere</DIV>';
    sMain += '<DIV Id="SG_HowToA_Div" class="SG_HowToA_Div StartHidden">' + SG_HowToText() + '</DIV>';
    sMain += '<DIV Id="Div_Grid" class="Div_Grid StartHidden">Div_Grid</DIV>';
    sMain += '<DIV Id="Div_Grid_Phantom" class="Div_Grid_Phantom StartHidden">Div_Phantom_Grid</DIV>';
    sMain += '<DIV Id="Div_Grid_Image" class="Div_Grid_Image StartHidden">Div_Grid_Image</DIV>';
    sMain += '<DIV Id="KB_Mini_Div" class="KB_Mini_FullArea StartHidden">notset</DIV>';
    sMain += '<DIV Id="SG_Clues_Div" class="SG_Clues_Div StartHidden">Clues here if requested</DIV>';
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
    sMain += '<DIV Id="DisplayDualClue_Div" class="DisplayDualClue_Div StartHidden" onclick="TC_DisplayDualClue()">DisplayDualClue_Div</DIV>';
    document.getElementById("Body_Any").innerHTML = sMain;
}

function SG2_LoadAll(iSection)
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
            let iGap = 80;
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
// want to be just below             
            let iDisplayDualClueTop = 50;
            let elemStatusControlRight = document.getElementById("Div_StatusControl_Right");
            var rectStatusControlRight =  elemStatusControlRight.getBoundingClientRect();            
            TC_DisplayDualClue_Setup(iDisplayDualClueTop, g_TC_Padding_Left_iSize, rectStatusControlRight.left - 2 * g_TC_Padding_Left_iSize);
            let iDifficultyLevelTop = 80;
            TC_DifficultyLevel_Setup(iDifficultyLevelTop);            
// scratch area 
            let elemGrid = document.getElementById("Div_Grid");
            let rectGrid = elemGrid.getBoundingClientRect();
            let iColumns = 1;
            let iScratchAreaTop = rectGrid.top;
            let iScratchAreaLeft = rectGrid.right + 5;
            let iScratchAreaWidth = g_TC_iBiggestRight - iScratchAreaLeft - 5;
            TC_ScratchArea_Setup(iScratchAreaTop, iScratchAreaLeft, iColumns, iScratchAreaWidth);
            let iResultMessageTop = 135;
            TC_ResultMessage_Setup(iResultMessageTop);
            Status_Check(true);
            TC_AdjustSettings();
            if ( g_bSettings_ShowInfoOnStart )
                TC_ShowInfo();
            SG2_SetVisibles();
            break;
        default:
            alert('error section:' + iSection)                    
            break;
    }
}

function TC_SetVisible(sId)
{
    document.getElementById(sId).style.visibility = 'visible';
}

function SG2_SetVisibles()
{
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
}

function SG2_Adjust_KBAndIntro(iKBRows)
{
    let elemGrid = document.getElementById('Div_Grid');
    let rectGrid = elemGrid.getBoundingClientRect();
    let iKBWidth = rectGrid.width - 2; // account for border?
//
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    var elem_KB = document.getElementById('KB_Mini_Div');
    elem_KB.style.top = MakePixelString(g_TC_iBiggestBottom);
    elem_KB.style.width = MakePixelString(iKBWidth);
    elem_KB.style.left = MakePixelString(rectGrid.left);
//
    var elemButtonDiv = document.getElementById("KB_Mini_ButtonRow_Div");
    elemButtonDiv.style.width = MakePixelString(iKBWidth);
    var elemInstructionsDiv = document.getElementById("KB_Mini_Instructions_Div");
    elemInstructionsDiv.style.width = MakePixelString(iKBWidth);
    var rectInstructionsDiv = elemInstructionsDiv.getBoundingClientRect();
    elem_KB.style.height = MakePixelString(iKBRows * 47 + rectInstructionsDiv.height);// fix this?
    var rect_KB = elem_KB.getBoundingClientRect();
    g_TC_iBiggestBottom += rect_KB.height;
}

function TC_LeftForCentering(iWidthElement)
{
    let iWidthRemaining  = g_TC_iBiggestRight - iWidthElement;
    let iLeftForCentering = g_TC_Padding_Left_iSize + iWidthRemaining / 2;
    return iLeftForCentering;
}

function SG2_Adjust_GridAndPhantomGridPosition(iGap)
{
    g_TC_iBiggestBottom += iGap;
// instruction line goes before the grid 
    let iWidthGrid = g_iGridWidth * g_GRBMS_Square_iSize;
    let iHeightGrid = g_iGridHeight * g_GRBMS_Square_iSize;
    let iLeftForCentering = TC_LeftForCentering(iWidthGrid)
    var elemHowToA = document.getElementById("SG_HowToA_Div");
    g_TC_iBiggestBottom += g_TC_Padding_Inter_Vertical_iSize;
    elemHowToA.style.top = MakePixelString(g_TC_iBiggestBottom);
    elemHowToA.style.left = MakePixelString(iLeftForCentering);
    
    // make the width the width of the grid
    elemHowToA.style.width = MakePixelString(iWidthGrid);
    var rectelemHowToA = elemHowToA.getBoundingClientRect();
    g_TC_iBiggestBottom += rectelemHowToA.height;
//
    let elemGrid = document.getElementById('Div_Grid');
    elemGrid.style.top = MakePixelString(g_TC_iBiggestBottom)
    elemGrid.style.width = MakePixelString(iWidthGrid);
    elemGrid.style.height = MakePixelString(iHeightGrid);
// put the grid in the middle
    elemGrid.style.left = MakePixelString(iLeftForCentering);
// now the phantom grid
    let elemGrid_Phantom = document.getElementById('Div_Grid_Phantom');
    elemGrid_Phantom.style.top = MakePixelString(g_TC_iBiggestBottom);
    elemGrid_Phantom.style.left = MakePixelString(iLeftForCentering);
    g_TC_iBiggestBottom += iHeightGrid;
}

function SG2_SetSizes(iMaxGridWidth)
{
// decide on button size based upon grid size
// looking for the grid to be around 200
// our choices are 40, 50, 60 
// allow grid to be 75% of width
    var iButtonSize = Math.round(iMaxGridWidth/g_iGridWidth);
//
    g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_40 TC_Button_Square_Absolute';
    g_GRBMS_Square_iSize = 40;
    if ( iButtonSize > 49 )
    {
        g_GRBMS_Square_iSize = 50;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_50 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 59 )
    {
        g_GRBMS_Square_iSize = 60;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_60 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 69 )
    {
        g_GRBMS_Square_iSize = 70;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_70 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 79 )
    {
        g_GRBMS_Square_iSize = 80;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_80 TC_Button_Square_Absolute';
    }
    if ( iButtonSize > 89 )
    {
        g_GRBMS_Square_iSize = 90;
        g_GRBMS_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_90 TC_Button_Square_Absolute';
    }
// we can alter CAB size here also
    g_GRBMS_CAB_Square_sClass = 'TC_Button_Square_Base TC_Button_Square_30 TC_Button_Square_Relative';
    g_GRBMS_CAB_Square_iSize = 30;    
}
