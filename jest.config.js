const config = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{js,tsx}'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
	transform: {
		'^.+\\.[jt]sx?$': 'babel-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
export default config
