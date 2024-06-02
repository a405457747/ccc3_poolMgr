import { _decorator, Component, find, instantiate, Node, Prefab } from 'cc';
const { ccclass, property ,executionOrder} = _decorator;

export interface IPoolObj {
    onRecycle():void;
    onSpawn():void;
}

class GoPool {
    readonly _objs:Node[]=[];

    spawnGo(poolObjPath:string){
       let tempGo:Node=null;
       if(this._objs.length===0){
        tempGo=instantiate(PoolMgr.Inst.getGoByName(poolObjPath));
        find("Canvas/PoolObjs").addChild(tempGo);
        tempGo.name =poolObjPath;
       }else {
        tempGo=this._objs[0];
        //这个没有返回值
        tempGo=this._objs.shift();
       }

       tempGo.active=true;

       tempGo.emit("onSpawn");
       return tempGo;
    }

    recycleGo(obj:Node):void {
        obj.emit("onRecycle");
        obj.active=false;
        
        if(this._objs.indexOf(obj)!==(-1)){
            console.log("The queue have the obj "+obj.name);
        }else {
            this._objs.push(obj);
        }
    }
}

@ccclass('PoolMgr')
@executionOrder(-1)
export class PoolMgr extends Component {

    @property([Prefab])
    objs:Prefab[]|null=[];

    static Inst:PoolMgr|null=null;

    private _goPools:{} ={};

    getGoByName(name:string):Prefab|null {
        for(let item of this.objs){
            if(item.name===name){
                return item;
            }
        }
        return null;
    }

    protected onLoad(): void {
        if(PoolMgr.Inst===null){
            PoolMgr.Inst=this;
        }
        
    }

    spawnGo(poolObjPath:string):Node|null{
        if(! (poolObjPath in this._goPools)){
            let tempPool =new GoPool();
            this._goPools[poolObjPath]=tempPool;
        }

        return this._goPools[poolObjPath].spawnGo(poolObjPath);
    }

    recycleGo(obj:Node){
        let goName:string =obj.name;
        if(goName in this._goPools){
            this._goPools[goName].recycleGo(obj);
        }else{
            console.log("The dict don't have the key "+goName);
        }
    }

}


