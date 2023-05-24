const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

// Allow cross-origin resource sharing (CORS)
app.use(cors());
app.use(express.json());

//add body parser
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8080;
const HOST = '0.0.0.0';

const connection = mysql.createConnection({
    host : 'mysql-db',
    user : 'root',
    password : 'admin'
});
    
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
}); 

connection.query(`USE postsDB`,function (error, results) {
    if (error) console.log(error);
});
app.get('/init', (req,res) => {

    connection.query(`CREATE DATABASE IF NOT EXISTS postsDB`,function (error,result) {
        if (error) console.log(error) 
    });
    //Create Table
    connection.query(`USE postsDB`,function (error, results) {
        if (error) console.log(error);
    });

    connection.query(`CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        admin_privileges BOOLEAN NOT NULL DEFAULT false
      )`, function (error,result) {
        if (error) console.log(error);
    });

    connection.query(`CREATE TABLE IF NOT EXISTS messages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL
      )`, function (error,result) {
        if (error) console.log(error);
    });

    connection.query(`CREATE TABLE IF NOT EXISTS  replies (
        id INT PRIMARY KEY AUTO_INCREMENT,
        message_id INT NOT NULL,
        username VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        likes INT NOT NULL DEFAULT 0,
        dislikes INT NOT NULL DEFAULT 0,
        replies INT NOT NULL DEFAULT 0
      )`, function (error,result) {
        if (error) console.log(error);
    });

    connection.query(`CREATE TABLE IF NOT EXISTS dislikes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        message_id INT NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (message_id) REFERENCES messages(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`, function (error,result) {
        if (error) console.log(error);
    });

    connection.query(`CREATE TABLE IF NOT EXISTS likes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        message_id INT NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (message_id) REFERENCES messages(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`, function (error,result) {
        if (error) console.log(error);
    });

    res.status(201).send("Created DB");
});
app.post('/login', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
  
    // Check if email and password are provided
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }
  
    // Query the database for the email and password
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while logging in.' });
        return;
      }
  
      // Check if there is a matching user in the database
      if (results.length > 0) {
        res.status(200).json({ userId: results[0].username, status:"success" });
      } else {
        res.status(401).json({ error: 'Invalid email or password.' });
      }
    });
  });



  app.post('/signup', function(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
  
    // Check if email, username and password are provided
    if (!email || !username || !password) {
      res.status(400).json({ error: 'Email, username, and password are required.' });
      return;
    }
  
    // Check if email already exists in the database
    connection.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while signing up.' });
        return;
      }
  
      // If email already exists in the database, return an error
      if (results.length > 0) {
        res.status(409).json({ error: 'Email already exists.' });
        return;
      }
  
      // Insert the new user into the database
      connection.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, password], function(error, results, fields) {
        if (error) {
          console.log(error);
          res.status(500).json({ error: 'An error occurred while signing up.' });
          return;
        }
  
        res.status(201).json({ success: 'Signup successful.' });
      });
    });
  });

  //GET all messages
  app.get('/messages', function(req, res) {
    connection.query('SELECT * FROM messages', function(error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving messages.' });
        return;
      }
  
      res.json(results);
    });
  });

  //Get a message by ID
  app.get('/messages/:id', function(req, res) {
    const messageId = req.params.id;
    connection.query('SELECT * FROM messages WHERE id = ?', [messageId], function(error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving the message.' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Message not found.' });
        return;
      }
  
      res.json(results[0]);
    });
  });
  
  //POST a message
  app.post('/messages', function(req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const category = req.body.category;
    const username = req.body.username;
  
    connection.query('INSERT INTO messages (title, content, category, username) VALUES (?, ?, ?, ?)', [title, content, category, username], function(error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the message.' });
        return;
      }
  
      res.status(201).json({ id: results.insertId });
    });
  });
  

  //DELETE a message by id
  app.delete('/messages/:id', function(req, res) {
    const id = req.params.id;
  
    connection.query('DELETE FROM messages WHERE id = ?', [id], function(error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while deleting the message.' });
        return;
      }
  
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Message not found.' });
        return;
      }
  
      res.status(200).json({ message: 'Message deleted successfully.' });
    });
  });

  app.put('/messages/:id/dislike', (req, res) => {
    const messageId = req.params.id;
    const userId = req.body.userId;
    
    // check if the message exists
    connection.query('SELECT * FROM messages WHERE id = ?', [messageId], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Message not found' });
      } else {
        const message = results[0];
        
        // check if the user has already disliked the message
        connection.query('SELECT * FROM dislikes WHERE message_id = ? AND user_id = ?', [messageId, userId], (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
          } else if (results.length === 1) {
            // the user has already disliked the message, so undislike it
            connection.query('DELETE FROM dislikes WHERE message_id = ? AND user_id = ?', [messageId, userId], (error, results) => {
              if (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
              } else {
                res.status(200).json({ message: 'Message undisliked successfully' });
                
                // check if the user has also liked the message and unlike it
                connection.query('DELETE FROM likes WHERE message_id = ? AND user_id = ?', [messageId, userId], (error, results) => {
                  if (error) {
                    console.log(error);
                  }
                });
              }
            });
          } else {
            // the user has not disliked the message, so dislike it
            connection.query('INSERT INTO dislikes (message_id, user_id) VALUES (?, ?)', [messageId, userId], (error, results) => {
              if (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
              } else {
                res.status(200).json({ message: 'Message disliked successfully' });
                
                // check if the user has also liked the message and unlike it
                connection.query('DELETE FROM likes WHERE message_id = ? AND user_id = ?', [messageId, userId], (error, results) => {
                  if (error) {
                    console.log(error);
                  }
                });
              }
            });
          }
        });
      }
    });
  });
  

  app.put('/messages/:id/like', (req, res) => {
    const messageId = req.params.id;
    const userId = req.body.userId;
    
    // check if the message exists
    connection.query('SELECT * FROM messages WHERE id = ?', [messageId], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Message not found' });
      } else {
        const message = results[0];
        
        // check if the user has already disliked the message
        connection.query('SELECT * FROM likes WHERE message_id = ? AND user_id = ?', [messageId, userId], (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
          } else if (results.length === 1) {
            // the user has already disliked the message, so undislike it
            connection.query('DELETE FROM likes WHERE message_id = ? AND user_id = ?', [messageId, userId], (error, results) => {
              if (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
              } else {
                res.status(200).json({ message: 'Message unliked successfully' });
                
                // check if the user has also liked the message and unlike it
                connection.query('DELETE FROM dislikes WHERE message_id = ? AND user_id = ?', [messageId, userId], (error, results) => {
                  if (error) {
                    console.log(error);
                  }
                });
              }
            });
          } else {
            // the user has not disliked the message, so dislike it
            connection.query('INSERT INTO likes (message_id, user_id) VALUES (?, ?)', [messageId, userId], (error, results) => {
              if (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
              } else {
                res.status(200).json({ message: 'Message liked successfully' });
                
                // check if the user has also liked the message and unlike it
                connection.query('DELETE FROM dislikes WHERE message_id = ? AND user_id = ?', [messageId, userId], (error, results) => {
                  if (error) {
                    console.log(error);
                  }
                });
              }
            });
          }
        });
      }
    });
  });
  

  // Get the number of likes for a message by id
