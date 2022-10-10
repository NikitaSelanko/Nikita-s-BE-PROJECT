const db = require("../db/connection");

exports.selectCategories = () => {
    return db.query("SELECT * FROM categories;").then((data)=>{
        console.log(data.rows)
        return data.rows;
    })
}