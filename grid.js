function Grid(cases) {
    this.cases = cases
    // Die zwei dimensionale liste
}

Grid.prototype.render = function() {
    for (i = 0; i<this.cases.length; i++) {
        for (j = 0; j<this.cases[0].length; j++) {
            this.cases[i][j].render();
        }
    }
    // grid.render() loop durch jede zelle und macht case.render()
}

Grid.prototype.nxt = function() {
    // Nxt ist stat next, weil das ein keyword in js ist
    for (i=1; i<this.cases.length-1; i++) {
        for (j=1; j<this.cases[0].length-1; j++) {
            // Man geht durch jede Zelle ausser am Rand damit es keine index Problemen gibt
            
            neighbours_count = 0;
            for (x = -1; x < 2; x++) {
                for (y = -1; y < 2; y++) {
                    if (!(x === 0 && y == 0)) {
                        neighbours_count += this.cases[i+x][j+y].state;
                    }
                }
            }
            // Hier guckt man wieviel Zellen am Leben sind um die zelle(i; j)
            
            if ((neighbours_count < 2 || neighbours_count > 3) && this.cases[i][j].state == 1) {
                this.cases[i][j].next_state = 0;
                // Wen eine lebende (state == 1) Zelle weniger als 2 oder mehr als 3 Nachbahr hat
                // stirbt sie
            } else if (neighbours_count >= 2 && neighbours_count <= 3 && this.cases[i][j].state == 1){
                this.cases[i][j].next_state = 1;
                // Wenn eine lebende Zelle zwischen 2 und 3 nachbahr hat, bleibt sie am Leben
            }
            if (neighbours_count == 3 && this.cases[i][j].state == 0) {
                this.cases[i][j].next_state = 1;
                // Wenn eine unlebendige Zelle 3 Nachbar hat, kommt sie ans Leben
            }
            
        }
    }
}

Grid.prototype.update = function() {
    this.cases.forEach(function(line) {
        line.forEach(function(c) {
            c.state = c.next_state;
            // In dem update ändern sich die Zellen, nur dann sieht was in grid.nxt() passiert ist
        });
    });
}
