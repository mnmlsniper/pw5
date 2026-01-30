import { expect } from '@playwright/test';
import { test } from '../src/helpers/fixtures/fixture';

import * as allure from "allure-js-commons";
import { App } from '../src/pages/app.page';
import { UserBuilder } from '../src/helpers/builders/index';

const url = 'https://realworld.qa.guru/';

test('Пользователь может зарегистрироваться используя email и пароль Page Object паттерны @fast', async ({ page }) => {
    console.log('Это пароль');
    console.log(process.env.telegramPassword);
    console.log('Это не пароль');
    console.log(process.env.telegramId);
    await allure.tms("TMS-456", "Related TMS issue");

    const user = new UserBuilder().withEmail().withName().withPassword().build();

    const {email, name, password} = user;
    const app = new App(page);

    await app.main.open(url);
    await app.main.gotoRegister();
    await app.register.register(name, email, password);

    await expect(app.home.getProfileNameLocator()).toContainText(user.name);

});

test('Фикстура 1', async ({ registredUser, app }) => {
    await allure.tms("TMS-456", "Related TMS issue");
    const { user } = registredUser;
    const {email, name, password} = user;

    await app.main.open(url);
    await app.main.gotoRegister();
    await app.register.register(name, email, password);

    await expect(app.home.getProfileNameLocator()).toContainText(user.name);

});
test('Фикстура 2', async ({ userProfilePage}) => {
    await allure.tms("TMS-456", "Related TMS issue");
    const { app } = userProfilePage;
    const { user } = userProfilePage;
// todo проверки профиля пользователя
    await expect(app.home.getProfileNameLocator()).toContainText(user.name);

});

test('Фикстура парамтеризированная', async ({ createWithRole}) => {
    await allure.tms("TMS-456", "Related TMS issue");
    const user = createWithRole('admin');
    console.log(user);
// todo проверки профиля пользователя
    await expect(user).toHaveProperty(user.name);

});
test('Фикстура парамтеризированная с дефолтным значением', async ({ createWithRole}) => {
    await allure.tms("TMS-456", "Related TMS issue");
    const user = createWithRole();
    console.log(user);
// todo проверки профиля пользователя
    await expect(user).toHaveProperty(user.name);

});
/*
admin/user
- билдер
- фикстура (2 штуки)
- создаем сразу всех пользователей)

- создать пользователя, сохранить токен и переиспользовать
*/