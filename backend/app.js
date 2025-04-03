const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const util = require('util');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3001;


const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});

const query = util.promisify(con.query).bind(con);

con.connect(function (err) {
  if (err) {
    console.error('Database connection error:', err);
    throw err;
  }
  console.log("Connected to MySQL");
});

let email_in_use = "";
let password_in_use = "";
let who = "";

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// Checks if patient exists in database
app.get('/checkIfPatientExists', (req, res) => {
  let params = req.query;
  let email = params.email;
  let statement = `SELECT * FROM patient WHERE email = "${email}"`;
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    return res.json({ data: results });
  });
});

// Fetch all patients
app.get('/getAllPatients', async (req, res) => {
  try {
    const statement = `SELECT * FROM patient`;
    console.log(statement);
    const results = await query(statement);
    if (results.length === 0) {
      return res.status(404).json({ error: 'No patients found' });
    }
    return res.json({ data: results });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return res.status(500).json({ error: 'An error occurred while fetching patients' });
  }
});

//fetch medical history
app.get('/fetchMedicalHistory', async (req, res) =>{
  try {
    const statement = `SELECT * FROM medicalhistory`;
    console.log(statement);
    const results = await query(statement);
    if (results.length === 0) {
      return res.status(404).json({ error: 'No medical history found' });
    }
    return res.json({ data: results });
  } catch (error) {
    console.error('Error fetching medical history:', error);
    return res.status(500).json({ error: 'An error occurred while fetching medical history' });
  }
})
// Creates User Account
app.get('/makeAccount', async (req, res) => {
  let queryParams = req.query;
  let name = queryParams.name + " " + queryParams.lastname;
  let email = queryParams.email;
  let password = queryParams.password;
  let address = queryParams.address;
  let gender = queryParams.gender;
  let medications = queryParams.medications || "none";
  let conditions = queryParams.conditions || "none";
  let surgeries = queryParams.surgeries || "none";

  console.log("Received data:", { name, email, password, address, gender, medications, conditions, surgeries });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let insertPatientSql = `INSERT INTO patient (email, password, name, address, gender)
                             VALUES ("${email}", "${hashedPassword}", "${name}", "${address}", "${gender}")`;
    console.log("Inserting into patient table:", insertPatientSql);

    await query(insertPatientSql);

    let insertMedicalHistorySql = `INSERT INTO medicalhistory (date, conditions, surgeries, medication, patient_email)
                                    VALUES (CURDATE(), "${conditions}", "${surgeries}", "${medications}", "${email}")`;
    console.log("Inserting into medicalhistory table:", insertMedicalHistorySql);

    let medicalHistoryResult = await query(insertMedicalHistorySql);
    let generated_id = medicalHistoryResult.insertId;

    let insertPatientsFillHistorySql = `INSERT INTO patientsfillhistory (patient, history)
                                        VALUES ("${email}", ${generated_id})`;
    console.log("Inserting into patientsfillhistory table:", insertPatientsFillHistorySql);
    await query(insertPatientsFillHistorySql);

    res.json({ data: { generated_id } });
  } catch (error) {
    console.error("Error hashing password or executing queries:", error);
    return res.status(500).json({ error: 'Error hashing password or executing queries' });
  }
});

// To return a particular patient history
app.get('/OneHistory', async (req, res) => {
  const patientEmail = req.query.patientEmail;
  if (!patientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail)) {
    return res.status(400).json({ error: 'Invalid or missing patientEmail' });
  }

  const getHistorySql = `
    SELECT
      p.name AS patient_name,
      p.email AS patient_email,
      p.address AS patient_address,
      p.gender AS patient_gender,
      mh.date AS history_date,
      mh.conditions,
      mh.surgeries,
      mh.medication
    FROM
      patient p
    JOIN
      patientsfillhistory pfh ON p.email = pfh.patient
    JOIN
      medicalhistory mh ON pfh.history = mh.id
    WHERE
      p.email = ?
  `;

  try {
    const results = await query(getHistorySql, [patientEmail]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'No medical history found for the specified patient' });
    }
    res.json({ data: results });
  } catch (error) {
    console.error("Error fetching history:", error);
    return res.status(500).json({ error: 'Error fetching history' });
  }
});

