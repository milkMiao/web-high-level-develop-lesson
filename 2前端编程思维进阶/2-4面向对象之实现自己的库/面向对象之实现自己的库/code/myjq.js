// $(".box").click(function(){
//     console.log("click");
// })

// function $(arg){
//     return {
//         click(cb){
//             document.querySelector(arg).onclick = cb;
//         }
//     }
// }
// const config = {
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

class JQ {
  constructor(arg) {
    this.ele = document.querySelector(arg);
  }
  click(cb) {
    this.ele.addEventListener("click", cb);
  }
}

class Jq {
  constructor(arg, root) {
    if (typeof root === "undefined") {
      this["prevObject"] = [document];
    } else {
      this["prevObject"] = root;
    }

    // 通过类型区分不同的情况分别处理
    if (typeof arg === "string") {
      //只能处理单个节点，多节点不能点击了
      // this.ele = document.querySelector(arg);
      // this[0] = ele1  this[1] = ele2 ....
      let eles = document.querySelectorAll(arg); //拿到所有节点，如div等
      this.#addEles(eles);
    } else if (typeof arg === "function") {
      document.addEventListener("DOMContentLoaded", arg);
    } else {
      console.log(arg);
      if (typeof arg.length !== "undefined") {
        this.#addEles(arg);
      } else {
        this[0] = arg;
        this.length = 1;
      }
    }
  }
  #addEles(eles) {
    // console.log(eles) 拿到所有的节点，如div，text等。。。
    for (let i = 0; i < eles.length; i++) {
      this[i] = eles[i]; //this表示—实例化对象
    }
    this.length = eles.length; //模仿数组，为其添加一个length
  }
  click(cb) {
    // this.ele.addEventListener("click",cb);
    for (let i = 0; i < this.length; i++) {
      this[i].addEventListener("click", cb);
    }
  }
  on(eventName, cb) {
    let eventArr = eventName.split(" ");
    // 针对多个节点绑定多个事件
    // console.log(eventArr);
    for (let i = 0; i < this.length; i++) {
      for (let j = 0; j < eventArr.length; j++) {
        this[i].addEventListener(eventArr[j], cb);
      }
    }
    return this; // 可以继续on操作，加return this
  }
  eq(index) {
    // return this[index];
    return new Jq(this[index], this);
  }
  end() {
    return this["prevObject"];
  }
  get(index) {
    return this[index];
  }
  css(...args) {
    // console.log(arguments) //打印隐藏参数
    // console.log(args);
    // 区分不同情况分别处理
    if (args.length === 1) {
      // 一个参数：对象和字符串情况；
      if (typeof args[0] === "object") {
        // 1 设置多个样式 【对象传入 修改样式】
        // $("div").css({width:"100px",height:"100px",background:"red"});
        for (let i = 0; i < this.length; i++) {
          for (let j in args[0]) {
            // 多个元素
            this.#setStyle(this[i], j, args[0][j]);
          }
        }
      } else {
        // 3 获取一个样式  : 多个元素只会获取第一个元素样式 【获取样式】
        //let res =  $("div").css("background");
        return this.#getStyle(this[0], args[0]);
      }
    } else {
      // 2、两个参数 ：设置一个样式 【字符串参数】
      // $("div").css("background","blue");
      // 多个元素设置一个样式
      for (let i = 0; i < this.length; i++) {
        this.#setStyle(this[i], args[0], args[1]);
      }
    }
    return this;
  }
  #getStyle(ele, styleName) {
    if (styleName in $.cssHooks) {
      return $.cssHooks[styleName].get(ele);
    }
    return getComputedStyle(ele, null)[styleName];
  }

  #setStyle(ele, styleName, styleValue) {
    if (typeof styleValue === "number" && !$.cssNumber[styleName]) {
      styleValue = styleValue + "px";
    }
    if (styleName in $.cssHooks) {
      $.cssHooks[styleName].set(ele, styleValue);
    }
    ele.style[styleName] = styleValue;
  }

  //自定义动画函数
  animate(...args) {
    if (typeof args[1] !== "function") {
      //不是函数回调，过渡时间是字符串
      if (typeof args[1] === "string") {
        switch (args[1]) {
          case "slow":
            timer = 1000;
            break;
          case "fast":
            timer = 200;
            break;
          case "nomal":
            timer = 600;
            break;
        }
      } else if (typeof args[1] === "number") {
        //过渡时间是数字
        timer = args[1];
      }
    }
    let timerSecond = timer / 1000 + "s";

    console.log(...args); //{width:"300px"},function(){console.log("运动完成"); }
    for (let i = 0; i < this.length; i++) {
      this[i].style.transition = timerSecond + " all"; //自定义过渡时间
      for (let j in args[0]) {
        this.#setStyle(this[i], j, args[0][j]);
      }
    }
    console.log(this); //0:div.box  1:div.box

    //最后一个参数的函数，动画完成之后—执行函数
    if (typeof args[args.length - 1] === "function") {
      document.addEventListener("transitionend", args[args.length - 1]);
    }
  }
}

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
  zoom: true,
};
$.cssHooks = {};

function $(arg) {
  return new Jq(arg);
}
