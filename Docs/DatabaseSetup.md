# JEWA Database Setup Instructions

This document explains how to set up the **MySQL database** for the JEWA project and configure it to work with Spring Boot.

---

## 1. Install MySQL

1. Download and install MySQL Community Server (https://dev.mysql.com/downloads/installer/).
2. Ensure MySQL is running and you can connect using a MySQL client or terminal.
3. Create a MySQL user for the application

---

## 2. Prepare the database

1. Open MySQL Workbench
1. Execute following SQL command:

```sql
CREATE DATABASE IF NOT EXISTS jewadb
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

---

## 3. Configure Spring Boot

Set environment variables (Windows):

```powershell
# PowerShell
$env:DB_USER="db_user"
$env:DB_PASS="password"

# CMD
set DB_USER=db_user
set DB_PASS=password
```

You can also do this via Windows environment variable setting:

1. Open the Control Panel.
2. Click System and Security, then System.
3. Click Advanced system settings on the left.
4. Select Environment Variables.
5. Make your changes.

> Restart your IDE.

---

## 4. Verify the connection

1. Start the Spring Boot application:

```bash
mvn spring-boot:run
```

2. Access the users page in your browser:

```
http://localhost:8080/users
```

---

## Notes

* Do not commit credentials to version control; use environment variables.
* Ensure MySQL is running before starting the Spring Boot app.