// To show all diagnosed appointments till now
app.get('/allDiagnoses', async (req, res) => {
  const patientEmail = req.query.patientEmail;
  if (!patientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail)) {
    return res.status(400).json({ error: 'Invalid or missing patientEmail' });
  }

  const statement = `
    SELECT
      A.date AS appointment_date,
      A.doctor,
      A.concerns,
      A.symptoms,
      A.diagnosis,
      A.prescription
    FROM
      appointment A
    INNER JOIN (
      SELECT *
      FROM patientsattendappointments
      NATURAL JOIN diagnose
      WHERE patient = ?
    ) AS B ON A.id = B.appt
  `;

  try {
    const results = await query(statement, [patientEmail]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'No diagnoses found for the specified patient' });
    }
    res.json({ data: results });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'An error occurred while fetching diagnoses' });
  }
});

// Checks If Doctor Exists
app.get('/checkIfDocExists', (req, res) => {
  let params = req.query;
  let email = params.email;
  let statement = `SELECT * FROM doctor WHERE email = "${email}"`;
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    return res.json({ data: results });
  });
});

// Makes Doctor Account
app.get('/makeDocAccount', async (req, res) => {
  let params = req.query;
  let name = params.name + " " + params.lastname;
  let email = params.email;
  let password = params.password;
  let gender = params.gender;
  let schedule = params.schedule;

  try {
    const checkScheduleSql = 'SELECT id FROM schedule WHERE id = ?';
    const scheduleExists = await query(checkScheduleSql, [schedule]);

    if (scheduleExists.length === 0) {
      return res.status(400).json({
        error: 'Invalid schedule ID. Schedule must exist before assigning to doctor.'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertDoctorSql = `
      INSERT INTO doctor (email, gender, password, name)
      VALUES (?, ?, ?, ?)
    `;
    await query(insertDoctorSql, [email, gender, hashedPassword, name]);
    const linkScheduleSql = `
      INSERT INTO docshaveschedules (sched, doctor)
      VALUES (?, ?)
    `;
    await query(linkScheduleSql, [schedule, email]);

    email_in_use = email;
    password_in_use = hashedPassword;
    who = 'doc';

    return res.json({ success: true, message: 'Doctor account created successfully' });

  } catch (error) {
    console.error('Error creating doctor account:', error);
    return res.status(500).json({
      error: 'Error creating doctor account',
      details: error.message
    });
  }
});

//  getAllAppointments
app.get('/getAllAppointments', async (req, res) => {
  try {
    const statement = 'SELECT * FROM appointment';
    console.log(statement);
    const results = await query(statement);
    res.json({ data: results });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Checks if patient is logged in
app.get('/checklogin', async (req, res) => {
  let params = req.query;
  let email = params.email;
  let password = params.password;
  let sql_statement = `SELECT * FROM patient WHERE email="${email}"`;
  console.log(sql_statement);
  con.query(sql_statement, async function (error, results, fields) {
    if (error) {
      console.log("error");
      return res.status(500).json({ failed: 'error occurred' });
    }
    if (results.length === 0) {
      return res.json({ data: results });
    } else {
      const match = await bcrypt.compare(password, results[0].password);
      if (match) {
        email_in_use = email;
        password_in_use = results[0].password;
        who = "pat";
        return res.json({ data: results });
      } else {
        return res.json({ data: [] });
      }
    }
  });
});

// Checks if doctor is logged in
app.get('/checkDoclogin', async (req, res) => {
  let params = req.query;
  let email = params.email;
  let password = params.password;
  let sql_statement = `SELECT * FROM doctor WHERE email="${email}"`;
  console.log(sql_statement);
  con.query(sql_statement, async function (error, results, fields) {
    if (error) {
      console.log("error");
      return res.status(500).json({ failed: 'error occurred' });
    }
    if (results.length === 0) {
      return res.json({ data: results });
    } else {
      const match = await bcrypt.compare(password, results[0].password);
      if (match) {
        email_in_use = results[0].email;
        password_in_use = results[0].password;
        who = "doc";
        console.log(email_in_use);
        console.log(password_in_use);
        return res.json({ data: results });
      } else {
        return res.json({ data: [] });
      }
    }
  });
});

//admin login
app.post('/api/admin-login', (req, res) => {
  const { email, password } = req.body;
  const statement = `SELECT * FROM admin WHERE EMAIL = ? AND PASSWORD = ?`;
  
  con.query(statement, [email, password], function (error, results, fields) {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
    if (results.length > 0) {
      res.json({ message: 'Admin login successful' });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  });
});

// DELETE doctor
app.delete('/api/doctor/:email', (req, res) => {
  const { email } = req.params;
  
  con.query('START TRANSACTION', async (transactionError) => {
    if (transactionError) {
      return res.status(500).json({ error: 'Error starting transaction' });
    }

    try {
      await query('DELETE FROM docshaveschedules WHERE doctor = ?', [email]);
      const result = await query('DELETE FROM doctor WHERE email = ?', [email]);
      
      if (result.affectedRows === 0) {
        await query('ROLLBACK');
        return res.status(404).json({ error: 'Doctor not found' });
      }

      await query('COMMIT');
      res.json({ success: true, message: 'Doctor deleted successfully' });
    } catch (error) {
      await query('ROLLBACK');
      console.error('Error deleting doctor:', error);
      res.status(500).json({ error: 'Failed to delete doctor' });
    }
  });
});

// UPDATE doctor
app.put('/api/doctor/:email', (req, res) => {
  const { email } = req.params;
  const { name, gender, password } = req.body;
  
  con.query('START TRANSACTION', async (transactionError) => {
    if (transactionError) {
      return res.status(500).json({ error: 'Error starting transaction' });
    }

    try {
      let updateQuery = 'UPDATE doctor SET name = ?,  gender = ?';
      let queryParams = [name, gender];
      
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateQuery += ', password = ?';
        queryParams.push(hashedPassword);
      }
      
      updateQuery += ' WHERE email = ?';
      queryParams.push(email);
      
      const result = await query(updateQuery, queryParams);
      
      if (result.affectedRows === 0) {
        await query('ROLLBACK');
        return res.status(404).json({ error: 'Doctor not found' });
      }

      await query('COMMIT');
      res.json({ success: true, message: 'Doctor updated successfully' });
    } catch (error) {
      await query('ROLLBACK');
      console.error('Error updating doctor:', error);
      res.status(500).json({ error: 'Failed to update doctor' });
    }
  });
});
// DELETE patient
app.delete('/api/patient/:email', (req, res) => {
  const { email } = req.params;
  
  con.query('START TRANSACTION', async (transactionError) => {
    if (transactionError) {
      return res.status(500).json({ error: 'Error starting transaction' });
    }

    try {
      await query('DELETE FROM medicalhistory WHERE patient_email = ?', [email]);
      await query('DELETE FROM patientsattendappointments WHERE patient = ?', [email]);
      
      const result = await query('DELETE FROM patient WHERE email = ?', [email]);
      
      if (result.affectedRows === 0) {
        await query('ROLLBACK');
        return res.status(404).json({ error: 'Patient not found' });
      }

      await query('COMMIT');
      res.json({ success: true, message: 'Patient deleted successfully' });
    } catch (error) {
      await query('ROLLBACK');
      console.error('Error deleting patient:', error);
      res.status(500).json({ error: 'Failed to delete patient' });
    }
  });
});

app.put('/api/patient/:email', (req, res) => {
  const { email } = req.params;
  const { name, gender, address, conditions, surgeries, medication, password } = req.body;
  
  con.query('START TRANSACTION', async (transactionError) => {
    if (transactionError) {
      return res.status(500).json({ error: 'Error starting transaction' });
    }

    try {
      let updatePatientQuery = 'UPDATE patient SET name = ?, gender = ?, address = ?';
      let patientParams = [name, gender, address];
      
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatePatientQuery += ', password = ?';
        patientParams.push(hashedPassword);
      }
      
      updatePatientQuery += ' WHERE email = ?';
      patientParams.push(email);
      
      const patientResult = await query(updatePatientQuery, patientParams);
      
      if (patientResult.affectedRows === 0) {
        await query('ROLLBACK');
        return res.status(404).json({ error: 'Patient not found' });
      }
      const currentDate = new Date().toISOString().split('T')[0];
      
      // First check if a medical history record exists for this patient
      const checkHistoryQuery = 'SELECT * FROM medicalhistory WHERE patient_email = ?';
      const existingHistory = await query(checkHistoryQuery, [email]);
      
      let historyResult;
      if (existingHistory.length > 0) {
        historyResult = await query(
          `UPDATE medicalhistory 
           SET date = ?, conditions = ?, surgeries = ?, medication = ?
           WHERE patient_email = ?`,
          [currentDate, conditions, surgeries, medication, email]
        );
      } else {
        historyResult = await query(
          `INSERT INTO medicalhistory (date, patient_email, conditions, surgeries, medication) 
           VALUES (?, ?, ?, ?, ?)`,
          [currentDate, email, conditions, surgeries, medication]
        );
      }

      await query('COMMIT');
      res.json({ success: true, message: 'Patient and medical history updated successfully' });
    } catch (error) {
      await query('ROLLBACK');
      console.error('Error updating patient:', error);
      res.status(500).json({ error: 'Failed to update patient and medical history' });
    }
  });
});

// Resets Patient Password
app.post('/resetPasswordPatient', async (req, res) => {
  let something = req.query;
  let email = something.email;
  let oldPassword = "" + something.oldPassword;
  let newPassword = "" + something.newPassword;
  let statement = `SELECT * FROM patient WHERE email="${email}"`;
  console.log(statement);
  con.query(statement, async function (error, results, fields) {
    if (error) throw error;
    if (results.length === 0) {
      return res.json({ data: [] });
    } else {
      const match = await bcrypt.compare(oldPassword, results[0].password);
      if (match) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        statement = `UPDATE patient SET password = "${hashedPassword}" WHERE email = "${email}"`;
        console.log(statement);
        con.query(statement, function (error, results, fields) {
          if (error) throw error;
          return res.json({ data: results });
        });
      } else {
        return res.json({ data: [] });
      }
    }
  });
});

// Resets Doctor Password
app.post('/resetPasswordDoctor', async (req, res) => {
  let something = req.query;
  let email = something.email;
  let oldPassword = "" + something.oldPassword;
  let newPassword = "" + something.newPassword;
  let statement = `SELECT * FROM doctor WHERE email="${email}"`;
  console.log(statement);
  con.query(statement, async function (error, results, fields) {
    if (error) throw error;
    if (results.length === 0) {
      return res.json({ data: [] });
    } else {
      const match = await bcrypt.compare(oldPassword, results[0].password);
      if (match) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        statement = `UPDATE doctor SET password = "${hashedPassword}" WHERE email = "${email}"`;
        console.log(statement);
        con.query(statement, function (error, results, fields) {
          if (error) throw error;
          return res.json({ data: results });
        });
      } else {
        return res.json({ data: [] });
      }
    }
  });
});

// Returns Who is Logged in
app.get('/userInSession', (req, res) => {
  console.log('User email in session:', email_in_use);
  return res.json({ email: email_in_use, who: who });
});

// Logs the person out
app.get('/endSession', (req, res) => {
  console.log("Ending session");
  email_in_use = "";
  password_in_use = "";
  who = "";
  return res.json({ message: 'Session ended' });
});

// Checks If a similar appointment exists to avoid a clash
app.get('/checkIfApptExists', (req, res) => {
  let cond1, cond2, cond3 = [];
  let params = req.query;
  let email = params.email;
  let doc_email = params.docEmail;
  let startTime = params.startTime;
  let date = params.date;
  let ndate = new Date(date).toLocaleDateString().substring(0, 10);
  let sql_date = `STR_TO_DATE('${ndate}', '%d/%m/%Y')`;
  let sql_start = `CONVERT('${startTime}', TIME)`;

  // Check if the patient already has an appointment at the specified date and time
  let statement = `SELECT * FROM patientsattendappointments pa
  INNER JOIN appointment a ON pa.appt = a.id
  WHERE pa.patient = "${email}" AND
  a.date = ${sql_date} AND
  a.starttime = ${sql_start}`;
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    cond1 = results;

    // Check if the doctor already has an appointment at the specified date and time
    statement = `SELECT * FROM diagnose d
    INNER JOIN appointment a ON d.appt = a.id
    WHERE d.doctor = "${doc_email}" AND
    a.date = ${sql_date} AND
    a.status = "NotDone" AND
    ${sql_start} >= a.starttime AND
    ${sql_start} < a.endtime`;
    console.log(statement);
    con.query(statement, function (error, results, fields) {
      if (error) throw error;
      cond2 = results;

      // Check if the appointment time conflicts with the doctor's schedule
      statement = `SELECT ds.doctor, s.starttime, s.endtime, s.breaktime, s.day
      FROM docshaveschedules ds
      INNER JOIN schedule s ON ds.sched = s.id
      WHERE ds.doctor = "${doc_email}" AND
      s.day = DAYNAME(${sql_date}) AND
      (DATE_ADD(${sql_start}, INTERVAL 1 HOUR) <= s.breaktime OR ${sql_start} >= DATE_ADD(s.breaktime, INTERVAL 1 HOUR))`;
      console.log(statement);
      con.query(statement, function (error, results, fields) {
        if (error) throw error;
        cond3 = results;
        let allConditions = cond1.concat(cond2, cond3);
        return res.json({ data: allConditions });
      });
    });
  });
});

// Returns Date/Time of Appointment
app.get('/getDateTimeOfAppt', (req, res) => {
  let tmp = req.query;
  let id = tmp.id;
  let statement = `SELECT starttime as start,
                          endtime as end,
                          date as theDate
                   FROM appointment
                   WHERE id = "${id}"`;
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    console.log(JSON.stringify(results));
    return res.json({ data: results });
  });
});


