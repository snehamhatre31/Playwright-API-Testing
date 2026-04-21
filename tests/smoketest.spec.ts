import { test, expect } from '@playwright/test';
import { RequestHandler } from '../utiles/request-handeler';        

test('Smoketest', async ({ request }) => {

    const api = new RequestHandler();

    api
    .url('https://conduit-api.bondaracademy.com/api')
    .path('/articles')
    .param({ limit: 10, offset: 0 })
    .header({ 'Authorization': 'authorization token' })
    .body({   
    "article": {
        "title": "Test2",
        "description": "test",
        "body": "tt",
        "tagList": [
            "tt"
        ]
    }})
    .geturl();
})