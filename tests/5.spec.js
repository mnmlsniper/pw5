import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {HomePage} from '../src/pages/home.page';
import {MainPage} from '../src/pages/main.page';
import {RegisterPage} from '../src/pages/register.page';

const user = {
    email: faker.internet.email({provider: 'qa.guru' }),
    name: faker.person.fullName(), // 'Allen Brown'
    password: faker.internet.password({ length: 10 }),
    method() {}
}

const url = 'https://realworld.qa.guru/';

test('Пользователь может зарегистрироваться используя email и пароль Page Object', async ({ page }) => {
    const {email, name, password} = user;

    const homePage = new HomePage(page);
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    
    await mainPage.open(url);
    await mainPage.gotoRegister();
    await registerPage.register(name, email, password);
    
    // ========== ВАРИАНТ 1: Прямой доступ к locator ==========
    // ⚠️ ИСПОЛЬЗУЕМ ПОКА ТОЛЬКО ДЛЯ ТРЕНИРОВКИ - чтобы понять как работает auto-waiting
    // ❌ НАРУШАЕТ ИНКАПСУЛЯЦИЮ - тест напрямую обращается к внутреннему свойству profileName
    // ✅ Имеет auto-waiting (Playwright автоматически ждет элемент и текст)
    // ✅ Работает, но не рекомендуется в Page Object паттерне
    // Как работает:
    // 1. homePage.profileName - это page.locator('.dropdown-toggle') из конструктора
    // 2. expect() с locator автоматически ждет, пока элемент станет видимым и стабильным
    // 3. toContainText() проверяет, что текст элемента содержит user.name
    await expect(homePage.profileName).toContainText(user.name);
    
    // ========== ВАРИАНТ 2: Через метод getProfileNameLocator() ==========
    // ✅ СОБЛЮДАЕТ ИНКАПСУЛЯЦИЮ - тест использует публичный метод, не знает о селекторе
    // ✅ Имеет auto-waiting (Playwright автоматически ждет элемент и текст)
    // ✅ Рекомендуемый подход в Page Object паттерне
    // Как работает:
    // 1. getProfileNameLocator() возвращает this.profileName (инкапсулирует селектор)
    // 2. expect() с locator автоматически ждет, пока элемент станет видимым и стабильным
    // 3. toContainText() проверяет, что текст элемента содержит user.name
    // Преимущества:
    // - Если селектор изменится, нужно править только в одном месте (в Page Object)
    // - Тест не зависит от внутренней реализации (селектор скрыт)
    await expect(homePage.getProfileNameLocator()).toContainText(user.name);

});
