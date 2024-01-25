export class Rotation {
    yaw: number;
    pitch: number;
    roll: number;

    constructor(yaw = 0, pitch = 0, roll = 0) {
        if (typeof yaw !== 'number') throw new TypeError('yaw must be a number');
        if (typeof pitch !== 'number') throw new TypeError('pitch must be a number');
        if (typeof roll !== 'number') throw new TypeError('roll must be a number');
        if (isNaN(yaw)) throw new TypeError('yaw must not be NaN');
        if (isNaN(pitch)) throw new TypeError('pitch must not be NaN');
        if (isNaN(roll)) throw new TypeError('roll must not be NaN');

        this.yaw = yaw;
        this.pitch = pitch;
        this.roll = roll;
    }
}