// TC-DrawGrid.js

function TC_Canvas_FillText(cContext, x, y, cLetter)
{
cContext.font = "200px Arial";
cContext.textBaseline = 'middle';
cContext.textAlign = "center";
cContext.fillText(cLetter, x, y);
//top, hanging, middle, alphabetic, ideographic, and bottom.
}

var g_contextGridCanvas;

function TC_DrawTest()
{
    let elemGridCanvasDiv = document.getElementById("GridCanvasDIV");
    elemGridCanvasDiv.innerHTML = '<canvas id="GridCanvas" width="' + g_Window_iWidth + '" height="' + g_Window_iHeight + '" style="border:0px solid grey"></canvas>'
    let elemGridCanvas = document.getElementById("GridCanvas");
//canvas.style.width = MakePixelString(600)
//canvas.style.height = MakePixelString(1200)
    elemGridCanvas.style.zIndex = 30;
    elemGridCanvasDiv.style.zIndex = 30;
    g_contextGridCanvas = elemGridCanvas.getContext("2d");
    g_contextGridCanvas.imageSmoothingEnabled = false;

    g_contextGridCanvas.lineWidth = 4;
    g_contextGridCanvas.fillStyle = "yellow";
    g_contextGridCanvas.fillRect(200, 200, 200, 200);
    g_contextGridCanvas.strokeStyle = "green";
    g_contextGridCanvas.strokeRect(200, 200, 200, 200);
    g_contextGridCanvas.fillStyle = "black";
    TC_Canvas_FillText(g_contextGridCanvas, 300, 300, 'A')



    g_contextGridCanvas.strokeStyle = "black";
    g_contextGridCanvas.strokeRect(404, 200, 200, 200);

    ForIdSetVisibility("Div_Grid", false);
    setTimeout(function(){CC();}, 15*1000);
}

function CC()
{
    g_contextGridCanvas.fillStyle = "white";
    g_contextGridCanvas.fillRect(200, 200, 200, 200);
    g_contextGridCanvas.strokeStyle = "green";
    g_contextGridCanvas.strokeRect(200, 200, 200, 200);
    g_contextGridCanvas.fillStyle = "black";
    TC_Canvas_FillText(g_contextGridCanvas, 300, 300, 'B')
}