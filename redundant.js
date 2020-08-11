
class NDS {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.calcAspect();
    }

    calcAspect() {
        this.aspect = this.width / this.height;
    }

    set width(width) {
        this.width = width;
        this.calcAspect();
    }

    set height(height) {
        this.height = height;
        this.calcAspect();
    }

    toPixel(coord) {
        return Vec2(
            (coord.x + 1) * this.width / 2,
            (coord.y + 1) * this.height / 2
        );
    }

    toNDS(coord) {
        return Vec2(
            coord.x * 2 / this.width - 1, 
            coord.y * 2 / this.height - 1
            );
    }
}

class Grid {
    constructor(max_x, max_y) {
        let arr = [];
        let grid = [];
        for (let i = 0; i < max_x; i++) {
            arr.push(0);
        }
        for (let j = 0; j < max_y; j++) {
            grid.push(arr);
        }
    }
}