BEGIN
  FOR i IN 1 .. :productIds.COUNT LOOP
    UPDATE products
    SET
      product_name = :productNames(i),
      product_price = :productPrices(i),
      product_stock = :productStocks(i)
    WHERE product_id = :productIds(i);
  END LOOP;
  COMMIT;
END;
