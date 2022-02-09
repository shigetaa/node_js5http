# Node.js で Webサーバーを作る
Webアプリケーションの土台となるWebサーバーを作成していきます。

## アプリケーションを npm で初期化する
Node.jsでWebアプリケーションを作るには、まずは、プロジェクトフォルダを作成して`package.json`を作成する必要がありますので、
以下のコマンドを実行して`package.json`のひな形を作成します。
```bash
npm init
```
コマンドを実行すると、プロント上に色々聞かれますがここではデフォルト設定でいいのでプロントが終わるまで「Enter」を押してみます。

## 簡単なHTTPサーバーを作成する
Node.js では簡単にHTTPサーバーを作成する事ができます。
ここでは、`main.js`と言う名前でファイルを作成し以下の様に記述します。

```javascript
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
});

// サーバーを起動
APP.listen(PORT);
console.log("server start http://localhost:%d/", PORT);
```

以下のコマンドを実行してみます。
```bash
node main.js
```
```bash
server start http://localhost:3000/
```
Webブラウザーで`http://localhost:3000/`にアクセスしてみて**Hello World**が表示されると思います。

## リクエストのデータを分析する
アプリケーションがリクエストを出したクライアントに、どう対応するのか経路を決めるのが「ルーティング」です。
経路には、`request` オブジェクトにあるURLとの一致を条件とするものがあります。
それぞれの `request` オブジェクトに `url` プロパティがあります。
どのURLをクライアントがリクエストしているのかは、 `req.url` を見るとわかります。
他にも、リクエストのHTTPメソッドは `req.method`
リクエストのヘッダを見るには `req.headers` などで見ることができます。

先ほどの作成した`main.js`に以下のコードを追記してみます。

```javascript
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
```
以下のコマンドを実行してみます。
```bash
node main.js
```
```bash
server start http://localhost:3000/
```
Webブラウザーで`http://localhost:3000/`にアクセスしてみてコンソールに以下の様にリクエスト情報が表示されます。

```bash
GET
/
{
  host: 'localhost:3000',
  connection: 'keep-alive',
  'cache-control': 'max-age=0',
  'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Microsoft Edge";v="98"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36 Edg/98.0.1108.43',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'sec-fetch-site': 'none',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-user': '?1',
  'sec-fetch-dest': 'document',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'ja,en;q=0.9,en-GB;q=0.8,en-US;q=0.7'
}
GET
/favicon.ico
{
  host: 'localhost:3000',
  connection: 'keep-alive',
  'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Microsoft Edge";v="98"',
  'sec-ch-ua-mobile': '?0',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36 Edg/98.0.1108.43',
  'sec-ch-ua-platform': '"Windows"',
  accept: 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-mode': 'no-cors',
  'sec-fetch-dest': 'image',
  referer: 'http://localhost:3000/',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'ja,en;q=0.9,en-GB;q=0.8,en-US;q=0.7'
}
```

## Webアプリケーションンに経路を加える
「経路」は、ある特定のURLへのリクエストに対し、アプリケーションがどうレスポンスすべきかを決める方法の一つです。
それぞれの、HTTPリクエストを評価して、適切なレスポンスを返す処理を`main.js`に追記して見ます。

```javascript
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
```
以下のコマンドを実行してみます。
```bash
node main.js
```
```bash
server start http://localhost:3000/
```
Webブラウザーで`http://localhost:3000/`にアクセスしてみて**Hello World**が表示されると思います。
他のページも確認して無事にプログラムで指定した、レスポンスが返されているか確認してみてください。