import Player from './player.js';
export default class Game{
    constructor(){
        this.player = null;
    }
    login(name){
        // 触发 init 执行； //trigger("init")

        this.player = new Player(name);
        this.player.heroes.forEach(hero=>{
            hero.trigger("init");
        })
    }
}