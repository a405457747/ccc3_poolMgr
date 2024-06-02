import { _decorator, Component, input, Node,Input,EventKeyboard,KeyCode, Director, director, tween } from 'cc';
const { ccclass, property } = _decorator;
import { PoolMgr } from './PoolMgr/PoolMgr';

import { Scheduler } from "cc";
@ccclass('Test')
export class Test extends Component {

    start() {
        
 input.on(Input.EventType.KEY_DOWN, this._onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this._onKeyUp, this);
        let n =Director.instance.getTotalTime();
        console.log("n1",n);


        /* 无效
        setInterval(()=>{

        },1000);
        */

        /*运动后无效果
        tween(this.node)
        .delay(1)
        .call(()=>{

            let n2 =Director.instance.getTotalTime();
            console.log("n2",n2);
        })
        .union()
        .repeat(100)
        .start();
        */


        /*timescale动态改变都有效果 
        this.schedule(()=>{

            
        },1,10,1);
        */
    }

    createGo(){
        PoolMgr.Inst.spawnGo("SpriteSplash");
    }

    printTime(){
        console.log("setTime");
       director.getScheduler().setTimeScale(0.25);

    }

    update(deltaTime: number) {
        
    }

     _onKeyDown(event: EventKeyboard ) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.printTime();
                //this.createGo()    
                break;
   
        }
       
    }

    _onKeyUp(event: EventKeyboard) {

        switch (event.keyCode) {
            case KeyCode.KEY_A:

                break;

        }

        
    }

}


