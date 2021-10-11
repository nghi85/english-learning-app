### Install
Need Node.js and npm.
```
npm install
```

### Development
During development itself you only need to run 1 command, namely:
```
npm run dev
```

It will starts webpack-dev-server/browsersync and open a browser tab for you.
This will make sure that every time a Typescript file has changed, it wil update your project.

A webserver is also started on your local machine on port 3000. You can point your browser to http://localhost:3000, check out your game, and browsersync will refresh your browser every time a change has been made. To check out all the features of BrowserSync you can check out http://localhost:3001

### Production
For production builds there are two commands, one that compiles and minifies all the code and assets, and one for writing a version number.
```
npm run dist
```