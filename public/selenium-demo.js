import { Builder, By, Key, until } from 'selenium-webdriver'

const driver = new Builder()
.forBrowser('firefox')
.build();

const example = async () => {
    await driver.get('http://www.google.com/ncr')
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
    
    // Add console log before clicking on the Images link
    console.log("Before clicking on Images link");
    
    await driver.findElement(By.id('zV9nZe')).click()
    
    // Add console log after clicking on the Images link
    console.log("After clicking on Images link");
    
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000)
    await driver.quit()
}
example()
