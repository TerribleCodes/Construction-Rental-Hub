BEGIN
  UPDATE hr.products
  SET product_name = :product_name,
      product_price = :product_price,
      product_stock = :product_stock
  WHERE product_id = :product_id;

  COMMIT;
END;
