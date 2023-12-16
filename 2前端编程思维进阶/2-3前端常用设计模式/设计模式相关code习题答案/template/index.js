// console.log("index");
// 英雄 玩家 皮肤  技能 、游戏管理 ---》类 ---》逻辑关系--》组织代码；
/*
        game {
            login{
              player:{
                heros:{
                    skills
                    skins
                }
              }
            }
        }
*/
// index.js  和dom操作相关内容
import Game from './game/game.js';
let game = new Game();

// game.login("张三");
// console.log(game);
document.querySelector(".sub").onclick = function(){
    let username = document.querySelector(".username").value;
    game.login(username);
    console.log(game);
    document.querySelector(".login").style.display = "none";
    document.querySelector(".game").style.display = "block";
    document.querySelector(".chioseusername").innerHTML = username;
    renderHeroes(game.player.heroes);
}

// 作业：实现一个鲁班类 类似亚瑟（英雄及技能渲染）；
function renderHeroes(heroes){
    document.querySelector(".heroView").innerHTML = "";
    heroes.forEach(hero=>{
        // hero 每一个英雄
        let heroesItem = document.createElement("div");
        heroesItem.classList.add("heroItem");
        heroesItem.innerHTML = `<img src="${hero.ico}" />
        <span>${hero.name}</span>`;
        heroesItem.onclick = function(){
            // 替换选择英雄图像
            document.querySelector(".heroShow").innerHTML= `<img src="${hero.ico}" />`;
            // 渲染技能
            renderSkills(hero.skills);
        }
        document.querySelector(".heroView").appendChild(heroesItem);
    })
}

function renderSkills(skills){
        document.querySelector(".skillsView").innerHTML = "";
        skills.forEach(skill=>{
            let img = document.createElement("img");
            img.src = skill.ico;
            document.querySelector(".skillsView").appendChild(img);
        })
}

// 总结：分析和需求有关对象---》特征（属性 、方法）---》抽象成类(复用性)---》抽象成基类---》组织逻辑、模块化分离；
// 
/*
        game {
            login{
              player:{
                heroes:{
                    skills
                    skins
                }
              }
            }
        }
*/
// hero类 skll skin ...  ----》抽象基类


