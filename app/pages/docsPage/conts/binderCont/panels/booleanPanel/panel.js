//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-boolean';
const pageName = 'docsPage';
const contName = 'binderCont';
const panelName = 'booleanPanel';

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
  title:'Vegana Api : Engine Binder Boolean',
  meta:[
    {
      name:'description',
      content:'this api was used before active api to check if checkbox is checked was added it just returns a JSON parsed object of the value from a dom element.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,binder,boolean'
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
