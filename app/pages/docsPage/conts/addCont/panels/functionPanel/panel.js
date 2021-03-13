//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-function';
const pageName = 'docsPage';
const contName = 'addCont';
const panelName = 'functionPanel';

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
  title:'Vegana Api : Engine Add Function',
  meta:[
    {
      name:'description',
      content:'how to use functions multiple times from different places in vegana js?'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,add,function'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
  function:(function_data)=>{}
};

function build(){

  const article = require("./vDoc.json");
  engine.ui.getComp("commonUi","articleComp").init(panelId,{
    article:article
  });

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
