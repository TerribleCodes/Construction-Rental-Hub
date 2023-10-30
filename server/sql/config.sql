DEFINE db_username=&&DB_USERNAME
DEFINE db_password=&&DB_PASSWORD

alter session set "_oracle_script"=true;

CREATE USER &&db_username IDENTIFIED BY &&db_password  default tablespace users quota unlimited on users;

GRANT DBA TO dbadmin;