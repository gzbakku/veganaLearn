(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-session';
const pageName = 'docsPage';
const contName = 'sessionCont';

//cont ids
let parentId,contId;

//any parent data can be imported in init function vars
const init = (pid) => {                                                //pid = parent id(parent = page)

  if(pid == null || pid == undefined){
    return engine.common.error('parent_page_id_not_found');            //check for prent page id
  }

  engine.common.tell('cont initiated',log);                            //common tell logger can be closed if global const log be set to false

  parentId = pid;                                                      //parent id is used to route
  contId = parentId + contRef;                                         //contid is used by child doms

  engine.make.init.cont(contId,parentId,"cont");                       //initiate cont in router before building dom

  build();                                                             //start dom build here

}

function build(){

  if(!data){data = {};}
  if(!data.panel){data.panel = 'startPanel';}

  require("./panels/startPanel/panel");
  require("./panels/checkPanel/panel");
  require("./panels/getPanel/panel");
  require("./panels/constantsPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","sessionCont",data.panel);
  engine.router.navigate.to.panel(mod);

}

const contControllers = {
  init:init,
  ref:contRef,
  type:type,
  contName:contName,
  panelModules:{},        //dont fill this object, imported panels are loaded automatically.
  panelList:{},
  trackers:trackers
};

module.exports = contControllers;
window.pageModules[pageName].contModules[contName] = contControllers;

},{"./panels/checkPanel/panel":2,"./panels/constantsPanel/panel":3,"./panels/getPanel/panel":4,"./panels/startPanel/panel":5}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-check';
const pageName = 'docsPage';
const contName = 'sessionCont';
const panelName = 'checkPanel';

//ids
let parentId,panelId;

//init dom build here
const init = (pid) => {

  engine.common.tell('panel initiated',log);

  if(pid == null || pid == undefined){
    return engine.common.error('parent_cont_id_not_found');            //check for prent page id
  }

  parentId = pid;
  panelId = parentId + panelRef;

  engine.make.init.panel(panelId,parentId,"panel");

  build();

}

//these trackers will be triggered when this module is routed
const trackers = {
  title:'sample panel title',
  meta:[
    {
      name:'description',
      content:'this is a sample panel description'
    },
    {
      name:'keywords',
      content:'panel,vegana'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
  function:(function_data)=>{}
};

//fetch data before dom build here
function fetch(){
  engine.common.tell('fetching',log);
  build();
}

//build dom here
function build(){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div({
    id:"greetings",
    parent:panelId,
    class:'greetings',
    text:'greetings this is the check panel'
  });

  return true; //always return

}

const panelController = {
  init:init,
  ref:panelRef,
  type:type,
  panelName:panelName,
  trackers:trackers
};
engine.router.set.panelModule(pageName,contName,panelName,panelController);
module.exports = panelController;

},{}],3:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-constants';
const pageName = 'docsPage';
const contName = 'sessionCont';
const panelName = 'constantsPanel';

//ids
let parentId,panelId;

//init dom build here
const init = (pid) => {

  engine.common.tell('panel initiated',log);

  if(pid == null || pid == undefined){
    return engine.common.error('parent_cont_id_not_found');            //check for prent page id
  }

  parentId = pid;
  panelId = parentId + panelRef;

  engine.make.init.panel(panelId,parentId,"panel");

  build();

}

//these trackers will be triggered when this module is routed
const trackers = {
  title:'sample panel title',
  meta:[
    {
      name:'description',
      content:'this is a sample panel description'
    },
    {
      name:'keywords',
      content:'panel,vegana'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
  function:(function_data)=>{}
};

//fetch data before dom build here
function fetch(){
  engine.common.tell('fetching',log);
  build();
}

//build dom here
function build(){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div({
    id:"greetings",
    parent:panelId,
    class:'greetings',
    text:'greetings this is the constants panel'
  });

  return true; //always return

}

const panelController = {
  init:init,
  ref:panelRef,
  type:type,
  panelName:panelName,
  trackers:trackers
};
engine.router.set.panelModule(pageName,contName,panelName,panelController);
module.exports = panelController;

},{}],4:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-get';
const pageName = 'docsPage';
const contName = 'sessionCont';
const panelName = 'getPanel';

//ids
let parentId,panelId;

//init dom build here
const init = (pid) => {

  engine.common.tell('panel initiated',log);

  if(pid == null || pid == undefined){
    return engine.common.error('parent_cont_id_not_found');            //check for prent page id
  }

  parentId = pid;
  panelId = parentId + panelRef;

  engine.make.init.panel(panelId,parentId,"panel");

  build();

}

//these trackers will be triggered when this module is routed
const trackers = {
  title:'sample panel title',
  meta:[
    {
      name:'description',
      content:'this is a sample panel description'
    },
    {
      name:'keywords',
      content:'panel,vegana'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
  function:(function_data)=>{}
};

//fetch data before dom build here
function fetch(){
  engine.common.tell('fetching',log);
  build();
}

//build dom here
function build(){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div({
    id:"greetings",
    parent:panelId,
    class:'greetings',
    text:'greetings this is the get panel'
  });

  return true; //always return

}

const panelController = {
  init:init,
  ref:panelRef,
  type:type,
  panelName:panelName,
  trackers:trackers
};
engine.router.set.panelModule(pageName,contName,panelName,panelController);
module.exports = panelController;

},{}],5:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-start';
const pageName = 'docsPage';
const contName = 'sessionCont';
const panelName = 'startPanel';

//ids
let parentId,panelId;

//init dom build here
const init = (pid) => {

  engine.common.tell('panel initiated',log);

  if(pid == null || pid == undefined){
    return engine.common.error('parent_cont_id_not_found');            //check for prent page id
  }

  parentId = pid;
  panelId = parentId + panelRef;

  engine.make.init.panel(panelId,parentId,"panel");

  build();

}

//these trackers will be triggered when this module is routed
const trackers = {
  title:'sample panel title',
  meta:[
    {
      name:'description',
      content:'this is a sample panel description'
    },
    {
      name:'keywords',
      content:'panel,vegana'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
  function:(function_data)=>{}
};

//fetch data before dom build here
function fetch(){
  engine.common.tell('fetching',log);
  build();
}

//build dom here
function build(){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div({
    id:"greetings",
    parent:panelId,
    class:'greetings',
    text:'greetings this is the start panel'
  });

  return true; //always return

}

const panelController = {
  init:init,
  ref:panelRef,
  type:type,
  panelName:panelName,
  trackers:trackers
};
engine.router.set.panelModule(pageName,contName,panelName,panelController);
module.exports = panelController;

},{}]},{},[1]);
