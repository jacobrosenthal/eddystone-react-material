# eddystone-react-material

A [react](https://github.com/facebook/react) [material-ui](https://github.com/callemall/material-ui) component to list, add, edit eddystone devices

To demo install dependencies with `npm i` then, as ble isnt available in browsers yet, start a websocket server with `npm run ws` Next start the webserver with `npm start` and load [http://127.0.0.1:9999/](http://127.0.0.1:9999/) in your browser.

To rebuild local changes `npm run dist`

Know issues:
* react is a peer dependency of material-ui meaning you have to bring it in in your project
* material-ui needs the the [http://material-ui.com/#/get-started/installation](react-tap-event-plugin)
* bleno/eddystone-beacon only currently support one active advertising instance at a time