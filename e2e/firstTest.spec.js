describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await element(by.id('email')).typeText('snakegear2@163.com');
    await element(by.id('password')).typeText('metal_gear2');

    await element(by.id('MyUniqueId123')).tap();
    

    await expect(element(by.id('email'))).toNotExist();
  });
});
