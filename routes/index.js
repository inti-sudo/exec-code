const express = require("express");
const router = express.Router();

const { getRoot } = require("../controllers/index");
const { executeCommand } = require("../controllers/commands");
const adminAuth = require("../middlewares/authCheck");

/**
 * @swagger
 * tags:
 *   name: Root
 *   description: the Root
 * /:
 *   get:
 *     summary: Return the Root Message
 *     tags: [Root]
 *     responses:
 *       200:
 *         description: Root Message
 */

router.get("/", getRoot)

/**
 * @swagger
 * tags:
 *   name: exec command
 *   description: exec command
 * /v1/exec:
 *   post:
 *     summary: exec command
 *     tags: [exec command]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - command
 *             properties:
 *               command:
 *                 type: string
 *                 format: string
 *                 description: base64
 *       200:
 *         description: successfully
 *       400:
 *         description: Bad Request - Missing or invalid input
 */

router.post("/v1/exec", adminAuth, executeCommand)

module.exports = router