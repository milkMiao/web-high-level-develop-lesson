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

//登陆操作
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
// 渲染英雄
function renderHeroes(hreoes){
  document.querySelector(".heroView").innerHTML = "";
  hreoes.forEach(hero=>{
    let heroItem = document.createElement("div");
    heroItem.classList.add("heroItem");
    heroItem.innerHTML =  ` <img src="${hero.ico}" /><span>${hero.name}</span>`;
    heroItem.onclick = function(){
      // 选中英雄
      document.querySelector(".heroShow").innerHTML = `<img src="${hero.ico}" />`;
      // 渲染英雄技能
      renderSkills(hero.skills);
    }
    document.querySelector(".heroView").appendChild(heroItem);
  })
}

// 渲染技能 
function renderSkills(skills){
  document.querySelector(".skillsView").innerHTML = "";
    skills.forEach(skill=>{
      let img = document.createElement("img");
      img.src = skill.ico;
      document.querySelector(".skillsView").appendChild(img);
    })
}
