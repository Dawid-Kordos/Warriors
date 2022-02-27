var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { WarriorRecord } from '../records/warrior.record';
import { ValidationError } from '../utils/errors';
export const warriorRouter = Router();
warriorRouter
    .get('/add-form', (req, res) => {
    res.render('warrior/add-form');
})
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const warriors = yield WarriorRecord.getAll();
    res.render('warrior/all-warriors', {
        warriors,
    });
}))
    .post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, power, defence, resistance, agility, } = req.body;
    if (yield WarriorRecord.isNameUsed(name)) {
        throw new ValidationError(`Name '${name}' is already in use. Please choose another one.`);
    }
    const warrior = new WarriorRecord(Object.assign(Object.assign({}, req.body), { power: Number(power), defence: Number(defence), resistance: Number(resistance), agility: Number(agility) }));
    const id = yield warrior.insert();
    res.render('warrior/warrior-added', {
        name: warrior.name,
        id,
    });
}))
    .delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const warrior = yield WarriorRecord.getOne(id);
    yield warrior.delete();
    res.render('warrior/deleted');
}));
//# sourceMappingURL=warrior.js.map