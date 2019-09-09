class Weapon{
    constructor(weaponImg, weaponName, weaponDamage){
        // this.weaponImg = weaponImg;
        this.weaponName = weaponName;
        this. weaponDamage = weaponDamage;
    }
}

let snowball = new Weapon("snowball", 5);
let fish = new Weapon ("fish", 10);
let smallStone = new Weapon("small stone", 15);
let bigStone = new Weapon("big stone", 20);


let weapons = [snowball, fish, smallStone, bigStone];