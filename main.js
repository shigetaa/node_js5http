const PORT = 3000;
const HTTP = require("http");
const APP = HTTP.createServer();

// 経路とレスポンスの対応
const ROUTER_RES = {
	"/": "<h1>Hello World</h1>",
	"/info": "<h1>Info Page</h1>",
	"/contact": "<h1>Contact Page</h1>",
};

// リクエストを監視する
APP.on("request", (req, res) => {
	if (ROUTER_RES[req.url]) {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		res.end(ROUTER_RES[req.url]);
	} else {
		res.writeHead(404, {
			"Content-Type": "text/html"
		});
		res.end("<h1>Not Found</h1>");
	}
});

// サーバーを起動
APP.listen(PORT);
console.log("server start http://localhost:%d/", PORT);