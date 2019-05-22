// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

class Piece{
    constructor(target){
        this.target=target;
        this.vCurrSpeed=0;
        this.hCurrSpeed=0;
        this.vCurrAcceleration=0;
        this.hCurrAcceleration=0;
    }

    update(dt){
        //垂直方向的运动更新
        this.target.y+=this.vCurrSpeed*dt+this.vCurrAcceleration*dt*dt*.5;
        this.vCurrSpeed+=this.vCurrAcceleration*dt;

        //水平方向的运动更新
        this.target.x+=this.hCurrSpeed*dt+this.hCurrAcceleration*dt*dt*.5;
        this.hCurrSpeed+=this.hCurrAcceleration*dt;
    }
}

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        redSkin:cc.Prefab,
        blueSkin:cc.Prefab,
        graySkin:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.leftTop=null;
        this.rightTop=null;
        this.leftDown=null;
        this.rightDown=null;
        this.hAcceration=0;
        this.vAcceleration=-1800;

        //3秒后移除
        setTimeout(function(){
            this.node.removeFromParent();
        }.bind(this),3000);
    },
    init(gid){
        let currSprite=null;
        switch(gid){
            case 1:
            case 21:
                currSprite=this.redSkin;
            break;
            case 2:
            case 22:
                currSprite=this.blueSkin;
            break;
            case 3:
            case 23:
                currSprite=this.graySkin;
            break;
        }
        this.genPiece(currSprite);
    },
    start () {

    },
    genPiece(skin){
        let one=cc.instantiate(skin);
        let two=cc.instantiate(skin);
        let three=cc.instantiate(skin);
        let four=cc.instantiate(skin);

        this.node.addChild(one);
        this.node.addChild(two);
        this.node.addChild(three);
        this.node.addChild(four);

        this.leftTop=new Piece(one);
        this.rightTop=new Piece(two);
        this.leftDown=new Piece(three);
        this.rightDown=new Piece(four);

        this.leftTop.vCurrSpeed=500;
        this.leftTop.hCurrSpeed=-150;
        this.leftTop.vCurrAcceleration=this.vAcceleration;
        this.leftTop.hCurrAcceleration=this.hAcceration;

        this.rightTop.vCurrSpeed=500;
        this.rightTop.hCurrSpeed=150;
        this.rightTop.vCurrAcceleration=this.vAcceleration;
        this.rightTop.hCurrAcceleration=this.hAcceration;

        this.leftDown.vCurrSpeed=200;
        this.leftDown.hCurrSpeed=-150;
        this.leftDown.vCurrAcceleration=this.vAcceleration;
        this.leftDown.hCurrAcceleration=this.hAcceration;

        this.rightDown.vCurrSpeed=200;
        this.rightDown.hCurrSpeed=150;
        this.rightDown.vCurrAcceleration=this.vAcceleration;
        this.rightDown.hCurrAcceleration=this.hAcceration;

        let rotRight=cc.rotateBy(0.5,360);
        let rotLeft=cc.rotateBy(0.5,-360);

        two.runAction(cc.repeatForever(rotRight.clone()));
        four.runAction(cc.repeatForever(rotRight.clone()));
        one.runAction(cc.repeatForever(rotLeft.clone()));
        three.runAction(cc.repeatForever(rotLeft.clone()));
        
    },
    update (dt) {
        this.leftTop.update(dt);
        this.rightDown.update(dt);
        this.leftDown.update(dt);
        this.rightTop.update(dt);
    }
});