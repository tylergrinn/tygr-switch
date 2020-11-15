# Forking this repository

**These instructions and the setup script are written for the respository 'tylergrinn/tygr-logo' and won't work for any forked repositories.**

In other words, don't _fork a fork_ of this repository and expect the setup script or deployment to work.

1. `bash setup.sh`

2. `npm i`

3. `npm start`

4. Navigate to [localhost:8080/demo](http://localhost:8080/demo)

# Deployment

Deployment is triggered by pushing a new git tag. Each tag requires the `"version"` field in the `package.json` file to be unique. I recommend keeping the tag and version in sync and using [semver](https://semver.org/) conventions.

## Travis CI

These instructions are for Ubuntu. If on windows, you must use [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) in order for the travis cli to work.

1. Setup a [travis-ci.com](https://travis-ci.com) account

2. Install the travis cli

   ```
   apt install ruby ruby-dev
   gem install travis
   ```

3. Setup npm

   The setup command will overwrite the `.travis.yml` file. Make a backup before continuing.

   `travis setup npm --com --force`

   Open the resulting `travis.yml` file and copy `secure` key:

   ```yml
   api_token:
     secure: blahblahblahblahblahblahblahblah
   ```

   Replace the `secure` key in the backup of `.travis.yml` you made and discard the generated file and rename the backup to `.travis.yml`. Lastly, update the email address just above the `api_token`

   Build and deploy the package locally the first time:

   ```
   npm build
   npm publish
   ```

4. Deploy via ssh

   If you want to upload the built files to a server via rsync, you can do that here. Otherwise, remove entirely the `addons` and `before_deploy` top level keys in the `.travis.yml`. Also remove the second item in the `deploy` array.

   Create a ssh key named deploy_rsa with an empty passphrase:\
   `ssh-keygen -f deploy_rsa -N ''`

   Let travis encrypt the file, don't overwrite `.travis.yml` if asked to do so.\
   `travis encrypt-file --com deploy_rsa | grep "openssl.*" | cut -d" " -f3-6 `

   Replace the `-K $encrypted_db2095f63ba3_key` and `-iv $encrypted_db2095f63ba3_iv` in the `before_deploy` section of the `.travis.yml` with the output from the previous command.

   In the `.travis.yml` file, update the `ssh_known_hosts` near the top and the `script` on the last line to push the generated `lib` directory wherever you want.

   Append the `deploy_rsa.pub` key to the authorized_keys file on the server you are pushing to.

   ## IMPORTANT

   Remove the `deploy_rsa` and `deploy_rsa.pub` files, or add them to the gitignore. Never publish them in your repository, even if it is private.

   If you serve the resulting files from a static file server like nginx or apache, it will mirror [unpkg](https://unpkg.com/@tygr/logo@1.1.2/lib/demo/index.html) and allow your component to be downloaded by other web pages. See [tygr.info/download/@tygr/logo/lib/demo](https://tygr.info/download/@tygr/logo/lib/demo)