// To get all doctor names
app.get('/docInfo', (req, res) => {
  let statement = 'SELECT * FROM doctor';
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    return res.json({ data: results });
  });
});

// show all patients whose medical history can be accessed
app.get('/MedHistView', (req, res) => {
  let params = req.query;
  let patientName = "'%" + params.name + "%'";
  console.log("Search parameter name:", params.name);

  let statement = `SELECT name AS 'Name',
                    patientsfillhistory.history AS 'ID',
                    email FROM patient,patientsfillhistory
                    WHERE patient.email = patientsfillhistory.patient
                    AND patient.email IN (SELECT patient from patientsattendappointments
                    NATURAL JOIN diagnose WHERE doctor="${email_in_use}")`;
  if (patientName != "''")
    statement += " AND Patient.name LIKE " + patientName;
  console.log("SQL Query:", statement);

  con.query(statement, function (error, results, fields) {
    if (error) {
      console.error("Database query error:", error);
      throw error;
    }
    console.log("Query results:", results);
    return res.json({ data: results });
  });
});

// Returns Appointment Info To patient logged In
app.get('/patientViewAppt', (req, res) => {
  let tmp = req.query;
  let email = tmp.email;
  let statement = `SELECT patientsattendappointments.appt as ID,
                  patientsattendappointments.patient as user,
                  patientsattendappointments.concerns as theConcerns,
                  patientsattendappointments.symptoms as theSymptoms,
                  appointment.date as theDate,
                  appointment.starttime as theStart,
                  appointment.doctor as doctor,
                  appointment.endtime as theEnd,
                  appointment.status as status
                  FROM patientsattendappointments, appointment
                  WHERE patientsattendappointments.patient = "${email}" AND
                  patientsattendappointments.appt = appointment.id`;
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    return res.json({ data: results });
  });
});

