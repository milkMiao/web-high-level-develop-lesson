import GameEvent from './gameEvent.js';

// 基类
export default  class AbstractHero extends GameEvent {
    constructor({name,ico,skills}){
        super();
        if(new.target===AbstractHero){
            throw new Error("AbstractHero不能被实例化");
        }
        this.name = name;
        this.ico = ico;
        this.skills = skills;
        // 绑定init 自定义事件 this.addEvent("init",this.init);
        this.addEvent("init",this.init);
    }
    init(){
        console.log("初始化")
    }
}