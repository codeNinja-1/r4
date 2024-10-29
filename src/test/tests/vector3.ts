import assert, { AssertionError } from 'assert';
import mocha from 'mocha';
import { Quaternion } from '../../utils/quaternion/quaterion.js';
import { Rotation } from '../../utils/rotation/rotation.js';
import { Vector3 } from '../../utils/vector3d/vector3.js';

mocha.describe('Vector3', () => {
    mocha.it('should add correctly', () => {
        const vector1 = new Vector3(1, 2, 3);
        const vector2 = new Vector3(4, 5, 6);
        const result = vector1.add(vector2);

        if (!(result.x == 5 && result.y == 7 && result.z == 9)) {
            throw new AssertionError({
                message: 'Sum does not match expected',
                expected: new Vector3(5, 7, 9),
                actual: result
            });
        }
    });

    mocha.it('should subtract correctly', () => {
        const vector1 = new Vector3(1, 2, 3);
        const vector2 = new Vector3(4, 5, 6);
        const result = vector1.subtract(vector2);

        if (!(result.x == -3 && result.y == -3 && result.z == -3)) {
            throw new AssertionError({
                message: 'Difference does not match expected',
                expected: new Vector3(-3, -3, -3),
                actual: result
            });
        }
    });

    mocha.it('should multiply correctly', () => {
        const vector = new Vector3(1, 2, 3);
        const result = vector.multiply(2);

        if (!(result.x == 2 && result.y == 4 && result.z == 6)) {
            throw new AssertionError({
                message: 'Product does not match expected',
                expected: new Vector3(2, 4, 6),
                actual: result
            });
        }
    });

    mocha.it('should divide correctly', () => {
        const vector = new Vector3(2, 4, 6);
        const result = vector.divide(2);

        if (!(result.x == 1 && result.y == 2 && result.z == 3)) {
            throw new AssertionError({
                message: 'Quotient does not match expected',
                expected: new Vector3(1, 2, 3),
                actual: result
            });
        }
    });

    mocha.it('should set correctly', () => {
        const vector = new Vector3(1, 2, 3);
        const result = vector.set(4, 5, 6);

        if (!(result.x == 4 && result.y == 5 && result.z == 6)) {
            throw new AssertionError({
                message: 'Set value does not match expected',
                expected: new Vector3(4, 5, 6),
                actual: result
            });
        }
    });

    mocha.it('should clone correctly', () => {
        const vector = new Vector3(1, 2, 3);
        const clone = vector.clone();

        if (!vector.equals(clone)) {
            throw new AssertionError({
                message: 'Clone does not match original',
                expected: vector,
                actual: clone
            });
        }
    });
});