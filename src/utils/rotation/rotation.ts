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

    set(yaw: number | Rotation, pitch?: number, roll?: number) {
        if (typeof yaw == 'number' && typeof pitch === 'number' && typeof roll === 'number') {
            this.yaw = yaw;
            this.pitch = pitch;
            this.roll = roll;
        } else if (yaw instanceof Rotation && pitch === undefined && roll === undefined) {
            this.yaw = yaw.yaw;
            this.pitch = yaw.pitch;
            this.roll = yaw.roll;
        } else {
            throw new Error('Invalid arguments to Rotation.set(), expected number, number, number or Rotation');
        }
    }

    clone() {
        return new Rotation(this.yaw, this.pitch, this.roll);
    }

    static fromDegrees(yaw: number, pitch: number, roll: number) {
        return new Rotation(Math.PI / 180 * yaw, Math.PI / 180 * pitch, Math.PI / 180 * roll);
    }
}