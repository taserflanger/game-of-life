var grid;
var grid_size;
var button;
var slider;

var going = false



function setup() {
    createCanvas(windowHeight+100, windowHeight);
    grid_size = windowHeight/((10+1)*1.4);
    var gr = [];
    button = createButton("Go!");
    button.position(400, 20);
    button.mousePressed(go);
    slider = createSlider(0.3, 35, 0.1);
    slider.position(400, 50);
    for(x=0; x<grid_size; x++) {
        var line = []
        for (y=0; y<grid_size; y++) {
            line.push(new Case(x, y, 0))
        }
        gr.push(line);
    }
    grid = new Grid(gr);

    grid.cases[5][5].state = 1;
    grid.cases[5][6].state = 1;
    grid.cases[5][7].state = 1;
    background(51);
    grid.render();
    grid.nxt();
    grid.update();  
}

function go() {
    if (going) {
        button.html("Go");
    }
    else {
        button.html("Stop");
    }
    going = !going;

    grid.nxt();
    grid.update();
    grid.render();
}

function mousePressed() {
    x = Math.floor(mouseX/10);
    y = Math.floor(mouseY/10);
    var state = grid.cases[x][y].state;
    if (state === 0) {
        grid.cases[x][y].state = 1
    }else if (state === 1) {
        grid.cases[x][y].state = 0
    }
    grid.render();
}

function draw() { 
    frameRate(slider.value());
    if (going) {
    background(51);
    grid.nxt();
    grid.update();
    grid.render();
    }
}
