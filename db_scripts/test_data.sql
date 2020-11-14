####################################
# test data for node mysql web app #
####################################

# make a new user
call My_Database.AddUser('test@test.com', 'test123', '111-111-1111', '123 street');

# make an admin user
call My_Database.AddAdmin('admin@admin.com', 'test123', '123-123-1234', '123 admin st.', 'google.com', 'google.com', 'google.com', 'this is the about summary');

# add products to the db
call My_Database.AddProduct('Product 0', 'This is a product description', 11.99, 10);
call My_Database.AddProduct('Product 1', 'This is a product description', 10.99, 10);
call My_Database.AddProduct('Product 2', 'This is a product description', 12.99, 10);
call My_Database.AddProduct('Product 3', 'This is a product description', 14.99, 10);
call My_Database.AddProduct('Product 4', 'This is a product description', 10.99, 10);
call My_Database.AddProduct('Product 5', 'This is a product description', 20.99, 10);
call My_Database.AddProduct('Product 6', 'This is a product description', 9.99,  10);

# make a cart
call My_Database.MakeCart(1);

# add product to cart (cartID , productID)
# call My_Database.AddToCart(1, 1);

# add avaliable days YYYY-MM-DD
call My_Database.AddDay('2000-01-01', 10);
call My_Database.AddDay('2000-02-02', 10);
call My_Database.AddDay('2000-03-03', 10);
call My_Database.AddDay('2000-04-04', 10);
call My_Database.AddDay('2000-05-05', 10);


# add an order
call My_Database.AddOrder(1,'2000-05-05', 12.12, "No notes ...");


