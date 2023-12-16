import Hero from './hero.js';

import S1 from '../skills/luban/s1.js';
import S2 from '../skills/luban/s2.js';
import S3 from '../skills/luban/s3.js';

export default class LuBan extends Hero {
    constructor(){
        let config = {
            name:"鲁班",
            ico:"./sources/heroes/luban1.png",
            skills:[new S1(),new S2(),new S3()]
        }
        super(config);
        // this.name = "鲁班";
        // this.ico = "./sources/heroes/luban1.png";
        // this.skills = [new S1(),new S2(),new S3()];
    }
}