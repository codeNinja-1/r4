import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import commonjs from '@rollup/plugin-commonjs';

export default [
	{
		input: 'src/test/main.ts',
		external: [ 'mocha' ],
		output: [
			{
                file: 'dist/test.js',
                format: 'es',
                sourcemap: true
            }
		],
        plugins: [ typescript() ]
	},
	// {
	// 	input: 'src/server/main.ts',
	// 	output: [
	// 		{
    //             file: 'dist/server.js',
    //             format: 'es',
    //             sourcemap: true
    //         }
	// 	],
    //     plugins: [ typescript() ]
	// },
	{
		input: 'src/client/main.ts',
		output: [
			{
				file: 'dist/client.js',
				format: 'es',
				sourcemap: true
			}
		],
		plugins: [
			nodeResolve({
				browser: true
			}), commonjs(), typescript(), nodePolyfills()
		]
	}
];