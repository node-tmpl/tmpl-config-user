const {checkDir, confPath} = require('@jigsaw/tmpl/src/utils.js')
const {prompt} = require('inquirer')
const {writeFileSync} = require('fs')

module.exports = () => new Promise((resolve, reject) => {
  checkDir()
  const conf = require(confPath)
  if (conf.config.user === undefined) {
    prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Name'
      }, {
        type: 'input',
        name: 'fullName',
        message: 'Full Name'
      }, {
        type: 'input',
        name: 'githubID',
        message: 'GitHub ID'
      }, {
        type: 'input',
        name: 'homePage',
        message: 'Home Page'
      }
    ]).then(answers => {
      conf.config.user = answers
      writeFileSync(confPath, JSON.stringify(conf))
      resolve(answers)
    })
  } else {
    resolve(conf.config.user)
  }
})
