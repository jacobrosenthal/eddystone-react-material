eddystone-react-material
========================
A [react](https://github.com/facebook/react) [material-ui](https://github.com/callemall/material-ui) component to list, add, edit eddystone devices

To demo install dependencies with `npm i` then, as ble isnt available in browsers yet, start a websocket server with `npm run ws` Next start the webserer with `npm start` and load [http://127.0.0.1:9999/](http://127.0.0.1:9999/) in your browser.

To rebuild local changes `npm run dist`

Know issues:
* material-ui requires requires react to have the react-tap-event-plugin
* material-ui has known issues with "owner-based and parent-based contexts" callemall/material-ui#686
facebook/react#1939 which means I dont currently know how to utilize this library as a depenendany without copying it into your project
* bleno/eddystone-beacon dont currently support multiple beacons on at the same time