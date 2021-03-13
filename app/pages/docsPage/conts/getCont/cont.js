//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-get';
const pageName = 'docsPage';
const contName = 'getCont';

//cont ids
let parentId,contId;

//any parent data can be imported in init function vars
const init = (pid,data) => {                                                //pid = parent id(parent = page)

  if(pid == null || pid == undefined){
    return engine.common.error('parent_page_id_not_found');            //check for prent page id
  }

  engine.common.tell('cont initiated',log);                            //common tell logger can be closed if global const log be set to false

  parentId = pid;                                                      //parent id is used to route
  contId = parentId + contRef;                                         //contid is used by child doms

  engine.make.init.cont(contId,parentId,"cont");                       //initiate cont in router before building dom

  build(data);                                                             //start dom build here

}

function build(data){

  if(!data){data = {};}
  if(!data.panel){data.panel = 'introPanel';}

  const osPanel = require("./panels/osPanel/panel");
  const hostPanel = require("./panels/hostPanel/panel");

  const elementPanel = require("./panels/elementPanel/panel");
  const elementPositionPanel = require("./panels/elementPositionPanel/panel");

  const platformPanel = require("./panels/platformPanel/panel");

  const pageModulePanel = require("./panels/pageModulePanel/panel");
  const contModulePanel = require("./panels/contModulePanel/panel");
  const panelModulePanel = require("./panels/panelModulePanel/panel");

  const bodyPanel = require("./panels/bodyPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","getCont",data.panel);
  engine.router.navigate.to.panel(mod);

}

//do not change current exports you are free to add your own though.
const contControllers = {
  init:init,
  ref:contRef,
  type:type,
  contName:contName,
  panelModules:{},        //dont fill this object, imported panels are loaded automatically.
  panelList:{},
  trackers:null
};

module.exports = contControllers;
window.pageModules[pageName].contModules[contName] = contControllers;
