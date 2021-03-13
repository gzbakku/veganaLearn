//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-view';
const pageName = 'docsPage';
const contName = 'creatorCont';
const panelName = 'viewPanel';

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

const trackers = {
  title:'Vegana Api : Engine Make Creator Enter | Exit',
  meta:[
    {
      name:'description',
      content:'vegana creator api to trigger events when a dom element comes in or goes out of user view.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,creator,enter,exit'
    }
  ],
  function_data:{},
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
