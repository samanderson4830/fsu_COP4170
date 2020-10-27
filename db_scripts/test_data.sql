# make a new user
call My_Database.AddUser('test@test.com', 'test123', '111-111-1111', '123 street');

# add products to the db
call My_Database.AddProduct('Product 0', 'This is a product description', 11.99, 10);
call My_Database.AddProduct('Product 1', 'This is a product description', 10.99, 10);
call My_Database.AddProduct('Product 2', 'This is a product description', 12.99, 10);
call My_Database.AddProduct('Product 3', 'This is a product description', 14.99, 10);
call My_Database.AddProduct('Product 4', 'This is a product description', 10.99, 10);
call My_Database.AddProduct('Product 5', 'This is a product description', 20.99, 10);
call My_Database.AddProduct('Product 6', 'This is a product description', 9.99,  10);

# make a cart
call My_Database.MakeCart('test@test.com');

# add product to cart (cartID , productID, amount)
call My_Database.AddToCart(1, 1, 4);
