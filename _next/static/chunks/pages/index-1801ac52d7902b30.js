(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(85)}])},8425:function(e,t,r){"use strict";r.r(t);var i=r(5893),s=r(9201);t.default=function(){return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"body",children:(0,i.jsx)(s.default,{})})})}},245:function(e,t,r){"use strict";r.r(t);var i=r(5893);t.default=function(){return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("footer",{className:"bar",children:(0,i.jsx)("div",{className:"font-medium text-white flex flex-wrap items-center mx-auto p-4",children:"Made with ❤ "})})})}},9201:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return d}});var i,s,a=r(5893),n=r(7294),o={backgroundSheetPath:"chronoValley8.png",backgroundLargeSheetPath:"chronoValley8-large.png",backgroundSmallSheetPath:"chronoValley8-small.png",playerSheetPath:"playerBoy.png",playerFrameSpeed:7,playerScaleFactor:.7,playerMoveSpeed:6,playerDefaultPosition:[380,300],canvasWidthPercent:.6,canvasHeightSize:600};(i=s||(s={}))[i.vertical=1]="vertical",i[i.horizontal=2]="horizontal";var l=class{getFrameWidth(){return this.leftOffset+this.currentFramePosX*this.frameWidth}getFrameHeight(){return this.currentFramePosY*this.frameHeight}setPosition(e,t){this.posx=e,this.posy=t}move(e){(1==e?this.posy:this.posx)%o.playerFrameSpeed==0&&(this.currentFramePosX+=1),this.currentFramePosX>3&&(this.currentFramePosX=0)}goUp(){this.currentFramePosY=2,this.posy-=o.playerMoveSpeed,this.move(s.vertical)}goUpLeft(){this.currentFramePosY=3,this.posy-=o.playerMoveSpeed,this.posx-=o.playerMoveSpeed,this.move(s.vertical)}goUpRight(){this.currentFramePosY=1,this.posy-=o.playerMoveSpeed,this.posx+=o.playerMoveSpeed,this.move(s.vertical)}goDown(){this.currentFramePosY=0,this.posy+=o.playerMoveSpeed,this.move(s.vertical)}goDownLeft(){this.currentFramePosY=3,this.posy+=o.playerMoveSpeed,this.posx-=o.playerMoveSpeed,this.move(s.vertical)}goDownRight(){this.currentFramePosY=1,this.posy+=o.playerMoveSpeed,this.posx+=o.playerMoveSpeed,this.move(s.vertical)}goLeft(){this.currentFramePosY=3,this.posx-=o.playerMoveSpeed,this.move(s.horizontal)}goRight(){this.currentFramePosY=1,this.posx+=o.playerMoveSpeed,this.move(s.horizontal)}constructor(e){this.leftOffset=15,this.frameWidth=65,this.frameHeight=130,this.currentFramePosX=0,this.currentFramePosY=0,this.posx=0,this.posy=0,this.scaleFactor=0,this.sprite=new Image,this.sprite.src=e,this.scaleFactor=o.playerScaleFactor}},c=class{},h=class{initSceneConfig(){let{backgroundSheetPath:e,backgroundLargeSheetPath:t,backgroundSmallSheetPath:r,canvasWidthPercent:i,canvasHeightSize:s}=o;this.ctx.canvas.width=document.documentElement.clientWidth*i,document.documentElement.clientWidth>1366&&document.documentElement.clientWidth<=1920&&(this.sprite.src=t,this.ctx.canvas.height=s,this.player.scaleFactor+=.2),document.documentElement.clientWidth>768&&document.documentElement.clientWidth<=1366&&(this.sprite.src=e,this.ctx.canvas.height=s),document.documentElement.clientWidth<=768&&(this.sprite.src=r,this.ctx.canvas.height=this.sprite.height,this.player.scaleFactor-=.2),this.player.setPosition(o.playerDefaultPosition[0],o.playerDefaultPosition[1])}renderScreen(){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.ctx.drawImage(this.sprite,0,0),this.ctx.drawImage(this.player.sprite,this.player.getFrameWidth(),this.player.getFrameHeight(),66,120,this.player.posx,this.player.posy,80*this.player.scaleFactor,120*this.player.scaleFactor),requestAnimationFrame(this.renderScreen.bind(this))}makePlayerMove(){let e=new Map,t=t=>{if(e.set(t.key,!0),e.get("w")){if(e.get("a")){this.player.goUpLeft();return}if(e.get("d")){this.player.goUpRight();return}this.player.goUp()}if(e.get("s")){if(e.get("a")){this.player.goDownLeft();return}if(e.get("d")){this.player.goDownRight();return}this.player.goDown()}e.get("a")&&this.player.goLeft(),e.get("d")&&this.player.goRight()},r=t=>{e.set(t.key,!1)};window.addEventListener("keydown",t),window.addEventListener("keyup",r)}constructor(e){this.ctx=e,this.sprite=new Image,this.player=new l(o.playerSheetPath),this.collisions=new c}},d=function(){let e=(0,n.useRef)(null),t=function(){let e=o.canvasWidthPercent,t={"0.2":"w-1/5","0.4":"w-2/5","0.5":"w-6/12","0.6":"w-3/5","0.8":"w-4/5"};return void 0===t[e.toString()]?"":t[e.toString()]}();return(0,n.useEffect)(()=>{let t;if(!e.current)throw Error("failed to get target canvas to render animation");let r=e.current.getContext("2d");null!=r&&((t=new h(r)).initSceneConfig(),t.renderScreen(),t.makePlayerMove())}),(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{id:"mainFrame",className:"absolute top-20 w-full",children:(0,a.jsx)("div",{className:"".concat(t," mx-auto ring ring-green-800 rounded"),children:(0,a.jsx)("canvas",{ref:e,id:"sceneAnimation"})})})})}},2566:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return a}});var i=r(5893),s=[{name:"PERSONAL INFO",isCurrentItem:!0},{name:"TOOLS",isCurrentItem:!1},{name:"CONTACT",isCurrentItem:!1}],a=function(){return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("nav",{className:"absolute w-full top-0 left-0 bar",children:(0,i.jsxs)("div",{className:"flex flex-wrap items-center justify-start mx-auto",children:[(0,i.jsxs)("button",{"data-collapse-toggle":"navbar-default",type:"button",className:"inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600","aria-controls":"navbar-default","aria-expanded":"false",children:[(0,i.jsx)("span",{className:"sr-only",children:"Open main menu"}),(0,i.jsx)("svg",{className:"w-6 h-6","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{fillRule:"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",clipRule:"evenodd"})})]}),(0,i.jsx)("div",{className:"hidden w-full md:block md:w-auto",id:"navbar-default",children:(0,i.jsx)("ul",{className:"flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0",children:s.map(e=>(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"#",className:"block text-white py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:text-white",children:e.name})},e.name))})})]})})})}},85:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return c}});var i=r(5893),s=r(9008),a=r.n(s),n=r(2566),o=r(8425),l=r(245);function c(){return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)("main",{children:[(0,i.jsxs)(a(),{children:[(0,i.jsx)("title",{children:"NG CHUN HOU | Portfolio"}),(0,i.jsx)("meta",{name:"description",content:"my portfolio site"}),(0,i.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,i.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,i.jsx)(n.default,{}),(0,i.jsx)(o.default,{}),(0,i.jsx)(l.default,{})]})})}},9008:function(e,t,r){e.exports=r(2636)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);