BEGIN
  FOR i IN 1 .. :customerData.COUNT
  LOOP
    INSERT INTO customers (customer_nic, customer_name, customer_phone, customer_email, customer_address)
    VALUES (
      :customerData(i).customer_nic,
      :customerData(i).customer_name,
      :customerData(i).customer_phone,
      :customerData(i).customer_email,
      :customerData(i).customer_address
    );
  END LOOP;

  COMMIT;
END;
