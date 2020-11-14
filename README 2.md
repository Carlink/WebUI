# webui

## Project setup

DO NOT USE YARN.

ONLY USE NPM 6 OR GREATER.

Note that the below commands assume a local install of all
packages. In other words, the npm install does not include -g.
Hence, the reference to ./node_modules/.bin/... in the
package.json file.

There is a dev@activeprime.com email address we use for dev and some testing. This is a
google GSuite account. You will see reference to this in the front-end and back-end code.

To obtain the credentials for this login, contact Clint Bidlack.

```
#
# Ensure you have node.js 8.9 or higher
#
$ node --version
v10.14.0

#
# cd to the cleandata/webui repo folder
#
$ pwd
/blahblahblah/mygitrepofolder/cleandata

$ cd webui

#
# For security reasons, make sure you have npm >= 6
#
$ npm --version
6.14.4

#
# Install all required packages using npm. This will read
# the package.json file to determine what to install.
#
# For production the following packages are installed:
# vue, vuex, vue-router, axios, vuetify, vue-axios, core-js.
#
# More packages are installed for dev. See package.json for
# details.
#
$ npm install
```

package.json has four scripts: lint, serve, build

```
#
# To run lint, auto-fixing issues with js ane vue files;
#
$ npm run lint
```

You should see something like this (notice there are no lint
errors; lets keep it that way;).

```

> cleandata-webui@0.1.0 lint cleandata/webui
> vue-cli-service lint

 DONE  No lint errors found!

```

Run the cleandata/webui server (vue app)

```
$ npm run serve
```

You should see something like this

```

> cleandata-webui@0.1.0 serve cleandata/webui
> vue-cli-service serve

 INFO  Starting development server...
98% after emitting CopyPlugin
 DONE  Compiled successfully in 13180ms                                                                  3:48:32 PM


  App running at:
  - Local:   http://localhost:8080/
  - Network: http://localhost:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```

If you have the cleandata/server flask webapp running, which
defaults to http://localhost:5001, when you visit
http://localhost:8080/ you will get redirected to the cleandata
signin URL http://localhost:8080/auth/sign_in.
