import { createConnection } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

/**
 * This script sets up a test database for integration and e2e tests.
 * It creates a clean database and seeds it with test data.
 */
async function setupTestDatabase() {
  try {
    // Create connection to postgres to create test database
    const connection = await createConnection({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'framtal',
      database: 'postgres', // Connect to default database first
    });

    // Drop test database if it exists
    console.log('Dropping existing test database if it exists...');
    await connection.query(`DROP DATABASE IF EXISTS framtal_test`);

    // Create test database
    console.log('Creating test database...');
    await connection.query(`CREATE DATABASE framtal_test`);

    await connection.close();

    // Connect to new test database to run schema scripts
    const testConnection = await createConnection({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'framtal',
      database: 'framtal_test',
    });

    console.log('Running schema creation script...');
    // Read schema SQL from project root
    const schemaPath = path.join(__dirname, '../../public.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Execute schema creation
    await testConnection.query(schemaSql);

    console.log('Running test seed data script...');
    // Insert additional test data if needed
    await testConnection.query(`
      -- Insert test application
      INSERT INTO "public"."application" ("familyNumber", "year") 
      VALUES ('9876543210', '2024')
      ON CONFLICT DO NOTHING;

      -- Insert test entity
      INSERT INTO "public"."entity" ("nationalId", "familyNumber", "name", "email", "phone") 
      VALUES ('9876543210', '9876543210', 'Test Person', 'test@example.com', '555-1234')  
      ON CONFLICT DO NOTHING;
    `);

    await testConnection.close();
    console.log('Test database setup complete!');
  } catch (error) {
    console.error('Error setting up test database:', error);
    process.exit(1);
  }
}

setupTestDatabase();