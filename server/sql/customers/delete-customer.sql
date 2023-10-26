DECLARE
  v_customer_nic VARCHAR2(15) := :customer_nic;
BEGIN
  DELETE FROM customers
  WHERE customer_nic = v_customer_nic;
  
  COMMIT;
END;
