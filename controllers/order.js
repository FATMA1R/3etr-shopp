const Order = require("../models/Order");
const express=require("express");
const addRouter=express.Router();
const bcrypt = require("bcrypt");

const jwt=require("jsonwebtoken");


// get order

  