//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-make';
const pageName = 'docsPage';
const contName = 'makeCont';

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
  if(!data.panel){data.panel = 'divPanel';}

  require("./panels/aPanel/panel");

  require("./panels/divPanel/panel");
  require("./panels/textPanel/panel");
  require("./panels/spanPanel/panel");
  require("./panels/pPanel/panel");
  require("./panels/headingPanel/panel");
  require("./panels/imagePanel/panel");
  require("./panels/addClassPanel/panel");
  require("./panels/removeClassPanel/panel");
  require("./panels/stylePanel/panel");

  require("./panels/selectPanel/panel");
  require("./panels/inputPanel/panel");
  require("./panels/textareaPanel/panel");
  require("./panels/buttonPanel/panel");

  require("./panels/listPanel/panel");

  require("./panels/elementPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","makeCont",data.panel);
  engine.router.navigate.to.panel(mod);

}

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
