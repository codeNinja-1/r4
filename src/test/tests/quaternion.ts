import assert, { AssertionError } from 'assert';
import mocha from 'mocha';
import { Quaternion } from '../../utils/quaternion/quaterion.js';
import { Rotation } from '../../utils/rotation/rotation.js';
import { Vector3 } from '../../utils/vector3d/vector3.js';

mocha.describe('Quaternion', () => {
    const quaternionSingleComponent = Quaternion.fromRotation(new Rotation(Math.PI / 2, 0, 0));
    const noQuaternionRotation = Quaternion.fromRotation(new Rotation(0, 0, 0));
    const noQuaternion = new Quaternion(0, 0, 0, 1);
    const unitVector = new Vector3(1, 0, 0);

    mocha.it('should do nothing when rotating a unit vector by the identity quaternion', () => {
        const rotated = noQuaternion.rotate(unitVector);

        if (!rotated.equals(unitVector, 0.01)) {
            throw new AssertionError({
                message: 'Rotated vector does not match expected',
                expected: unitVector,
                actual: rotated
            });
        }
    });

    mocha.it('should rotate correctly with a unit vector', () => {
        const rotated = quaternionSingleComponent.rotate(unitVector);
        const expected = new Vector3(0, 0, -1);

        if (!rotated.equals(expected, 0.01)) {
            throw new AssertionError({
                message: 'Rotated vector does not match expected',
                expected,
                actual: rotated
            });
        }
    });

    const quaternionMultipleComponents = Quaternion.fromRotation(new Rotation(Math.PI / 2, 0, 0));
    const longVector = new Vector3(2, 0, 0);

    mocha.it('should rotate correctly with a longer vector', () => {
        const rotated = quaternionMultipleComponents.rotate(longVector);
        const expected = new Vector3(0, 0, -2);

        if (!rotated.equals(expected, 0.01)) {
            throw new AssertionError({
                message: 'Rotated vector does not match expected',
                expected,
                actual: rotated
            });
        }
    });

    mocha.it('should stringify to the proper format', () => {
        const quaternion = new Quaternion(1, 2, 3, 4);
        const expected = 'Quaternion { 1, 2, 3, 4 }';

        assert.strictEqual(quaternion.toString(), expected);
    });

    mocha.it('should clone correctly', () => {
        const quaternion = new Quaternion(1, 2, 3, 4);
        const clone = quaternion.clone();

        if (!quaternion.equals(clone)) {
            throw new AssertionError({
                message: 'Clone does not match original',
                expected: quaternion,
                actual: clone
            });
        }
    });
});