function Grid(cases) {
    this.cases = cases
}

Grid.prototype.render = function() {
    for (i = 0; i<this.cases.length; i++) {
        for (j = 0; j<this.cases[0].length; j++) {
            this.cases[i][j].render();
        }
    }
}

Grid.prototype.calculateNeigboursCount = function(x, y) {
    neighbours_count = 0
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 2; j++) {
            if (i != 0 && j != 0) {
                neighbours_count += this.cases[i+x][j+y].state
            }
        }
    }
    return neighbours_count
}

Grid.prototype.nxt = function() {
    for (i=1; i<this.cases.length-1; i++) {
        for (j=1; j<this.cases[0].length-1; j++) {
            //detecting if the case dies
            neighbours_count = 0;
            for (x = -1; x < 2; x++) {
                for (y = -1; y < 2; y++) {
                    if (!(x === 0 && y == 0)) {
                        if (i == 6 && j == 6) {
                            // console.log(this.cases[i+x][j+y], "hello");
                        }
                        neighbours_count += this.cases[i+x][j+y].state;
                    }
                }
            }   
            if ((neighbours_count < 2 || neighbours_count > 3) && this.cases[i][j].state == 1) {
                this.cases[i][j].next_state = 0;
            } else if (neighbours_count >= 2 && neighbours_count <= 3 && this.cases[i][j].state == 1){
                this.cases[i][j].next_state = 1;
            }
            if (neighbours_count == 3 && this.cases[i][j].state == 0) {
                this.cases[i][j].next_state = 1;
            }
            
        }
    }
}

Grid.prototype.update = function() {
    this.cases.forEach(function(line) {
        line.forEach(function(c) {
            c.state = c.next_state;
        });
    });
}