require("dotenv").config();

const pool = require("../components/db");
const bcrypt = require("bcrypt");
const { authenticateToken } = require("../components/auth");

const tableName = "USERS";

//routes
const insertRoutes = ["/users/:id"];
const selectRoutes = ["/users/:id"];
const updateRoutes = ["/users/:id"];
const deleteRoutes = ["/users/:id"];

const users = (app) => {
	//insert a user
	app.post(insertRoutes, authenticateToken, async (req, res) => {
		if (req.id != req.params.id) return res.status(403).json({ msg: "error" });
		try {
			let sql = "INSERT INTO " + tableName + " ("
			let sqlValues = "VALUES ("
			let param = 1;
			let sqlData = [];

			if (req.body.password != null) {
				const hashedPassword = await bcrypt.hash(req.body.password, 10);
				req.body.password = hashedPassword;
			}
			let json = req.body;
			for (key in json) {
				sql += key.toUpperCase() + ", ";
				sqlValues += '$' + param++ + ", ";
				sqlData.push(json[key])
			}
			sql = sql.substring(0, sql.length - 2) + ") ";
			sqlValues = sqlValues.substring(0, sqlValues.length - 2) + ") ";
			sql += sqlValues;
			sql += "RETURNING *"

			console.log(sql, sqlData);
			const newuser = await pool.query(sql, sqlData);
			res.json(newuser.rows);
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.json(error.message);
		}
	});

	//get users
	app.get(selectRoutes, authenticateToken, async (req, res) => {
		if (req.id != req.params.id) return res.status(403).json({ msg: "error" });
		try {
			let sql = "SELECT * FROM " + tableName + " ";
			let sqlData = [];
			let param = 1;

			const json = req.query;
			if (Object.keys(json) != 0) {
				let whereClause = "WHERE ";
				for (key in json) {
					if (!json[key] || key == "password") continue;
					whereClause += key.toUpperCase() + " = $" + param++ + " AND ";
					sqlData.push(json[key]);
				}
				whereClause = whereClause.substring(0, whereClause.length - 5);
				sql += whereClause;
			}

			console.log(sql, sqlData);
			const users = await pool.query(sql, sqlData);

			res.json(users.rows[0]);
		} catch (error) {
			console.log("Route not correctly formatted");
			res.json(error.message);
		}
	});


	//update a user
	app.put(updateRoutes, authenticateToken, async (req, res) => {
		if (req.id != req.params.id) return res.status(403).json({ msg: "error" });
		try {
			let sql = "UPDATE " + tableName + " SET ";
			let sqlData = [];
			let param = 1;

			if (req.body.password != null) {
				const hashedPassword = await bcrypt.hash(req.body.password, 10);
				req.body.password = hashedPassword;
			}
			let json = req.body;
			for (key in json) {
				sql += key.toUpperCase() + " = $" + param++ + ", ";
				sqlData.push(json[key])
			}
			sql = sql.substring(0, sql.length - 2) + " ";

			json = req.query;
			if (Object.keys(json) != 0) {
				let whereClause = "WHERE ";
				for (key in json) {
					if (json[key] == null || key == "password") continue;
					whereClause += key.toUpperCase() + " = $" + param++ + " AND ";
					sqlData.push(json[key]);
				}
				whereClause = whereClause.substring(0, whereClause.length - 5);
				sql += whereClause;
			}

			console.log(sql, sqlData);
			const update = await pool.query(sql, sqlData);
			res.json(update);
		} catch (error) {
			console.log("Route/JSON Data not correctly formatted");
			res.json(error.message);
		}
	});

	//delete a user
	app.delete(deleteRoutes, authenticateToken, async (req, res) => {
		if (req.id != req.params.id) return res.status(403).json({ msg: "error" });
		try {
			let sql = "DELETE FROM " + tableName + " ";
			let sqlData = [];
			let param = 1;

			let json = req.body;
			let whereClause = "WHERE ";
			if (Object.keys(json) != 0) {
				for (key in json) {
					if (json[key] == null || key == "password") continue;
					whereClause += key.toUpperCase() + " = $" + param++ + " AND ";
					sqlData.push(json[key]);
				}
				whereClause = whereClause.substring(0, whereClause.length - 5);
				sql += whereClause;
			}

			console.log(sql, sqlData);
			const deleteuser = await pool.query(sql, sqlData);
			res.json(deleteuser);
		} catch (error) {
			console.log("Route not correctly formatted");
			res.json(error.message);
		}
	});
}

module.exports = users;