BEGIN
  FOR i IN 1..:productData.COUNT
  LOOP
    INSERT INTO hr.products (product_id, product_name, product_price, product_stock)
    VALUES (:productData(i).product_id, :productData(i).product_name, :productData(i).product_price, :productData(i).product_stock);
  END LOOP;
  COMMIT;
END;
