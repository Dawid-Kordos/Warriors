export const fight = (warrior1, warrior2) => {
    const log = [];
    const warrior1Obj = {
        hp: warrior1.resistance * 10,
        dp: warrior1.defence,
        warrior: warrior1,
    };
    const warrior2Obj = {
        hp: warrior2.resistance * 10,
        dp: warrior2.defence,
        warrior: warrior2,
    };
    let attacker = warrior1Obj;
    let defender = warrior2Obj;
    do {
        const attackStrength = attacker.warrior.power;
        log.push(`${attacker.warrior.name} is attacking ${defender.warrior.name} with power of ${attackStrength}. [${attacker.warrior.name} has remaining ${attacker.hp} health points.] & [${defender.warrior.name} has remaining ${defender.hp} health points.]`);
        if (defender.dp + defender.warrior.agility > attackStrength) {
            defender.dp -= attackStrength;
            if (defender.dp < 0) {
                defender.hp += defender.dp;
            }
        }
        else {
            defender.hp -= attackStrength;
        }
        [defender, attacker] = [attacker, defender];
    } while (defender.hp > 0);
    const winner = attacker.warrior;
    log.push(`The winner is ${winner.name}! Congratulations!`);
    return {
        log,
        winner,
    };
};
//# sourceMappingURL=fight.js.map