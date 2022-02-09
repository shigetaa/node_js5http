const PORT = 3000;
const HTTP = require("http");
const APP = HTTP.createServer();

// リクエストを監視する
APP.on("request", (req, res) => {
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	let responseMessage = "<h1>Hello World</h1>";
	res.end(responseMessage);
	// リクエスト情報を確認
	console.log(req.method);
	console.log(req.url);
	console.log(req.headers);
});

// サーバーを起動
APP.listen(PORT);
console.log("server start http://localhost:%d/", PORT);