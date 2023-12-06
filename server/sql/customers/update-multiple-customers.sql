BEGIN
  FOR i IN 1 .. :customerData.COUNT LOOP
    UPDATE customer
    SET
      customer_name = :customerData(i).customer_name,
      customer_phone = :customerData(i).customer_phone,
      customer_email = :customerData(i).customer_email,
      customer_address = :customerData(i).customer_address
    WHERE customer_nic = :customerData(i).customer_nic;
  END LOOP;
  COMMIT;
END;
