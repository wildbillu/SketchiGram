// TC-DifficultyLevel.js

var g_DifficultyLevel_Range = 100;
var g_DifficultyLevel_iIncrementForLevels = 25;
var g_DifficultyLevel_iLevel = 3;

var g_DifficultyLevel_bShowClues = 0;
var g_DifficultyLevel_bShowScratchArea = 1;
var g_DifficultyLevel_bShowExtraCorrect = 2;


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