// Checks if history exists
app.get('/checkIfHistory', (req, res) => {
  let params = req.query;
  let email = params.email;
  let statement = "SELECT patient FROM patientsfillhistory WHERE patient = '" + email + "'";
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    return res.json({ data: results });
  });
});


// Adds to PatientsAttendAppointment Table
app.get('/addToPatientSeeAppt', async (req, res) => {
  let params = req.query;
  let email = params.email;
  let appt_id = params.id;
  let concerns = params.concerns;
  let symptoms = params.symptoms;

  const patientCheckSql = `SELECT * FROM patient WHERE email = ?`;
  const patientCheckResults = await query(patientCheckSql, [email]);

  if (patientCheckResults.length === 0) {
    return res.status(400).json({ error: 'Invalid patient email' });
  }

  const sql_try = `INSERT INTO patientsattendappointments (patient, appt, concerns, symptoms)
                   VALUES (?, ?, ?, ?)`;
  try {
    await query(sql_try, [email, appt_id, concerns, symptoms]);
    return res.json({ data: 'Appointment linked to patient successfully' });
  } catch (error) {
    console.error('Error linking appointment to patient:', error);
    return res.status(500).json({ error: 'Failed to link appointment to patient' });
  }
});

// Schedules Appointment
app.get('/schedule', async (req, res) => {
  try {
    const { time, endTime, date, concerns, symptoms, id, doc } = req.query;
    const ndate = new Date(date).toLocaleDateString().substring(0, 10);

    await query('START TRANSACTION');

    const existingAppt = await query('SELECT id FROM appointment WHERE id = ?', [id]);
    if (existingAppt.length > 0) {
      await query('ROLLBACK');
      return res.status(409).json({
        error: 'Appointment ID already exists',
        details: 'Cannot create duplicate appointment ID'
      });
    }
    const appointmentSql = `
      INSERT INTO appointment (id, doctor, date, starttime, endtime, status)
      VALUES (?,?, STR_TO_DATE(?, '%d/%m/%Y'), CONVERT(?, TIME), CONVERT(?, TIME), "NotDone")
    `;
    await query(appointmentSql, [id, doc, ndate, time, endTime]);

    const diagnosisSql = `
      INSERT INTO diagnose (appt, doctor, diagnosis, prescription)
      VALUES (?, ?, "Not Yet Diagnosed", "Not Yet Diagnosed")
    `;
    await query(diagnosisSql, [id, doc]);

    await query('COMMIT');

    res.json({ success: true });
  } catch (error) {

    await query('ROLLBACK');
    console.error('Error scheduling appointment:', error);
    res.status(500).json({
      error: 'Failed to schedule appointment',
      details: error.message
    });
  }
});

