// In sketch.js wird die grid aktualisiert und gezeichnet, dazu kommt alles womit man zeichnen usw. kann
var grid;
var grid_size;
var button;
var slider;

var going = false



function setup() {
    createCanvas(windowHeight+100, windowHeight); // Das ist der hintergrund
    grid_size = windowHeight/((10+1)*1.1); // Man macht das die grid ein bisschen kleiner ist als die WindowHeight
    
    button = createButton("Go!"); // Go button wirt erstellt
    button.position(windowHeight+30, 20); // Und die position
    button.mousePressed(go); // die Funktion go (die später definiert wird)
    slider = createSlider(0.3, 35, 0.1); // hier wird der speed slider definiert
    slider.position(windowHeight+30, 50); // Und die position
    
    var gr = []; // Eine liste wo alle Quadrate reinkommen
    // Ab kommen die Quadrate in die gr liste
    // Man Braucht eine zwei dimensionale die so aussehen soll : [[0, 1, 0, 1, 0 (Line 1)], [0, 1, 0.. (line 2)], []...]
    for(x=0; x<grid_size; x++) {
        var line = []
        //die erste for loop macht die erste dimension, das heisst
        // wir brauchen in jedem element eine Linie
        for (y=0; y<grid_size; y++) {
            line.push(new Case(x, y, 0))
            // Hier kommt die zweite dimension und in jeder linie kommen genau so viel quadrate wie es linien gibt.
            // das Case object braucht ein x und y, das ist seine position, und der status is auf 0 (tot)
        }
        gr.push(line); // hier tut man jede linie in die zwie dimensionale liste
    }
    grid = new Grid(gr); // Das grid object braucht eine Zwei dimensionale liste
    // Das ist nützlich damit man die methoden von dem grid object benutzen können

    
    background(51);
    grid.render();
    // Diese zeilen werden im draw gemacht, aber nur wenn das spiel läuft, 
    // das heisst um etwas zu sehen muss man sie auch im setup machen.
    // render ist eine methode die in grid.js definiert wird, und sie zeigt 
}

function go() {
    // Diese Funktion wird mit dem Go button aktiviert
    if (going) {
        button.html("Go");
    }
    else {
        button.html("Stop");
    }
    going = !going;
    
    // Er lässt das spiel laufen wenn es nicht laüft und gegenseitig.

    grid.nxt();
    grid.update();
    grid.render();
    // Wenn man das nicht macht kommen problemen for beim zeichnen (Teschnisches problem)
}

function mousePressed() {
    // Zum zeichnen
    x = Math.floor(mouseX/10);
    y = Math.floor(mouseY/10);
    //eine Case ist 10 pixels gross, also um die Koordinaten in grid.cases zu finden,
    // Muss man die Mauskoordinaten durch 10 teilen.
    var state = grid.cases[x][y].state;
    if (state === 0) {
        grid.cases[x][y].state = 1;
    }else if (state === 1) {
        grid.cases[x][y].state = 0;
        grid.cases[x][y].next_state = 0;
    }
    
    // Man macht die lebendigen Zellen tot und die toten lebendig.
    grid.render();
    // Ohne das würde man es gar nicht sehen.
}

function mouseDragged() {
    x = Math.floor(mouseX/10);
    y = Math.floor(mouseY/10);
    var state = grid.cases[x][y].state;
    if (state === 0) {
        grid.cases[x][y].state = 1;
    }
    grid.render();
    return false;
    // Das selbe wenn die Maus sich beim mahlen bewegt
}

function draw() { 
    frameRate(slider.value());
    // hier wird der slider Aktiv gemacht
    if (going) {
    background(51);
    grid.nxt();
    grid.update();
    grid.render();
    }
    // die grid wird neu Calculiert, geupdatet und gerendert.
}
