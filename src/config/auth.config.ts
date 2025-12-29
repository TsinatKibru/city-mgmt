const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret-key-for-job-application',
  JWT_EXPIRE: '24h',
  SALT_ROUNDS: 10,
};

export default config;

export const { JWT_SECRET, JWT_EXPIRE, SALT_ROUNDS } = config;
