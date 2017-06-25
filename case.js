function Case(x, y, state) {
    // Der Constructor nimmt die Position, und ein status (0 tot, 1 lebend)
    this.x = x;
    this.y = y;
    this.state = state;
    this.next_state = state;
    // next_state wird von der superClass (grid) berechnet, und wenn das grid
    // sich aktualisiert, wird state die next_state
}

Case.prototype.render = function() {
    var color = this.state == 1 ? 255 : 0;
    // Wenn die zelle am lebend ist wird die Color Weiss (255) sonst Schwartz (0)
    stroke(100);
    fill(color);
    var size = 10;
    var offset = 1;
    rect(this.x*size, this.y*size, size-offset, size-offset);
}
