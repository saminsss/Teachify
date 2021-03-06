--COPY customers TO 'D:/customers.csv' WITH (FORMAT CSV, HEADER);
--COPY employees TO 'D:/employees.csv' WITH (FORMAT CSV, HEADER);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE USERS
(
    ID UUID DEFAULT uuid_generate_v1 (),
    EMAIL VARCHAR(60) NOT NULL,
	FIRSTNAME VARCHAR(60) NOT NULL,
    LASTNAME VARCHAR(60) NOT NULL,
    PASSWORD VARCHAR(60) NOT NULL,
    ROLE VARCHAR(10) NOT NULL,
    CONSTRAINT USERS_PKEY PRIMARY KEY (EMAIL, ROLE)
);

CREATE INDEX IDX_USERS_ID 
ON USERS(ID);

CREATE TABLE AUTHENTICATION
(
	EMAIL VARCHAR(60),
    TOKEN VARCHAR(4000) NOT NULL,
    CONSTRAINT AUTHENTICATION_PKEY PRIMARY KEY (TOKEN)
);


CREATE TABLE CUSTOMERS
(
    ID UUID DEFAULT uuid_generate_v1 (),
    EMAIL VARCHAR(60) NOT NULL,
    FIRSTNAME VARCHAR(60) NOT NULL,
    LASTNAME VARCHAR(60) NOT NULL,
	GENDER VARCHAR(10),
    CITY VARCHAR(35),
	PROVINCE VARCHAR(35),
	COUNTRY VARCHAR(35),
    PHONE VARCHAR(40),
    REGISTRATIONDATE DATE,
    CONSTRAINT CUSTOMERS_PKEY PRIMARY KEY (EMAIL)
);

CREATE INDEX IDX_CUSTOMERS_ID 
ON CUSTOMERS(ID);

CREATE TABLE TRANSACTIONS
(
    ID UUID DEFAULT uuid_generate_v1 (),
    EMAIL VARCHAR(60),
	FIRSTNAME VARCHAR(60),
	LASTNAME VARCHAR(60),
    STATUS VARCHAR(10),
    DATE DATE,
	PRODUCT VARCHAR(15),
    AMOUNT NUMERIC(10,5),
	CURRENCY VARCHAR(3),
	METHOD VARCHAR(40),
    CONSTRAINT TRANSACTIONS_PKEY PRIMARY KEY (ID, EMAIL)
);

CREATE INDEX IDX_TRANSACTIONS_ID 
ON TRANSACTIONS(ID);
CREATE INDEX IDX_TRANSACTIONS_EMAIL 
ON TRANSACTIONS(EMAIL);


CREATE TABLE EMPLOYEES(
	ID UUID DEFAULT uuid_generate_v1 (),
	EMAIL VARCHAR(60) NOT NULL,
	FIRSTNAME VARCHAR(60) NOT NULL,
	LASTNAME VARCHAR(60) NOT NULL,
	GENDER VARCHAR(20),
	TITLE VARCHAR(50),
	PHONE VARCHAR(40),
	CITY VARCHAR(40),
	PROVINCE VARCHAR(35),
	COUNTRY VARCHAR(35),
	JOINDATE DATE,
	
	CONSTRAINT EMPLOYEES_PKEY PRIMARY KEY (EMAIL)
);

CREATE INDEX IDX_EMPLOYEES_ID 
ON EMPLOYEES(ID);


CREATE TABLE INVOICES(
	ID UUID DEFAULT uuid_generate_v1 (),
	EMAIL VARCHAR(60),
	FIRSTNAME VARCHAR(60),
	LASTNAME VARCHAR(60),
	AMOUNT DECIMAL(22,6),
	ISSUEDATE TIMESTAMP WITH TIME ZONE,
	DUEDATE TIMESTAMP WITH TIME ZONE,
	STATUS VARCHAR(10),
	
	CONSTRAINT INVOICES_PKEY PRIMARY KEY (ID, EMAIL)
);

CREATE TABLE REVIEWS(
	EMAIL VARCHAR(60) NOT NULL,
	FIRSTNAME VARCHAR(60),
	LASTNAME VARCHAR(60),
	REVIEW VARCHAR(500),
	COMPANY VARCHAR(50),
	
	CONSTRAINT REVIEWS_PKEY PRIMARY KEY (EMAIL)
);