//generate appointmeny ID
app.get('/genApptUID', async (req, res) => {
  try {
    console.log('Generating appointment UID...');

    await query('START TRANSACTION');

    const statement = `
      SELECT COALESCE(MAX(id), 0) + 1 as next_id
      FROM appointment
      FOR UPDATE`; 

    console.log('Executing query:', statement);

    const results = await query(statement);
    console.log('Query results:', results);

    if (!results || results.length === 0) {
      await query('ROLLBACK');
      return res.status(500).json({
        error: 'Failed to generate appointment ID',
        details: 'No results returned from query'
      });
    }

    const next_id = results[0].next_id;

    if (next_id === null || next_id === undefined) {
      await query('ROLLBACK');
      return res.status(500).json({
        error: 'Failed to generate appointment ID',
        details: 'Invalid next_id value'
      });
    }

    // Verify the ID doesn't already exist
    const checkExisting = await query('SELECT id FROM appointment WHERE id = ?', [next_id]);
    if (checkExisting.length > 0) {
      await query('ROLLBACK');
      return res.status(500).json({
        error: 'Failed to generate appointment ID',
        details: 'ID collision detected'
      });
    }

    await query('COMMIT');

    console.log('Generated ID:', next_id);
    return res.json({ id: next_id.toString() });

  } catch (error) {
    await query('ROLLBACK');
    console.error('Error in genApptUID:', error);
    return res.status(500).json({
      error: 'Failed to generate appointment ID',
      details: error.message
    });
  }
});

