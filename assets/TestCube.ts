import { _decorator, Component, Node } from 'cc';
import { IPoolObj, PoolMgr } from './PoolMgr/PoolMgr';
const { ccclass, property } = _decorator;

@ccclass('TestCube')
export class TestCube extends Component implements IPoolObj {
    onLoad() {
        this.node.on("onRecycle",this.onRecycle,this);
        this.node.on("onSpawn",this.onSpawn,this);
    }
    protected onDestroy(): void {
        this.node.off("onRecycle",this.onRecycle,this);
        this.node.off("onSpawn",this.onSpawn,this);
    }


    onRecycle(): void {
        this.node.setPosition(0,0);
        console.log("cube recycle");
    }
    onSpawn(): void {
        console.log("cube spawn");
    }
    update(deltaTime: number) {
        
        let {x,y}=this.node.getPosition();

        y+=deltaTime*100;
    
        this.node.setPosition(x,y);

        if(y>300){
            PoolMgr.Inst.recycleGo(this.node);
        }
    }
}


