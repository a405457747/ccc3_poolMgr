import { _decorator, Component, Node } from 'cc';
import { PoolMgr } from './PoolMgr';
const { ccclass, property } = _decorator;

@ccclass('AutoRecycle')
export class AutoRecycle extends Component {

    @property 
    saveTime:number=1;

    start() {
        this.scheduleOnce(()=>{
            
            PoolMgr.Inst.recycleGo(this.node);
        },this.saveTime);
    }
    
}


