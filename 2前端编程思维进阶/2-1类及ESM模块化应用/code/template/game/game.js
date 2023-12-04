// 游戏管理类
import Player from './player.js';

export default class Game{
    constructor(){
        this.player = null;
    }
    // 2.通过自定义事件管理init方法，在登录时候延迟执行
    login(username){
        this.player = new Player(username);
    }
}
