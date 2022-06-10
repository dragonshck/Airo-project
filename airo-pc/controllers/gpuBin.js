'use strict';

import connection from '../connection/connect-tcp.js';

//Retrieve all GPU Data
export const allgpu = (req, res, next) => {
    const qgpu = "SELECT * FROM `gpudata`";
    connection.query(qgpu, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
}

//Retrieve GPU by ID
export const gpuid = (req, res) => {
  const qgpuid = "SELECT * FROM `gpudata` WHERE `id` = ?";
    connection.query(qgpuid, [req.params.id], (error, result) => {
      if (!result[0]) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result[0]);
      }
    });
}

//Retrieve GPU by Manufacturer
export const gpumanufacturer = (req, res) => {
  const qgpubrand = "SELECT * FROM `gpudata` WHERE `brand` = ?";
    connection.query(qgpubrand, [req.params.brand], (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
}

//Retrieve gamer certified GPU lul
export const gamerGPU = (req, res) => {
  const qgpugaming = "SELECT * FROM `gpudata` WHERE `is_gaming` = true";
    connection.query(qgpugaming, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
}

//Retrieve kuli certified GPU
export const kuliGPU = (req, res) => {
  const qgpunotgaming = "SELECT * FROM `gpudata` WHERE `is_gaming` = false";
  connection.query(qgpunotgaming, (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json(result);
    }
  });
}

//Retrieve entry level GPU
export const entryLevelGPU = (req, res) => {
  const qgpuentry = "SELECT * FROM `gpudata WHERE price BETWEEN 500000 AND 3000000";
  connection.query(qgpuentry, (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json(result);
    }
  });
}

//Retrieve midrange level GPU
export const midLevelGPU = (req, res) => {
  const qgpumid = "SELECT * FROM `gpudata WHERE price BETWEEN 3000000 AND 5000000";
  connection.query(qgpumid, (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json(result);
    }
  });
}

//Retrieve high-end level GPU
export const highEndGPU = (req, res) => {
  const qgpumid = "SELECT * FROM `gpudata WHERE price BETWEEN 5000000 AND 10000000";
  connection.query(qgpumid, (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json(result);
    }
  });
}

//Input GPU Data to DB
export const inputGPU = (req, res) => {
  const data = {
    model: req.body.model,
    name: req.body.name,
    price_idr: req.body.price_idr,
    brand: req.body.brand,
    chipset: req.body.chipset,
    manufacturer: req.body.manufacturer,
    memory: req.body.memory,
    is_gaming: req.body.is_gaming,
    image_url: req.body.image_url,
    description: req.body.description,
  }

  const query = "INSERT INTO gpudata VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(query, Object.values(data), error => {
    if (error) {
      res.json({ status: "fail", reason: error.code});
    } else {
      res.json({ status: "success", data:data});
    }
  });
}

//Update GPU Data
export const updateGPU = (req, res) => {
  
}

//Delete GPU Data
export const deleteGPU = (req, res) => {

}