'use strict';

import connection from '../connection/connect-tcp.js';

//Retrieve all CPU Data
export const allcpu = (req, res, next) => {
    const qcpu = "SELECT * FROM `cpudata`";
    connection.query(qcpu, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
}

//Retrieve CPU by ID
export const cpuid = (req, res) => {
  const qcpuid = "SELECT * FROM `cpudata` WHERE `id` = ?";
    connection.query(qcpuid, [req.params.id], (error, result) => {
      if (!result[0]) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result[0]);
      }
    });
}

//Retrieve CPU by Manufacturer
export const cpumanufacturer = (req, res) => {
  const qcpubrand = "SELECT * FROM `cpudata` WHERE `brand` = ?";
    connection.query(qcpubrand, [req.params.brand], (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
}

//Retrieve gamer certified CPU lul
export const gamerCPU = (req, res) => {
  const qcpugaming = "SELECT * FROM `cpudata` WHERE `is_gaming` = true";
    connection.query(qcpugaming, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
}

//Retrieve kuli certified CPU
export const kuliCPU = (req, res) => {
  const qcpunotgaming = "SELECT * FROM `cpudata` WHERE `is_gaming` = false";
  connection.query(qcpunotgaming, (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json(result);
    }
  });
}

//Retrieve entry level CPU
export const entryLevelCPU = (req, res) => {
  const qcpuentry = "SELECT * FROM `cpudata WHERE price BETWEEN 500000 AND 3000000";
  connection.query(qcpuentry, (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json(result);
    }
  });
}

//Retrieve midrange level CPU
export const midLevelCPU = (req, res) => {
  const qcpumid = "SELECT * FROM `cpudata WHERE price BETWEEN 3000000 AND 5000000";
  connection.query(qcpumid, (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json(result);
    }
  });
}

//Retrieve high-end level CPU
export const highEndCPU = (req, res) => {
  const qcpumid = "SELECT * FROM `cpudata WHERE price BETWEEN 5000000 AND 10000000";
  connection.query(qcpumid, (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json(result);
    }
  });
}

//Input CPU Data to CPU
export const inputCPU = (req, res) => {
  const data = {
    model: req.body.model,
    name: req.body.name,
    price_idr: req.body.price_idr,
    brand: req.body.brand,
    tdp: req.body.tdp,
    core_clock: req.body.core_clock,
    core_count: req.body.core_count,
    is_gaming: req.body.is_gaming,
    image_url: req.body.image_url,
    description: req.body.description,
  }

  const query = "INSERT INTO cpudata VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(query, Object.values(data), error => {
    if (error) {
      res.json({ status: "fail", reason: error.code});
    } else {
      res.json({ status: "success", data:data});
    }
  });
}

//Update CPU Data
export const updateCPU = (req, res) => {

}

//Delete CPU Data
export const deleteCPU = (req, res) => {

}