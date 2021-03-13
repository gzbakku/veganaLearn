//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-list';
const pageName = 'docsPage';
const contName = 'makeCont';
const panelName = 'listPanel';

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
  title:'Vegana Api : Engine Make List',
  meta:[
    {
      name:'description',
      content:'how to make a list element in vegana js. how to make a ul list in vegana js.how to make a ol list in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,list,ol,li,ul'
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
