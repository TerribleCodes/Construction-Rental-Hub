BEGIN
  INSERT INTO customers (customer_id, first_name, last_name, gender)
  VALUES (1222, 'John', 'Doe', 'Male');

  INSERT INTO customers (customer_id, first_name, last_name, gender)
  VALUES (1333, 'Jane', 'Smith', 'Female');
  
  INSERT INTO customers (customer_id, first_name, last_name, gender)
  VALUES (1444, 'Bob', 'Johnson', 'Male');
  
  COMMIT;
END;

