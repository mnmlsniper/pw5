export class HomePage {
    // техническое описание страницы
    
    constructor (page) {
        this.page = page;
        //todo нейминг и селектор
        this.profileName = page.locator('.dropdown-toggle')
    }
    
    // бизнесовые действия со страницей

    getProfileNameLocator() {
        return this.profileName;
    }
}