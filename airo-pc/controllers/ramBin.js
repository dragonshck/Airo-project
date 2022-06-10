'use strict';

import connection from '../connection/connect-tcp.js';

//Retireve all RAM Data
export const allram = (req, res, next) => {
    const qram = "SELECT * FROM `ramdata`";
    connection.query(qram, (error, result) => {
        if (!result) {
            res.json({ status: "Not found!"});
          } else {
            res.json(result);
          }
    });
}

//Retrieve RAM by ID
export const ramid = (req, res) => {
    const qramid = "SELECT * FROM `ramdata` WHERE `id` = ? ";
    connection.query(qramid, (err, result) => {
        if (!result[0]) {
            res.json({ status: "Not found!"});
          } else {
            res.json(result[0]);
          }
    })
}

//Retrieve RAM by Manufacturer
export const rammanufacturer = (req, res) => {
    const qrambrand = "SELECT * FROM `ramdata` WHERE `brand` = ?";
      connection.query(qrambrand, [req.params.brand], (error, result) => {
        if (!result) {
          res.json({ status: "Not found!"});
        } else {
          res.json(result);
        }
      });
  }
  
  //Retrieve gamer certified RAM lul
  export const gamerRAM = (req, res) => {
    const qramgaming = "SELECT * FROM `ramdata` WHERE `is_gaming` = true";
      connection.query(qramgaming, (error, result) => {
        if (!result) {
          res.json({ status: "Not found!"});
        } else {
          res.json(result);
        }
      });
  }
  
  //Retrieve kuli certified RAM
  export const kuliRAM = (req, res) => {
    const qgpunotgaming = "SELECT * FROM `ramdata` WHERE `is_gaming` = false";
    connection.query(qgpunotgaming, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
  }
  
  //Retrieve entry level RAM
  export const entryLevelRAM = (req, res) => {
    const qramentry = "SELECT * FROM `ramdata` WHERE price BETWEEN 500000 AND 3000000";
    connection.query(qramentry, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
  }
  
  //Retrieve midrange level RAM
  export const midLevelRAM = (req, res) => {
    const qrammid = "SELECT * FROM `ramdata` WHERE price BETWEEN 3000000 AND 5000000";
    connection.query(qrammid, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
  }
  
  //Retrieve high-end level RAM
  export const highEndRAM = (req, res) => {
    const qrammid = "SELECT * FROM `ramdata` WHERE price BETWEEN 5000000 AND 10000000";
    connection.query(qrammid, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
  }
  
  //Input RAM Data to DB
  export const inputRAM = (req, res) => {
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
  
    const query = "INSERT INTO `ramdata` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(query, Object.values(data), error => {
      if (error) {
        res.json({ status: "fail", reason: error.code});
      } else {
        res.json({ status: "success", data:data});
      }
    });
  }

  //Update RAM Data
export const updateRAM = (req, res) => {
  
}

//Delete RAM Data
export const deleteRAM = (req, res) => {

}