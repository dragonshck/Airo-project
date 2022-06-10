'use strict';

import connection from '../connection/connect-tcp.js';

//Retireve all Motherboard Data
export const allmobo = (req, res, next) => {
    const qmobo = "SELECT * FROM `mobodata`";
    connection.query(qmobo, (error, result) => {
        if (!result) {
            res.json({ status: "Not found!"});
          } else {
            res.json(result);
          }
    });
}

//Retrieve Motherboard by ID
export const moboid = (req, res) => {
    const qmoboid = "SELECT * FROM `mobodata` WHERE `id` = ? ";
    connection.query(qmoboid, (err, result) => {
        if (!result[0]) {
            res.json({ status: "Not found!"});
          } else {
            res.json(result[0]);
          }
    })
}

//Retrieve Motherboard by Manufacturer
export const mobomanufacturer = (req, res) => {
    const qmobobrand = "SELECT * FROM `mobodata` WHERE `brand` = ?";
      connection.query(qmobobrand, [req.params.brand], (error, result) => {
        if (!result) {
          res.json({ status: "Not found!"});
        } else {
          res.json(result);
        }
      });
  }
  
  //Retrieve gamer certified Motherboard lul
  export const gamerMotherboard = (req, res) => {
    const qmobogaming = "SELECT * FROM `mobodata` WHERE `is_gaming` = true";
      connection.query(qmobogaming, (error, result) => {
        if (!result) {
          res.json({ status: "Not found!"});
        } else {
          res.json(result);
        }
      });
  }
  
  //Retrieve kuli certified Motherboard
  export const kuliMotherboard = (req, res) => {
    const qmobonotgaming = "SELECT * FROM `mobodata` WHERE `is_gaming` = false";
    connection.query(qmobonotgaming, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
  }
  
  //Retrieve entry level Motherboard
  export const entryLevelMotherboard = (req, res) => {
    const qmoboentry = "SELECT * FROM `mobodata` WHERE price BETWEEN 500000 AND 3000000";
    connection.query(qmoboentry, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
  }
  
  //Retrieve midrange level Motherboard
  export const midLevelMotherboard = (req, res) => {
    const qrammid = "SELECT * FROM `mobodata` WHERE price BETWEEN 3000000 AND 5000000";
    connection.query(qrammid, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
  }
  
  //Retrieve high-end level Motherboard
  export const highEndMotherboard = (req, res) => {
    const qrammid = "SELECT * FROM `mobodata` WHERE price BETWEEN 5000000 AND 10000000";
    connection.query(qrammid, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
  }
  
  //Input Motherboard Data to DB
  export const inputMotherboard = (req, res) => {
    const data = {
      model: req.body.model,
      name: req.body.name,
      price_idr: req.body.price_idr,
      brand: req.body.brand,
      color: req.body.color,
      modules: req.body.modules,
      speed: req.body.speed,
      is_gaming: req.body.is_gaming,
      image_url: req.body.image_url,
      description: req.body.description,
    }
  
    const query = "INSERT INTO `mobodata` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(query, Object.values(data), error => {
      if (error) {
        res.json({ status: "fail", reason: error.code});
      } else {
        res.json({ status: "success", data:data});
      }
    });
  }

  //Update Motherboard Data
export const updateMotherboard = (req, res) => {
  
}

//Delete Motherboard Data
export const deleteMotherboard = (req, res) => {

}