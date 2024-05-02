import assert, { AssertionError } from 'assert';
import mocha from 'mocha';
import { Quaternion } from '../../utils/quaternion/quaterion.js';
import { Rotation } from '../../utils/rotation/rotation.js';
import { MutableVector3D } from '../../utils/vector3d/mutable-vector3d.js';

mocha.describe('Quaternion', () => {
    const quaternionSingleComponent = Quaternion.fromRotation(new Rotation(Math.PI / 2, 0, 0));
    const unitVector = new MutableVector3D(1, 0, 0);

    mocha.it('should rotate correctly with a unit vector', () => {
        const rotated = quaternionSingleComponent.rotate(unitVector);
        const expected = new MutableVector3D(0, 0, 1);

        if (!rotated.aboutEquals(expected)) {
            throw new AssertionError({
                message: 'Rotated vector does not match expected',
                expected,
                actual: rotated
            });
        }
    });

    const quaternionMultipleComponents = Quaternion.fromRotation(new Rotation(Math.PI / 2, 0, 0));
    const longVector = new MutableVector3D(2, 0, 0);

    mocha.it('should rotate correctly with a longer vector', () => {
        const rotated = quaternionMultipleComponents.rotate(longVector);
        const expected = new MutableVector3D(0, 0, 2);

        if (!rotated.aboutEquals(expected)) {
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