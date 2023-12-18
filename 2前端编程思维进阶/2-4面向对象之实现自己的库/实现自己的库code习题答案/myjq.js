// const config  = {
//     animationIterationCount: true,
//     columnCount: true,
//     fillOpacity: true,
//     flexGrow: true,
//     flexShrink: true,
//     fontWeight: true,
//     gridArea: true,
//     gridColumn: true,
//     gridColumnEnd: true,
//     gridColumnStart: true,
//     gridRow: true,
//     gridRowEnd: true,
//     gridRowStart: true,
//     lineHeight: true,
//     opacity: true,
//     order: true,
//     orphans: true,
//     widows: true,
//     zIndex: true,
//     zoom: true
// }


class Jq {
    constructor(arg, root) {
        if (typeof root === 'undefined') {
            this.preObject = [document];
        } else {
            this['preObject'] = root;
        }

        if (typeof arg === 'string') {
            // 字符串情况
            // this[0] = document.querySelector(arg);
            let eles = document.querySelectorAll(arg);
            // 多个元素保存
            this.#addEles(eles);
        } else if (typeof arg === 'function') {
            // 函数
            document.addEventListener("DOMContentLoaded", arg);
        } else {
            // 对象
            if (typeof arg.length === 'undefined') {
                // 一个节点
                this[0] = arg;
                this.length = 1;
            } else {
                // 多个节点
                this.#addEles(arg);
            }
        }
    }
    #addEles(eles) {
        for (let i = 0; i < eles.length; i++) {
            this[i] = eles[i];
        }
        this.length = eles.length;
    }
    click(fn) {
        // 多个元素绑定
        for (let i = 0; i < this.length; i++) {
            this[i].addEventListener("click", fn);
        }
        // this[0].addEventListener("click",fn);

    }
    on(eventName, fn) {
        let eventArr = eventName.split(" ");
        // 多层循环
        // 多个元素
        for (let i = 0; i < this.length; i++) {
            // 多个事件
            for (let j = 0; j < eventArr.length; j++) {
                this[i].addEventListener(eventArr[j], fn);
            }
        }
        return this;
    }
    eq(index) {
        // 对象不变链式
        // return this;
        // 对象有改变
        return new Jq(this[index], this);
    }
    end() {
        return this['preObject'];
    }
    css(...args) {
        // console.log(arguments)
        //不定参问题 
        if (args.length === 1) {
            // 1、3 情况
            if (typeof args[0] === 'string') {
                // 1情况
                return this.#getStyle(this[0], args[0]);
            } else {
                // 3情况 对象 多个节点 多个样式
                for(let i=0;i<this.length;i++){
                    for(let j in args[0]){
                        this.#setStyle(this[i],j,args[0][j]);
                    }
                }
            }
        } else {
            // 2情况 字符串
            for(let i=0;i<this.length;i++){
                this.#setStyle(this[i],args[0],args[1]);
            }
        }
    }
    #getStyle(ele, styleName) {
        // 调取cssHooks里的 get
        if(styleName in $.cssHooks){
            return $.cssHooks[styleName].get(ele);
        }
        return getComputedStyle(ele, null)[styleName];
    }
    #setStyle(ele,styleName,styleValue){
        // console.log(styleName in $.cssNumber);
        if(typeof styleValue === "number" && !(styleName in $.cssNumber)){
            styleValue = styleValue + "px";
        }
        // 调取cssHooks里的 set
        if(styleName in $.cssHooks) {
            $.cssHooks[styleName].set(ele,styleValue);
        }
        ele.style[styleName] =  styleValue;
    }
    animate(...args){
        let timer = 500;
        if(typeof args[1] !== "function"){ //不是函数回调
            if(typeof args[1] === 'string'){
                switch( args[1]){
                    case 'slow':
                        timer = 1000;
                        break;
                    case 'fast':
                        timer = 200;
                        break;
                    case 'nomal':
                        timer = 600;
                        break;
                }
            }else if(typeof args[1] === "number"){ //过渡时间
                timer = args[1];
            }
        }
        let timerSecond = timer/1000 + "s";

        for(let i=0;i<this.length;i++){
            this[i].style.transition = timerSecond+' all';
            for(let j in args[0]){
                this.#setStyle(this[i],j,args[0][j]);
            }
        }

        if(typeof args[args.length-1] === "function"){
            document.addEventListener("transitionend",args[args.length-1]);
        }

    }
}


function $(arg) {
    return new Jq(arg);
    // return {
    //     click(fn){
    //        document.querySelector(arg).onclick = function(){
    //             fn && fn();
    //             // fn();
    //        } 
    //     }
    // }
}

// 给未来扩展 对外暴露了配置
$.cssNumber = {
    animationIterationCount: true,
    columnCount: true,
    fillOpacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
}

$.cssHooks = {};
// fn && fn() 等同于下面
// if(fn){
//     fn();
// }