/**
 * quick commands test
 * need TEST_HOST TEST_PASS TEST_USER env set
 */

const { _electron: electron } = require('playwright')
const {
  test: it
} = require('@playwright/test')
const { describe } = it
it.setTimeout(100000)
const { expect } = require('chai')
const delay = require('./common/wait')
const log = require('./common/log')
const appOptions = require('./common/app-options')
const extendClient = require('./common/client-extend')

describe('quick commands', function () {
  it('quick commands form', async function () {
    const electronApp = await electron.launch(appOptions)
    const client = await electronApp.firstWindow()
    extendClient(client, electronApp)
    log('open setting')
    await delay(2000)
    await client.click('.btns .anticon-setting')
    await delay(1500)
    log('click quick commands')
    await client.click('.setting-tabs [role="tab"]', 4)
    // await client.click('.setting-tabs [role="tab"]', 4)
    await client.setValue(
      '.setting-tabs-quick-commands input#name',
      'ls'
    )
    await client.setValue(
      '.setting-tabs-quick-commands textarea.ant-input',
      'ls'
    )
    const qmlist1 = await client.countElem('.setting-tabs-quick-commands .item-list-unit')
    await delay(150)
    await client.click('.setting-tabs-quick-commands .ant-btn-ghost')
    await delay(2550)
    const qmlist2 = await client.countElem('.setting-tabs-quick-commands .item-list-unit')
    expect(qmlist2).equal(qmlist1 + 1)
    await electronApp.close().catch(console.log)
  })
})
