require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { application } = require("express");
const {
  validateUserToken,
  validateAdminToken,
} = require("../middlewares/AuthMiddleware");

const saltRounds = 10;

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "sacdb",
});

// API for student creating user (not using in main app)
router.post("/createUser", (req, res) => {
  const { bitsmail, fName, lName, DOB, Address, password } = req.body;
  bcrypt.hash(password, saltRounds).then((hash) => {
    try {
      db.query(
        // Why does vscode say await is unnecessary here?
        "INSERT INTO sacdb.users (bitsmail, fName, lName, DOB, Address, password) VALUES (?, ?, ?, ?, ?, ?)",
        [bitsmail, fName, lName, DOB, Address, hash],
        (err, result) => {
          if (err) {
            console.log("F LMAO DED");
            console.log(err);
          } else {
            console.log(result);
            res.send("User Created!");
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.send("error, please check console!");
    }
  });
});

// API for creating admins
router.post("/createAdmin", (req, res) => {
  const { id, fName, lName, DOB, Address, password } = req.body;
  bcrypt.hash(password, saltRounds).then((hash) => {
    try {
      db.query(
        // Why does vscode say await is unnecessary here?
        "INSERT INTO sacdb.admins (fName, lName, DOB, Address, password) VALUES (?, ?, ?, ?, ?)",
        [fName, lName, DOB, Address, hash],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result.insertId);
            res.send("User Created!");
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.send("error, please check console!");
    }
  });
});

// API for logging in student
router.post("/login", (req, res) => {
  const { bitsmail, password } = req.body;
  try {
    db.query(
      "SELECT bitsmail, password FROM sacdb.users WHERE bitsmail=?",
      [bitsmail],
      (err, result) => {
        if (err) {
          res.send({ error: err });
        }
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password).then((match) => {
            if (!match) {
              res.json({ error: "Wrong username and password combination" });
            } else {
              const accessToken = sign(
                { id: bitsmail, role: "user" },
                process.env.JWTSECRET
              );
              res.json({ token: accessToken, username: bitsmail });
            }
          });
        } else {
          res.json({ error: "User does not exist!" });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// API for admin login
router.post("/adminlogin", (req, res) => {
  const { id, password, room } = req.body;
  try {
    db.query(
      "SELECT x.ID, x.password, r.Name FROM sacdb.rooms as r JOIN (SELECT m.ID, a.password, m.RoomID FROM sacdb.manages as m JOIN sacdb.admins as a on m.ID=a.id) as x ON x.RoomID=r.RoomID WHERE ID=? AND Name=?",
      [id, room],
      (err, result) => {
        if (err) {
          res.send({ error: err });
        }
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password).then((match) => {
            if (!match) {
              res.json({ error: "Wrong username and password combination" });
            } else {
              if (result[0].Name === room) {
                const accessToken = sign(
                  { id: id, role: "admin", room: room },
                  process.env.JWTSECRET
                );
                res.json({ token: accessToken, room: room });
              } else {
                res.json({ error: "Room not authorized!" });
              }
            }
          });
        } else {
          res.json({ error: "User does not exist!" });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// // API for getting data on homepage
router.get("/home", (req, res) => {
  try {
    db.query(
      "SELECT rooms.RoomID, Name, IFNULL(Current, 0) as Current, PersonLimit as Capacity FROM rooms LEFT JOIN (SELECT RoomID, COUNT(*) AS Current FROM sacdb.users GROUP BY RoomID) r ON rooms.RoomID = r.RoomID",
      (err, result) => {
        if (err) {
          res.json({ error: err });
        }
        res.json(result);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400);
  }
});

// API for getting student dashboard
router.get("/studentdash", validateUserToken, (req, res) => {
  try {
    const bitsmail = req.user.id;
    db.query("SELECT * FROM sacdb.users", [bitsmail], (err, result) => {
      if (err) {
        res.json({ error: "databsse gone" });
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// to get req.user
// router.get("/auth", validateToken, (req, res) => {
//   res.json(req.user);
// });

// API to get profile of a user
router.get("/profile", validateUserToken, (req, res) => {
  const bitsmail = req.user.id;
  db.query(
    "SELECT u.bitsmail, fName, lName, DOB, Address, phoneNumber FROM sacdb.users AS u LEFT JOIN sacdb.users_phone AS p on u.bitsmail=p.bitsmail WHERE u.bitsmail=?",
    [bitsmail],
    (err, result) => {
      if (err) {
        res.json({ error: err });
      } else {
        res.send(result);
      }
    }
  );
});

// API to get profile of an admin
router.get("/adminprofile", validateAdminToken, (req, res) => {
  const id = req.user.id;
  db.query(
    "SELECT a.id, fName, lName, DOB, Address, phoneNumber FROM sacdb.admins AS a LEFT JOIN sacdb.admin_phone AS p on a.id=p.id WHERE a.id=?",
    [id],
    (err, result) => {
      if (err) {
        res.json({ error: err });
      } else {
        res.send(result);
      }
    }
  );
});

// API to get data on admindash
router.get("/admindash", validateAdminToken, (req, res) => {
  try {
    const { room } = req.user;
    db.query(
      "SELECT bitsmail, fName, lName, CheckIn, r.Name, CASE WHEN TimeLimit = 0 THEN 0 ELSE SUBTIME(TimeLimit ,CAST((NOW()-CheckIn) AS TIME)) END AS TimeLeft FROM sacdb.users AS u LEFT JOIN sacdb.rooms AS r ON u.RoomID=r.RoomID WHERE r.Name=? AND CheckIn IS NOT NULL",
      [room],
      (err, result) => {
        if (err) {
          res.json({ error: err });
        } else {
          res.json(result);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// API to get student history data
router.get("/studenthistory", validateUserToken, (req, res) => {
  try {
    const bitsmail = req.user.id;
    // TODO Query to get data
    db.query("SELECT * FROM sacdb.users", [bitsmail], (err, result) => {
      if (err) {
        res.json({ error: "lummmmm ded" });
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// API to get admin history data
router.get("/adminhistory", validateAdminToken, (req, res) => {
  try {
    // TODO Query to get data
    db.query("SELECT * FROM sacdb.history", (err, result) => {
      if (err) {
        res.json({ error: "lummmmm ded" });
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// API to check-in a user
router.get("/checkin", validateAdminToken, (req, res) => {
  const { room } = req.user;
  const { bitsID } = req.body;
  try {
    db.query("", [bitsID, room], (err, result) => {
      // TODO
    });
  } catch (err) {
    console.log(err);
  }
});

// API to checkout a user
router.get("/checkout", validateAdminToken, (req, res) => {
  const { room } = req.user;
  const { bitsID } = req.body;
  try {
    db.query("", [bitsID, room], (err, result) => {
      // TODO
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
