function Case(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
    this.next_state = state;
    this.neighbours_count;
}

Case.prototype.render = function() {
    push()
    var color = this.state == 1 ? 255 : 0;
    stroke(100)
    fill(color);
    var size = 10;
    var offset = 1;
    rect(this.x*size, this.y*size, size-offset, size-offset);
    pop()
}
