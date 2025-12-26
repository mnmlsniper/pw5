import { test, expect } from "@playwright/test";
let token;
const url = 'https://apichallenges.eviltester.com/';
test.describe('Challenge', () => {
    test.beforeEach(async ({ request }) => {
        let r = await request.post(`${url}challenger`);
        token = r.headers();
      // для дебага
      //  console.log(`${url}gui/challenges/${token['x-challenger']}`);

       // Демо
        r =  await request.get(`${url}todos`, {
            headers:{
    'X-CHALLENGER': token['x-challenger']
            }
        });
        const body = await r.json();

        //todo Данную проверку вынести в тест и посмотреть конструкцию every
body.todos.forEach( item => {
expect(item).toEqual(expect.objectContaining({ id: expect.any(Number)}));
})
      });


test("Получить список челленджей", async ({ request }) => {
   let r =  await request.get(`${url}challenges`, {
        headers:{
'X-CHALLENGER': token['x-challenger']
        }
    });
    const body = await r.json();
 r =  await request.get(`${url}todos`, {
        headers:{
'X-CHALLENGER': token['x-challenger']
        }
    });
    expect(body.challenges.length).toBe(59);
    
});
});