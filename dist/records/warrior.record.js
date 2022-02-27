var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuid } from "uuid";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
export class WarriorRecord {
    constructor(obj) {
        const { id, name, power, defence, resistance, agility, wins } = obj;
        const stats = [power, defence, resistance, agility];
        const sum = stats.reduce((prev, curr) => prev + curr, 0);
        for (const stat of stats) {
            if (stat < 1) {
                throw new ValidationError('Each property must have min 1 point.');
            }
        }
        if (sum !== 10) {
            throw new ValidationError(`Sum of all properties (power, defence, resistance and agility) must be equal 10, but you have entered ${sum}.`);
        }
        if (name.trim().length < 3 || name.length > 50) {
            throw new ValidationError(`Name should have at least 3 and at most 50 characters, but you entered ${name.trim().length}.`);
        }
        this.id = id !== null && id !== void 0 ? id : uuid();
        this.name = name;
        this.power = power;
        this.defence = defence;
        this.resistance = resistance;
        this.agility = agility;
        this.wins = wins !== null && wins !== void 0 ? wins : 0;
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.execute('INSERT INTO `warriors` (`id`, `name`, `power`, `defence`, `resistance`, `agility`, `wins`) VALUES(:id, :name, :power, :defence, :resistance, :agility, :wins)', {
                id: this.id,
                name: this.name,
                power: this.power,
                defence: this.defence,
                resistance: this.resistance,
                agility: this.agility,
                wins: this.wins,
            });
            return this.id;
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.execute('UPDATE `warriors` SET `wins` = :wins WHERE `id` = :id', {
                wins: this.wins,
                id: this.id,
            });
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.execute('DELETE FROM `warriors` WHERE `id` = :id', {
                id: this.id,
            });
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield pool.execute('SELECT * FROM `warriors` WHERE `id` = :id', {
                id,
            });
            return result.length === 0 ? null : new WarriorRecord(result[0]);
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield pool.execute('SELECT * FROM `warriors`');
            return results.map(obj => new WarriorRecord(obj));
        });
    }
    static topList(topCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield pool.execute('SELECT * FROM `warriors` ORDER BY `wins` DESC LIMIT :topCount', {
                topCount,
            });
            return results.map(obj => new WarriorRecord(obj));
        });
    }
    static isNameUsed(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield pool.execute('SELECT * FROM `warriors` WHERE `name` = :name', {
                name,
            });
            return result.length > 0;
        });
    }
}
//# sourceMappingURL=warrior.record.js.map