// To fill diagnoses
app.get('/diagnose', (req, res) => {
  let params = req.query;
  let id = params.id;
  let diagnosis = params.diagnosis;
  let prescription = params.prescription;
  let statement = `UPDATE Diagnose SET diagnosis="${diagnosis}", prescription="${prescription}" WHERE appt=${id};`;
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    let statement = `UPDATE appointment SET status="Done" WHERE id=${id};`;
    console.log(statement);
    con.query(statement, function (error, results, fields) {
      if (error) throw error;
    });
  });
});

// To show diagnoses
app.get('/showDiagnoses', (req, res) => {
  let id = req.query.id;
  let statement = `SELECT * FROM diagnose WHERE appt=${id}`;
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    return res.json({ data: results });
  });
});

// To show appointments to doctor
app.get('/doctorViewAppt', (req, res) => {
  let a = req.query;
  let email = a.email;
  let statement = `SELECT a.id,a.date, a.starttime, a.status, p.name, psa.concerns, psa.symptoms
  FROM appointment a, patientsattendappointments psa, patient p
  WHERE a.id = psa.appt AND psa.patient = p.email
  AND a.id IN (SELECT appt FROM Diagnose WHERE doctor="${email_in_use}")`;
  console.log(statement);
  con.query(statement, function (error, results, fields) {
    if (error) throw error;
    return res.json({ data: results });
  });
});


