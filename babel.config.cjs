module.exports = {
	presets: [
		['babel/preset-env', { target: { esmodules: true }, node: 'current' }],
		['babel/preset-react', { runtime: 'automatic' }],
	],
}
