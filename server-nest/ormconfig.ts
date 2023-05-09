module.exports = {
  type: 'sqlite',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'development',
  entities: ['src/**/**.entity.ts'],
  synchronize: true,
  autoLoadEntities: true,
};
