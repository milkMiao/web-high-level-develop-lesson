export default class GameEvent{
    constructor(){
        // 保存事件 
        this.handles = {};
    }
    // 添加事件,监听 、观察
    addEvent(eventName,fn){
        // {'myevent':[fn1,fn2....],'myevent2':[fn1,fn2..]}
        if(typeof this.handles[eventName] ===  "undefined"){
            this.handles[eventName] = [];   
        }
        this.handles[eventName].push(fn);
    }
    // 触发
    trigger(eventName){
        this.handles[eventName].forEach(v=>{
            v();
        })
    }
    // 移除事件removeEvent (eventName,fn）;
    removeEvent(eventName,fn){
        if(!(eventName in this.handles)){
            return ;
        }
        for(let i=0;i<this.handles[eventName].length;i++){
            if(this.handles[eventName][i]===fn){
                this.handles[eventName].splice(i,1);
                break;
            }
        }
    }
}