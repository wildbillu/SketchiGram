// TC-DifficultyLevel.js

var g_DifficultyLevel_Range = 3;
var g_DifficultyLevel_iLevel = 3;

var g_DifficultyLevel_bShowClues = 0;
var g_DifficultyLevel_bShowScratchArea = 1;
var g_DifficultyLevel_bShowExtraCorrect = 2;

function TC_DifficultyLevel_Set(iValue)
{
  let elemRangeControl = document.getElementById("DifficultyLevel_RangeControl");
  elemRangeControl.value = iValue;
  g_DifficultyLevel_iLevel = iValue;
}

function TC_DifficultyLevel_Changed()
{
  let elemRangeControl = document.getElementById("DifficultyLevel_RangeControl");
  let iLevel_New = elemRangeControl.value;
  if ( iLevel_New >= g_DifficultyLevel_iLevel)
  { // restore to old level and do nothing
    elemRangeControl.value = g_DifficultyLevel_iLevel;
    return;
  }
  TC_DifficultyLevel_ChangedWork(iLevel_New);
}

function TC_DifficultyLevel_ChangedWork(iLevel_New)    
{
    if ( iLevel_New <= 2 && g_DifficultyLevel_iLevel > 2 )
      TC_SetVisible("ScratchArea");
    if ( iLevel_New <= 1 && g_DifficultyLevel_iLevel > 1 )
      SG_Clues_Div_SetVisibility(g_SG_SC_ShowAll, true); 
    if ( iLevel_New == 0 && g_DifficultyLevel_iLevel > 0 && g_Cookie_DifficultyLevel_iLevel > 0 )
      SG_ShowExtraClue();
    g_DifficultyLevel_iLevel = iLevel_New;      
    let elemRangeControl = document.getElementById("DifficultyLevel_RangeControl");
    elemRangeControl.value = g_DifficultyLevel_iLevel;
}      

function TC_DifficultyLevel_Setup(iTop)
{
    let elemDifficultyLevel = document.getElementById("DifficultyLevel_Div");
    let sInner = '';
    sInner += '<TABLE class="DL_Table">';
    sInner += '  <TR><TD class="DL_Words">Hardest</TD></TR>'
    sInner += '  <TR><TD>'
    sInner += '    <DIV class="VerticalText">&nbsp;DIFFICULTY LEVEL&nbsp;</DIV>'
    sInner += '    <DIV class="DifficultyLevel_SliderRow_Div">'
    sInner += '       <input class="RangeRotate" min="0" max="3" type="range" Id="DifficultyLevel_RangeControl" onchange="TC_DifficultyLevel_Changed();">'
    sInner += '    </DIV>'
    sInner += '  </TD></TR>'
    sInner += '  <TR><TD class="DL_Words">Hard</TD></TR>';
    sInner += '</TABLE>';
    elemDifficultyLevel.innerHTML = sInner;    
    let elemRange = document.getElementById("DifficultyLevel_RangeControl");
    elemRange.style.left = MakePixelString(-135);
    elemRange.style.top = MakePixelString (160);
    elemDifficultyLevel.style.left = MakePixelString(20);//g_TC_Padding_Left_iSize);
    elemDifficultyLevel.style.top = MakePixelString (iTop);

    elemDifficultyLevelRangeControl = document.getElementById("DifficultyLevel_RangeControl");
    elemDifficultyLevelRangeControl.value = g_DifficultyLevel_iLevel;
}