-- Tietokannan rakenteen luonti
DROP TABLE IF EXISTS TASK;

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

insert into task (description) values ('My test task');

insert into task (description) values ('My other test task');