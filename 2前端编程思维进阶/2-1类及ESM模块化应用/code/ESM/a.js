
let a = 10;
let b = function(){
    console.log("b");
}
// console.log(a);
// 导出export 导出多个
export {a as c};
export {b};
// export default 只能导出一次
let f = function(){
    console.log("f");
}
// export default f;
// export default a;
export {f as default};