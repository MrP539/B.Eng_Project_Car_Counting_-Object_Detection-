## react_server

The *config* folder contains a file named *db.js*. Before running locally, change the value of `db` as seen in the code below. *Make sure MongoDB service is running.*
```js
module.exports = {
  db: 'mongodb://localhost/mern-crud'
};
```

# Back-end
Install the dependencies via the terminal.

```bash
cd react_server
npm install
```

Run the *main server*.
```bash
node server
```

View [http://localhost:3000](http://localhost:3000) on the browser.

# Front-end
If you want to modify the front-end, go to *react-src* folder via the terminal.

```bash
cd react_server
cd react-src
```

Install the dependencies required by React.
```bash
npm install
```

Run the *development server* for React.
```bash
npm start
```

View [http://localhost:4200](http://localhost:4200) on the browser.



