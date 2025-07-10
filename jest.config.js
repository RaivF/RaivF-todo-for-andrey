const config = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{js,jsx}'],
	coverageDirectory: 'coverage',
	TestEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/internal/setup-tests.js'],
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	moduleFileExtensions: ['js', 'jsx'],
}
export default config
