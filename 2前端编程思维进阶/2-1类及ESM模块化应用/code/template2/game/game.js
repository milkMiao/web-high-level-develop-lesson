import Player from './player.js';
export default class Game{
    constructor(){
        this.player = null;
    }
    login(name){
        this.player = new Player(name);

        //2.通过自定义事件管理init方法，在登录时候延迟执行。
        //初始化英雄
        this.player.heroes.forEach(hero => {
            hero.trigger("init")
        });
    }
}