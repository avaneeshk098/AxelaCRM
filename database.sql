CREATE TABLE axela_student(
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    student_age INTEGER NOT NULL,
    student_dob DATE NOT NULL,
    student_mobile VARCHAR(10) UNIQUE NOT NULL,
    student_email VARCHAR(255) UNIQUE NOT NULL,
    student_address VARCHAR(500) NOT NULL,
    student_course_id INTEGER NOT NULL,
    student_active BOOLEAN NOT NULL
);

CREATE TABLE axela_course(
    course_id INTEGER NOT NULL,
    course_name VARCHAR(255) NOT NULL
);

INSERT INTO axela_student (student_name, student_age, student_dob, student_mobile, student_email, student_address, student_course_id, student_active)
    VALUES ('Avaneesh Kumar', 16, '2004-09-18', 9900200112, 'avaneeshk098@gmail.com', '#216, 1st Cross, 6th Main, Vidygiri Layout, Bangalore, India', 1, true);

DELETE FROM axela_student WHERE student_id = 1;

UPDATE axela_student SET student_name='Avaneesh' , student_active=false WHERE student_id = 6;