BEGIN
  INSERT INTO products (product_id, product_name, product_price, product_stock)
  VALUES (:product_id, :product_name, :product_price, :product_stock);
  COMMIT;
END;
