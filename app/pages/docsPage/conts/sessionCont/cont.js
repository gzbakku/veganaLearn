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
