const fs = require('fs');
const createError = require('http-errors');

import ClientSql from "./sql.js";
import { options } from "../../options/database";

const sql = ClientSql(options)

class Messages {
    constructor (nombreConst) {
        this.archivo = nombreConst;
    };

    async createTable() {
        await sql.createTable();
    }

    async getAll( ) {
        let result = await fs.promises.readFile(`./${this.archivo}`, 'utf-8');
        const parsedResult = JSON.parse(result);
        return parsedResult;
    };
    async writingFile( data ) {
        try {
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(data, null, 2));
        } catch (error) {
            throw createError(500, 'Error al guardar archivo');;
        }
    };

    async save( msg ) {
        const msgs = await this.getAll();
        msgs.push( msg );

        await this.writingFile(msgs);
    };
}

const instanciarMsgs = new Messages('src/data/messages.json');

module.exports = { MgsControl: instanciarMsgs };
