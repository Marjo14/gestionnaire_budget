USE budget_app;

-- Création table user 
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(100) NOT NULL
);
INSERT INTO user(username,email,password)
VALUES ('Marie', 'marie@gmail.com','123');


-- Création table transactions 
DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  amount DECIMAL(10, 2) NOT NULL,
  user_id INT NOT NULL,
  type_income ENUM("Income","Expense"),
  description VARCHAR(100),
  category_name VARCHAR(50) NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id)
); -- One to Many





