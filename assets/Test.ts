import { _decorator, Component, input, Node,Input,EventKeyboard,KeyCode } from 'cc';
const { ccclass, property } = _decorator;
import { PoolMgr } from './PoolMgr/PoolMgr';
@ccclass('Test')
export class Test extends Component {

    start() {
 input.on(Input.EventType.KEY_DOWN, this._onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this._onKeyUp, this);


       // this.schedule(this.createGo,1,Infinity,0);
        //this.createGo();
        
    }

    createGo(){
        PoolMgr.Inst.spawnGo("SpriteSplash");
    }

    update(deltaTime: number) {
        
    }

     _onKeyDown(event: EventKeyboard ) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.createGo()    
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


