-- Pudotetaan vanhat taulut tarvittaessa
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS account;

-- Luodaan account-taulu
CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Luodaan task-taulu
CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL
);

-- Lisätään esimerkkitehtävät
INSERT INTO task (description) VALUES
('Complete the project documentation'),
('Review the code changes'),
('Prepare for the team meeting'),
('Update the project timeline'),
('Test the new features'),
('Fix the reported bugs'),
('Deploy the application to production'),
('Conduct a code review with peers');
