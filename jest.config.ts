module.exports = {
  preset: 'ts-jest', // Use ts-jest for TypeScript files
  testEnvironment: 'jsdom', // For testing React components
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '^preact(/(.*)|$)': 'preact$1',
    '\\.(svg|jpg|jpeg|png|gif|webp|woff|woff2|eot|ttf|otf)$':
      'jest-transform-stub', // Mock static assets
    '@app/(.*)': '<rootDir>/app/$1',
    '@components/(.*)': '<rootDir>/components/$1',
    '@constants/(.*)': '<rootDir>/constants/$1',
    '@assets/(.*)': '<rootDir>/assets/$1',
    '@context/(.*)': '<rootDir>/context/$1',
    '@hooks/(.*)': '<rootDir>/hooks/$1',
    '@libs/(.*)': '<rootDir>/libs/$1',
    '@stores/(.*)': '<rootDir>/stores/$1',
    '@utils/(.*)': '<rootDir>/utils/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'], // Optional: If you have setup scripts
};
