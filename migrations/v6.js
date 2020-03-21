const fs = require('fs')
const DiscordRSS = require('discord.rss')
const config = require('../settings/config.json')

// This will potentially throw
DiscordRSS.validateConfig(config)

const v6 = DiscordRSS.migrations.v6

v6(config)
  .then((failures) => {
    console.log('Finished v6 migration')
    if (failures.length === 0) {
      return
    }
    for (const item of failures) {
      console.log(item.error)
      console.log(JSON.stringify(item.data, null, 2))
    }
    fs.writeFileSync(`./migrations/failures.log`, JSON.stringify(failures, null, 2))
    console.error('\n\n\x1b[31mThere were some migration failures. See output above, or failures.log in the migrations directory. ')
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })


