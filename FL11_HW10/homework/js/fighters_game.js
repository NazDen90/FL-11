function Fighter({name, damage, hp, agility}) {
    let wins = 0, losses = 0;
    const ZERO = 0, HUNDRED = 100, MAX_HP = hp;
    this.getName = () => name;
    this.getDamage = () => damage;
    this.getAgility = () => agility;
    this.getHealth = () => hp;
    this.logCombatHistory = () => console.log(`Name: ${name}, Wins: ${wins}, Losses: ${losses}`);
    this.heal = (hpToAdd) => {
        hpToAdd + hp > MAX_HP ? hp = MAX_HP : hp += hpToAdd
    };
    this.dealDamage = (hpToSubtract) => {
        hp - hpToSubtract < ZERO ? hp = ZERO : hp -= hpToSubtract
    };
    this.addWin = () => wins++;
    this.addLoss = () => losses++;
    this.attack = (enemy) => {
        const random = Math.ceil(Math.random() * HUNDRED);
        if (random >= enemy.getAgility()) {
            enemy.dealDamage(damage);
            console.log(`${name} make ${damage} damage to ${enemy.getName()}`);
        } else {
            console.log(`${name} attack missed`);
        }
    };
}

function battle(fighter1, fighter2) {
    const ZERO = 0, deadFighters = Array.from(arguments).filter(fighter => !fighter.getHealth());
    deadFighters.forEach(fighter => console.log(`${fighter.getName()} is dead and can't fight`));
    let flag = fighter1.getAgility() > fighter2.getAgility();
    while (fighter1.getHealth() && fighter2.getHealth()) {
        if (flag) {
            fighter1.attack(fighter2);
            flag = false;
        } else {
            fighter2.attack(fighter1);
            flag = true;
        }
    }
    if (deadFighters.length === ZERO) {
        if (fighter1.getHealth()) {
            fighter1.addWin();
            fighter2.addLoss();
        } else {
            fighter1.addLoss();
            fighter2.addWin();
        }
    }
}

const shredder = new Fighter({
    name: 'Shredder',
    damage: 45,
    hp: 120,
    agility: 25
});

const splinter = new Fighter({
    name: 'Splinter',
    damage: 30,
    hp: 90,
    agility: 60
});
