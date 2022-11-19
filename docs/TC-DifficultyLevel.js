// TC-DifficultyLevel.js

var g_DifficultyLevel_Range = 100;
var g_DifficultyLevel_iIncrementForLevels = 25;
var g_DifficultyLevel_iLevel = 3;

var g_DifficultyLevel_bShowClues = 0;
var g_DifficultyLevel_bShowScratchArea = 1;
var g_DifficultyLevel_bShowExtraCorrect = 2;

function SG_Clues_Div_SetVisible(iIndex)
{
    if ( iIndex == -1 || iIndex == -2 )
    {
      TC_SetVisible("SG_Clues_Div");
    }
    if ( iIndex == 0 || iIndex == 1 || iIndex == -2 )
    {
      document.getElementById("SG_DualClue_Outer").style.visibility = 'visible';
      document.getElementById("SG_Clues_Text_Intro").style.visibility = 'visible';
      document.getElementById(SG_MakeClueTextId(0)).style.visibility = 'visible';
      document.getElementById(SG_MakeClueTextId(1)).style.visibility = 'visible';
    }
    if ( iIndex == -2 )
    {
      for ( let i = 2; i < g_aClues.length; i++ )
        document.getElementById(SG_MakeClueTextId(i)).style.visibility = 'visible'
      return;
    }
    if ( iIndex > 1 )
      document.getElementById(SG_MakeClueTextId(iIndex)).style.visibility = 'visible'
}

function TC_DifficultyLevel_Changed()
{
    let elemRangeControl = document.getElementById("DifficultyLevel_RangeControl");
    let iNewRange = elemRangeControl.value;
    let iLevel_New = Math.trunc(iNewRange/g_DifficultyLevel_iIncrementForLevels);
    if ( iLevel_New >= g_DifficultyLevel_iLevel)
    { // nothing to do
      elemRangeControl.value = g_DifficultyLevel_Range;
      return;
    }
    g_DifficultyLevel_Range = iNewRange;
    if ( iLevel_New <= 2 && g_DifficultyLevel_iLevel > 2 )
      TC_SetVisible("ScratchArea");
    if ( iLevel_New <= 1 && g_DifficultyLevel_iLevel > 1 )
    {
      SG_Clues_Div_SetVisible(-2); // sets them all
    }
    if ( iLevel_New == 0 && g_DifficultyLevel_iLevel > 0 )
      SG_ShowExtraClue();
    g_DifficultyLevel_iLevel = iLevel_New;
}

function TC_DifficultyLevel_Setup(iTop)
{
    let elemDifficultyLevel = document.getElementById("DifficultyLevel_Div");
    let sInner = '';
    sInner += '<DIV>Difficulty Level</DIV>'
    sInner += '<DIV class="DifficultyLevel_SliderRow_Div InLineRelative">'
    sInner += '<DIV class="InLineRelative">Hard</DIV>'
    sInner += '<input class="InLineRelative" type="range" Id="DifficultyLevel_RangeControl" onchange="TC_DifficultyLevel_Changed();">'
    sInner += '<DIV class="InLineRelative">Hardest</DIV>';
    sInner += '</DIV>';
    elemDifficultyLevel.innerHTML = sInner;    
    let rectDifficultyLevel = elemDifficultyLevel.getBoundingClientRect();
    let iLeftForCentering = TC_LeftForCentering(rectDifficultyLevel.width);
    elemDifficultyLevel.style.left = MakePixelString(iLeftForCentering);
    elemDifficultyLevel.style.top = MakePixelString(iTop);

    elemDifficultyLevelRangeControl = document.getElementById("DifficultyLevel_RangeControl");
    elemDifficultyLevelRangeControl.value = g_DifficultyLevel_Range;
}