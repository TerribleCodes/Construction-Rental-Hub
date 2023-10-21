CREATE OR REPLACE TRIGGER calculate_rent
BEFORE INSERT OR UPDATE ON rentals
FOR EACH ROW
DECLARE
  v_total_rent NUMBER := 0;
  v_product_id NUMBER;
  v_purchase_date DATE;
  v_return_date DATE;
BEGIN
  IF :new.return_date IS NOT NULL THEN
    FOR i IN (SELECT COLUMN_VALUE AS product_id FROM TABLE (:new.product_ids)) LOOP
      SELECT purchase_date, return_date
      INTO v_purchase_date, v_return_date
      FROM rentals
      WHERE product_id = i.product_id AND customer_nic = :new.customer_nic;
      
      v_total_rent := v_total_rent + 
        (v_return_date - v_purchase_date) * (
          SELECT product_price FROM products WHERE product_id = i.product_id
        );
    END LOOP;
    :new.rent := v_total_rent;
  END IF;
END;
/