app.get('/messages/:id/likes', (req, res) => {
    const messageId = req.params.id;
    
    // Count the number of likes for the message
    connection.query('SELECT COUNT(*) AS likesCount FROM likes WHERE message_id = ?', [messageId], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        const likesCount = results[0].likesCount;
        res.status(200).json({ likesCount: likesCount });
      }
    });
  });
  
  // Get the number of dislikes for a message by id
  app.get('/messages/:id/dislikes', (req, res) => {
    const messageId = req.params.id;
    
    // Count the number of dislikes for the message
    connection.query('SELECT COUNT(*) AS dislikesCount FROM dislikes WHERE message_id = ?', [messageId], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        const dislikesCount = results[0].dislikesCount;
        res.status(200).json({ dislikesCount: dislikesCount });
      }
    });
  });


  app.post('/messages/:id/replies', (req, res) => {
    const messageId = req.params.id;
    const { username, text } = req.body;
  
    connection.query('INSERT INTO replies (message_id, username, text) VALUES (?, ?, ?)', [messageId, username, text], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'Reply created successfully' });
      }
    });
  });

  app.get('/messages/:id/replies', (req, res) => {
    const messageId = req.params.id;
  
    // get all replies for the given message ID
    connection.query('SELECT * FROM replies WHERE message_id = ?', [messageId], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);