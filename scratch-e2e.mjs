import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

const errors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (err) => errors.push(String(err)))

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'Open chat' }).click()
await page.waitForTimeout(300)

await page.getByPlaceholder('Type a message...').fill('How many Phoridae specimens in Costa Rica?')
await page.getByPlaceholder('Type a message...').press('Enter')

// The real Ollama call is slow on this machine (~2-3 min observed). Wait generously.
await page.waitForSelector('text=/specimens|Could not get/i', { timeout: 240000 })
await page.waitForTimeout(300)
await page.screenshot({ path: '/private/tmp/claude-501/-Users-hailee-zhang-Documents-BIOSCAN/b064632e-eaa7-4ce7-983a-132c959ea1ff/scratchpad/e2e-chat-result.png' })

console.log('CONSOLE_ERRORS:', JSON.stringify(errors))

await browser.close()
