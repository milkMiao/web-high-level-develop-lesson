export default class GameEvent{
// 管理事件类
    constructor(){
        this.handles = {};
    }
    //添加事件，监听，观察
    addEvent(eventName,fn){
        // {myevent1:[fn1,fn2...],myevent2:[fn1,fn2...]}
        if(typeof this.handles[eventName]==="undefined"){
            this.handles[eventName] = [];
        }
        this.handles[eventName].push(fn);
    }
    //触发
    trigger(eventName){
        if(!(eventName in this.handles)){
            return ;
        }
        this.handles[eventName].forEach(fn=>{
            fn();
        })
    }
    //移除事件 removeEvent
    removeEvent(eventName,fn){
        if(!(eventName in this.handles)){//不存在的事件，直接返回
            return ;
        }
        for(let i=0; i< this.handles[eventName].length; i++){
            if(this.handles[eventName][i] === fn){
                this.handles[eventName].splice(i,1);
                break;
            }
        }
    }

    // setTimeout(()=>{
    //     eventObj.trigger("myevent")
    // },1000)

    //eventBus 总线模式， vue2
    //  $bus = new Vue()  
    //  $bus.on() 添加事件 
    //  $bus.emit('enentname', fn) //触发
    // 作业：1.实现一个 removeEvent 可以删除指定的指定以事件。
    //      2.通过自定义事件管理init方法，在登录时候延迟执行。
}