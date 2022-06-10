'use strict';

import pool from '../connection/connect-tcp.js';

//Retrieve all article Data
export const allarticle = async (req, res) => {
    const qarticle = "SELECT * FROM `article`";
    pool.query(qarticle, (error, result) => {
      if (!result) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result);
      }
    });
}

//Retrieve article by ID
export const articleid = async (req, res) => {
  const qarticleid = "SELECT * FROM `article` WHERE `article_id` = ?";
    pool.query(qarticleid, [req.params.article_id], (error, result) => {
      if (!result[0]) {
        res.json({ status: "Not found!"});
      } else {
        res.json(result[0]);
      }
    });
}

//Input CPU Data to CPU
export const inputArticle = (req, res) => {
    const data = {
      article_id: req.body.article_id,
      image_url: req.body.image_url,
      title: req.body.title,
      content: req.body.content,
      article_url: req.body.article_url
    }
  
    const query = "INSERT INTO `article` VALUES (?, ?, ?, ?, ?)";
    pool.query(query, Object.values(data), error => {
      if (error) {
        res.json({ status: "fail", reason: error.code});
      } else {
        res.json({ status: "success", data:data});
      }
    });
  }