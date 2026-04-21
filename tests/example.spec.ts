import { test, expect } from '@playwright/test';
import { validateSchema } from '../utiles/schema-validator';
//import {generateJsonSchema} from '../utiles/schema-validator';

/*test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});*/
let token: string;

test.beforeAll(async ({ request }) => {

  const newtokenresponse=await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {"user":{"email":"snehamhatre1111@gmail.com","password":"Iamtheboss@23"}}
    })
    const newtokenresponsejson = await newtokenresponse.json();
    expect(newtokenresponse.status()).toBe(200)
    expect(newtokenresponsejson).toHaveProperty('user');
     token = 'Token ' + newtokenresponsejson.user.token;
    //console.log(token);
  });
  

test('Get Test Tags', async ({ request }) => {
   const tagsresponse=await request.get('https://conduit-api.bondaracademy.com/api/tags');
    const tagresponsejson = await tagsresponse.json();
  
    expect(tagsresponse.status()).toBe(200);
   // await generateJsonSchema('tags','Get_Tags', tagresponsejson);
   await validateSchema('tags','Get_Tags', tagresponsejson);

    expect(tagresponsejson).toHaveProperty('tags');
    expect(tagresponsejson.tags[0]).toEqual('Test')
    expect(tagresponsejson.tags.length).toBeLessThanOrEqual(10);
    //console.log(tagresponsejson);

 
    
});

test('Get Articles', async ({ request }) => {
    const articleresponse=await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0');
    const articleresponsejson = await articleresponse.json();
    
    expect(articleresponse.status()).toBe(200);
    expect(articleresponsejson).toHaveProperty('articles');
    expect(articleresponsejson.articles.length).toBeLessThanOrEqual(10);
    expect(articleresponsejson.articlesCount).toEqual (10);
    //console.log(articleresponsejson);
});

test('Add New Article and Delete that Article', async ({ request }) => {
    
   const addnewarticleresponse=await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data:{
    "article": {
        "title": "Test2",
        "description": "test",
        "body": "tt",
        "tagList": [
            "tt"
        ]
    }
},
    headers: {
        'Authorization': token
    }
   })
    const addnewarticleresponsejson = await addnewarticleresponse.json();
    expect(addnewarticleresponse.status()).toBe(201);
    expect(addnewarticleresponsejson).toHaveProperty('article');
    expect(addnewarticleresponsejson.article.title).toEqual('Test2');
    //console.log(addnewarticleresponsejson);

    const newarticleslugID=addnewarticleresponsejson.article.slug;

    //Get Articles to verify the added article
    const articleresponse=await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0',
      {
        headers: {
            'Authorization': token
        }
      })
    const articleresponsejson = await articleresponse.json();
    
    expect(articleresponse.status()).toBe(200);
    expect(articleresponsejson.articles[0].title).toEqual('Test2');
    //console.log(articleresponsejson);


//test('Delete Article', async ({ request }) => {
  const deletenewarticleresponse=await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${newarticleslugID}`, {
    headers: {
        'Authorization': token
            }
    })
  expect(deletenewarticleresponse.status()).toBe(204);
  });

  test('Create ,Update , Delete and Get Article', async ({ request }) => {
    
   const addnewarticleresponse=await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data:{
    "article": {
        "title": "Test123",
        "description": "testing",
        "body": "test",
        "tagList": [
            "new"
        ]
    }
},
    headers: {
        'Authorization': token
    }
   })
    const addnewarticleresponsejson = await addnewarticleresponse.json();
    expect(addnewarticleresponse.status()).toBe(201);
    expect(addnewarticleresponsejson).toHaveProperty('article');
    expect(addnewarticleresponsejson.article.title).toEqual('Test123');
    //console.log(addnewarticleresponsejson);

    const newarticleslugID=addnewarticleresponsejson.article.slug;

    
    //Update Article

    const updatearticleresponse=await request.put(`https://conduit-api.bondaracademy.com/api/articles/${newarticleslugID}`,
      {
        data:{
      "article": {
        "title": "Test123_Modified",
        "description": "testing",
        "body": "test",
        "tagList": [
            "new"
        ]
    }
  },
    headers: {
        'Authorization': token
    }
  })
    const updatearticleresponsejson = await updatearticleresponse.json();
    expect(updatearticleresponse.status()).toBe(200);
    expect(updatearticleresponsejson).toHaveProperty('article');
    expect(updatearticleresponsejson.article.title).toEqual('Test123_Modified');

    const updatedsludID=updatearticleresponsejson.article.slug;
    //console.log(updatearticleresponsejson);

//Delete Article
  const deletenewarticleresponse=await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${updatedsludID}`, {
    headers: {
        'Authorization': token
            }
    })
  expect(deletenewarticleresponse.status()).toBe(204);
 

  //Get Articles to verify the deleted article
  const articleresponse=await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0',
      {
        headers: {
            'Authorization': token
        }
      })
    const articleresponsejson = await articleresponse.json();
    
    expect(articleresponse.status()).toBe(200);
    expect(articleresponsejson.articles[0].title).not.toEqual('Test123');
    //console.log(articleresponsejson);

});