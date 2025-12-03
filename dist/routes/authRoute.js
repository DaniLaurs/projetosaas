"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const router = (0, express_1.Router)();
router.post("/sign-up", authControllers_1.authController.signUp);
router.post("/sign-in", authControllers_1.authController.signIn);
exports.default = router;
