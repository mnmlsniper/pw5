import { test, expect } from '@playwright/test';
import * as allure from "allure-js-commons";
import { App } from '../src/pages/app.page';
import { UserBuilder } from '../src/helpers/builders/index';

const url = 'https://realworld.qa.guru/';

test('Пользователь может зарегистрироваться используя email и пароль Page Object паттерны', async ({ page }) => {
    await allure.tms("TMS-456", "Related TMS issue");

    const user = new UserBuilder().withEmail().withName().withPassword().build();

    const {email, name, password} = user;
    const app = new App(page);

    await app.main.open(url);
    await app.main.gotoRegister();
    await app.register.register(name, email, password);

    await expect(app.home.getProfileNameLocator()).toContainText(user.name);

});