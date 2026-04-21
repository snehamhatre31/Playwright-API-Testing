import fs from 'fs/promises';
import path from 'path';
import Ajv from "ajv";
import {createSchema} from 'genson-js';
//import {generateJsonSchema} from './schema-validator';  

const SCHEMA_BASE_PATH = './schema_validation';
const ajv=new Ajv({allErrors:true});

export async function validateSchema(dirName: string, fileName: string,responseBody:object,
    createSchemaFlag:boolean=false) {
    const schemaPath = path.join(SCHEMA_BASE_PATH, dirName, `${fileName}_schema.json`);

    if(createSchemaFlag){
        try {
        const generatedSchema = createSchema(responseBody);
        await fs.mkdir(path.dirname(schemaPath), { recursive: true });
        await fs.writeFile(schemaPath, JSON.stringify(generatedSchema, null, 2));
        } catch (error) {
        
            throw new Error(`Error creating schema file: ${error}`);
        }
    }

    const schema = await loadSchema(schemaPath); 
    const validate = ajv.compile(schema);
    
    const isValid = validate(responseBody);
    if (!isValid) { 
        throw new Error(
            `Schema validation failed for ${fileName}_schema.json failed:\n` +
            `${JSON.stringify(validate.errors, null, 4)}\n\n`+
            `Actual Response:\n
            ${JSON.stringify(responseBody, null, 4)}`
        )     

        //console.error('Schema validation errors:', validate.errors);
        
    }
    //console.log(schema);
}

async function loadSchema(schemaPath: string){
    try {
        const schemaData = await fs.readFile(schemaPath, 'utf-8');
        return JSON.parse(schemaData);
    } catch (error) {
        console.error(`Error reading schema file: ${error}`);
        throw error;
    }
}