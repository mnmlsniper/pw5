export class MainPage {
// техническое описание страницы

    constructor (page) {
        this.page = page;
        this.signupLink = page.getByRole('link', { name: 'Sign up' }).describe('Кнопка//cсылка зарегистрироваться');
    }
// бизнесовые действия со страницей

async gotoRegister() {
    this.signupLink.click();
}

async open(url) {
    await this.page.goto(url);
}
}

