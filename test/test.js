const {getMangaList} = require("../dist/index");
getMangaList("Aarana").then(res => console.log(res.completed.length))