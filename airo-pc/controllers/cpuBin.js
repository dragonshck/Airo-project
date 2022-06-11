'use strict';

import pool from '../connection/connect-tcp.js';

//Retrieve all Product Data
export const allcpu = async (req, res) => {
    const qcpu = "SELECT * FROM `cpudata`";
    pool.query(qcpu, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
}

//Retrieve Product by ID
export const cpuid = async (req, res) => {
  const qcpuid = "SELECT * FROM `cpudata` WHERE `id` = ?";
    pool.query(qcpuid, [req.params.id], (error, result) => {
      if (!result[0]) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result[0]);
      }
    });
}

//Retrieve Product by Manufacturer
export const cpumanufacturer = (req, res) => {
  const qcpubrand = "SELECT * FROM `cpudata` WHERE `brand` = ?";
    pool.query(qcpubrand, [req.params.brand], (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
}

//Retrieve Product by Type/Model
export const getProductByType = (req, res) => {
  const qproductmodel = "SELECT * FROM `cpudata` WHERE `model` = ?";
  pool.query(qproductmodel, [req.params.model], (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json(result);
    }
  });
}

//Retrieve gamer certified Product lul
export const gamerCPU = (req, res) => {
  const qcpugaming = "SELECT * FROM `cpudata` WHERE `is_gaming` = true";
    pool.query(qcpugaming, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
}

//Retrieve kuli certified Product
export const kuliCPU = (req, res) => {
  const qcpunotgaming = "SELECT * FROM `cpudata` WHERE `is_gaming` = false";
  pool.query(qcpunotgaming, (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json(result);
    }
  });
}

//Retrieve entry level Product
export const entryLevelCPU = (req, res) => {
  const qcpuentry = "SELECT * FROM `cpudata` WHERE price BETWEEN 500000 AND 3000000";
  pool.query(qcpuentry, (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json(result);
    }
  });
}

//Retrieve midrange level Product
export const midLevelCPU = (req, res) => {
  const qcpumid = "SELECT * FROM `cpudata` WHERE price BETWEEN 3000000 AND 5000000";
  pool.query(qcpumid, (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json(result);
    }
  });
}

//Retrieve high-end level Product
export const highEndCPU = (req, res) => {
  const qcpumid = "SELECT * FROM `cpudata` WHERE price BETWEEN 5000000 AND 10000000";
  pool.query(qcpumid, (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json(result);
    }
  });
}

//Input Product Data to Database
export const inputCPU = (req, res) => {
  const data = {
    id: req.body.id,
    model: req.body.model,
    name: req.body.name,
    price_idr: req.body.price_idr,
    brand: req.body.brand,
    is_gaming: req.body.is_gaming,
    image_url: req.body.image_url,
    description: req.body.description,
  }

  const query = "INSERT INTO `cpudata` VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  pool.query(query, Object.values(data), error => {
    if (error) {
      res.json({ status: "fail", reason: error.code});
    } else {
      res.json({ status: "success", data:data});
    }
  });
}

//Update Product Data
export const updateCPU = (req, res) => {
  const data = [req.body.model, req.body.name, req.body.price_idr, req.body.brand, req.body.is_gaming, req.body.image_url, req.body.description, req.params.id] 
  //let qcpuupdate = "UPDATE cpudata SET model = ?, name = ? ,price_idr = ? ,brand= ?,is_gaming = ? ,image_url = ?, description = ? WHERE id = ?";
  pool.query("UPDATE cpudata SET model = ?, name = ? ,price_idr = ? ,brand= ?,is_gaming = ? ,image_url = ?, description = ? WHERE id = ?", data, (err, result) => {
    if (err) {
      res.send('Error')
    } else {
      res.send(result);
    }
  });
}

//Delete Product Data
export const deleteCPU = (req, res) => {
  const qcpudelete = "DELETE FROM `cpudata` WHERE `id` = ?";
  pool.query(qcpudelete, [req.params.id], (error, result) => {
    if (!result) {
      res.json({ status: "Not found!"});
    } else {
      res.json({status: "Data Deleted",result});
    }
  });
}