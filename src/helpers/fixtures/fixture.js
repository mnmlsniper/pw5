import { test as base } from '@playwright/test';
import { App } from '../../pages/app.page';
import { UserBuilder } from '../builders/index';


export const test = base.extend({

   // Архитектурный слой
    app: async ({page}, use) => {

        const app = new App(page);
        await use (app);

     },

     // СЛой для работы с данными
     //todo можно ли избавится от page
     registredUser : 
     async ({page}, use) => {
        const user = new UserBuilder().withEmail().withName().withPassword().build();
        await use ({page, user});

     },
     userProfilePage :  async ({page}, use) => {      
      const user = new UserBuilder().withEmail().withName().withPassword().build();
      const {email, name, password} = user;
      const app = new App(page);
      await app.main.open('https://realworld.qa.guru/');
      await app.main.gotoRegister();
      await app.register.register(name, email, password);
      //todo
      await app.main.open(`https://realworld.qa.guru/#/profile/${name}`)
      await use ({app, user});
   },
     createWithRole: async ({}, use) => {

      const user = (role = 'user') => ({
            name: 'Test User',
            role: role
      });


         await use ( user);
   
   },
     
})