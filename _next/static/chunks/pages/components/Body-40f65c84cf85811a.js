(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[543],{9257:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/Body",function(){return r(8425)}])},8425:function(e,t,r){"use strict";r.r(t);var i=r(5893),s=r(7161);t.default=function(){return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"body",children:(0,i.jsx)(s.default,{})})})}},7161:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return l}});var i,s,a=r(5893),n=r(7294),o={backgroundSheetPath:"chronoValley8.png",backgroundLargeSheetPath:"chronoValley8-large.png",backgroundSmallSheetPath:"chronoValley8-small.png",playerSheetPath:"playerBoy.png",playerFrameSpeed:7,playerScaleFactor:.7,playerMoveSpeed:6,playerDefaultPosition:[380,300],canvasWidthPercent:.6,canvasHeightSize:600};(i=s||(s={}))[i.vertical=1]="vertical",i[i.horizontal=2]="horizontal";var h=class{getFrameWidth(){return this.leftOffset+this.currentFramePosX*this.frameWidth}getFrameHeight(){return this.currentFramePosY*this.frameHeight}setPosition(e,t){this.posx=e,this.posy=t}move(e){(1==e?this.posy:this.posx)%o.playerFrameSpeed==0&&(this.currentFramePosX+=1),this.currentFramePosX>3&&(this.currentFramePosX=0)}goUp(){this.currentFramePosY=2,this.posy-=o.playerMoveSpeed,this.move(s.vertical)}goDown(){this.currentFramePosY=0,this.posy+=o.playerMoveSpeed,this.move(s.vertical)}goLeft(){this.currentFramePosY=3,this.posx-=o.playerMoveSpeed,this.move(s.horizontal)}goRight(){this.currentFramePosY=1,this.posx+=o.playerMoveSpeed,this.move(s.horizontal)}constructor(e){this.leftOffset=15,this.frameWidth=65,this.frameHeight=130,this.currentFramePosX=0,this.currentFramePosY=0,this.posx=0,this.posy=0,this.scaleFactor=0,this.sprite=new Image,this.sprite.src=e,this.scaleFactor=o.playerScaleFactor}},c=class{initSceneConfig(){let{backgroundSheetPath:e,backgroundLargeSheetPath:t,backgroundSmallSheetPath:r,canvasWidthPercent:i,canvasHeightSize:s}=o;this.ctx.canvas.width=document.documentElement.clientWidth*i,document.documentElement.clientWidth>1366&&document.documentElement.clientWidth<=1920&&(this.sprite.src=t,this.ctx.canvas.height=s,this.player.scaleFactor+=.2),document.documentElement.clientWidth>768&&document.documentElement.clientWidth<=1366&&(this.sprite.src=e,this.ctx.canvas.height=s),document.documentElement.clientWidth<=768&&(this.sprite.src=r,this.ctx.canvas.height=this.sprite.height,this.player.scaleFactor-=.2),this.player.setPosition(o.playerDefaultPosition[0],o.playerDefaultPosition[1])}renderScreen(){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.ctx.drawImage(this.sprite,0,0),this.ctx.drawImage(this.player.sprite,this.player.getFrameWidth(),this.player.getFrameHeight(),66,120,this.player.posx,this.player.posy,80*this.player.scaleFactor,120*this.player.scaleFactor),requestAnimationFrame(this.renderScreen.bind(this))}makePlayerMove(){let e=new Map,t=t=>{e.set(t.key,!0),e.get("w")&&this.player.goUp(),e.get("a")&&this.player.goLeft(),e.get("s")&&this.player.goDown(),e.get("d")&&this.player.goRight()},r=t=>{e.set(t.key,!1)};window.addEventListener("keydown",t),window.addEventListener("keyup",r)}constructor(e){this.ctx=e,this.sprite=new Image,this.player=new h(o.playerSheetPath)}},l=function(){let e=(0,n.useRef)(null),t=function(){let e=o.canvasWidthPercent,t={"0.2":"w-1/5","0.4":"w-2/5","0.5":"w-6/12","0.6":"w-3/5","0.8":"w-4/5"};return void 0===t[e.toString()]?"":t[e.toString()]}();return(0,n.useEffect)(()=>{let t;if(!e.current)throw Error("failed to get target canvas to render animation");let r=e.current.getContext("2d");null!=r&&((t=new c(r)).initSceneConfig(),t.renderScreen(),t.makePlayerMove())}),(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{id:"mainFrame",className:"absolute top-20 w-full",children:(0,a.jsx)("div",{className:"".concat(t," mx-auto ring ring-green-800 rounded"),children:(0,a.jsx)("canvas",{ref:e,id:"sceneAnimation"})})})})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=9257)}),_N_E=e.O()}]);