describe('Example', () => {
  beforeEach(async () => {
    await device.launchApp({delete: true});
    // await device.reloadReactNative();
  });

  it('登陆流程没问题', async () => {
    await element(by.id('123email4')).replaceText('snakegear2@163.com');

    await element(by.id('123password4')).replaceText('metal_gear2');

    await element(by.id('MyUniqueId123')).tap();

    await expect(element(by.text('Edit profile'))).toBeVisible();
    await expect(element(by.id('123email4'))).toNotExist();
  });

  it('登陆密码错误，得告诉用户', async () => {
    await element(by.id('123email4')).replaceText('snakegea3r2@163.com');

    await element(by.id('123password4')).replaceText('meta2l_gear2');

    await element(by.id('MyUniqueId123')).tap();

    await expect(
      element(by.type('_UIAlertControllerActionView'))
    ).toBeVisible();

    await element(
      by.label('OK').and(by.type('_UIAlertControllerActionView'))
    ).tap();
  });

  it('不输入的时候不能登陆', async () => {
    await element(by.id('MyUniqueId123')).tap();

    await expect(
      element(by.type('_UIAlertControllerActionView'))
    ).toBeVisible();

    await element(
      by.label('OK').and(by.type('_UIAlertControllerActionView'))
    ).tap();
  });
});
