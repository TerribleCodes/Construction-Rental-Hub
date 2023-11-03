CREATE OR REPLACE PROCEDURE insert_order_and_items(
  p_order_id IN NUMBER,
  p_nic IN NUMBER,
  p_product_ids IN SYS.ODCINUMBERLIST,
  p_stock IN SYS.ODCINUMBERLIST
) AS
BEGIN
  INSERT INTO ORDERS (ORDER_ID, NIC, PURCHASE_DATE)
  VALUES (p_order_id, p_nic, SYSDATE);

  FOR i IN 1..p_product_ids.COUNT LOOP
    INSERT INTO RENTED_ITEMS (ORDER_ID, PRODUCT_ID, STOCK)
    VALUES (p_order_id, p_product_ids(i), p_stock(i));
  END LOOP;

  COMMIT;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    RAISE;
END insert_order_and_items;
/