//delete appointment
app.get('/deleteAppt', (req, res) => {
  const uid = req.query.uid;
  if (!uid) {
    return res.status(400).json({ error: 'Appointment ID is missing' });
  }
  con.query('START TRANSACTION', async (transactionError) => {
    if (transactionError) {
      return res.status(500).json({ error: 'Error starting transaction' });
    }

    try {
     
      await query('DELETE FROM diagnose WHERE appt = ?', [uid]);

      await query('DELETE FROM patientsattendappointments WHERE appt = ?', [uid]);

      const result = await query('DELETE FROM appointment WHERE id = ? AND (status = \'Cancelled\' OR status = \'Done\')', [uid]);

      if (result.affectedRows === 0) {
        await query('ROLLBACK');
        return res.status(400).json({ error: 'Appointment cannot be deleted. Ensure it is in Cancelled or Done.' });
      }

      await query('COMMIT');
      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      await query('ROLLBACK');
      console.error(error);
      res.status(500).json({ error: 'Error deleting appointment' });
    }
  });
});


//cancel appointment
app.get('/cancelAppt', (req, res) => {
  const uid = req.query.uid;
  if (!uid) {
    return res.status(400).json({ error: 'Appointment ID is missing' });
  }

  const statement = `
    UPDATE appointment
    SET status = 'Cancelled'
    WHERE id = ? AND status = 'NotDone';
  `;

  con.query(statement, [uid], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error cancelling appointment' });
    }
    if (results.affectedRows === 0) {
      return res.status(400).json({ error: 'Appointment cannot be cancelled' });
    }
    res.json({ message: 'Appointment cancelled successfully' });
  });
});

app.use(function (req, res, next) {
  console.log(`404 Not Found: ${req.originalUrl}`);
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    message: err.message,
    error: res.locals.error
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
