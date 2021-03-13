//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-docs";
const pageName = 'docsPage';

//init page
const init = (data) => {
  engine.make.init.page(pageId,"page");  //init page
  build(data);                               //start build
}

//these trackers will be triggered when this module is routed
const trackers = {
  title:'vegana js docs',
  meta:[
    {
      name:'description',
      content:'vegana js docs for apis provided by engine to build ui with structured components and a cover around native web and os apis.'
    },
    {
      name:'keywords',
      content:'vegana,js,docs,apis'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
  function:(function_data)=>{}
};

//build page
function build(data){

  if(!data){data = {};}
  if(!data.cont){data.cont = 'addCont';}
  if(data.panel){
    data.panel = data.panel.replace("Panel","");
  }
  engine.ui.getComp('commonUi','menuComp').init(pageId);
  engine.ui.getComp('commonUi','sidepanelComp').init(pageId,{
    page:'docsPage',
    cont:data.cont.replace("Cont",""),
    panel:data.panel
  });

  let routerCls = 'page-docs-router-conts';
  if(engine.get.platform("mobile")){
    routerCls = 'page-docs-router-conts-mobile';
  }

  let routerId = engine.router.init.conts(pageId,routerCls);
  engine.global.function.toCont(data.cont.replace("Cont",""),data.panel);

  let full = false;
  engine.add.function("docsPageContRouterToggle",()=>{
    if(full){
      engine.make.addClass({id:routerId,class:'page-docs-router-conts-half'});
      engine.make.removeClass({id:routerId,class:'page-docs-router-conts-full'});
      full = false;
    } else {
      engine.make.addClass({id:routerId,class:'page-docs-router-conts-full'});
      engine.make.removeClass({id:routerId,class:'page-docs-router-conts-half'});
      full = true;
    }
  });


  engine.add.function("docsPageMenuToggle",()=>{
    if(engine.get.platform("mobile")){
      return engine.global.function.docsPageMobilMenu().toggle();
    }
    engine.global.function.docsPageContRouterToggle();
    engine.global.function.docsPageSideBarToggle();
  });
  if(false){
    setInterval(function () {
      engine.global.function.docsPageMenuToggle();
    }, 2000);
  }
  if(false){
    setTimeout(function () {
      engine.global.function.docsPageMenuToggle();
    }, 2000);
  }

}

//do not change current exports you are free to add your own though.
let pageControllers = {
  init:init,
  ref:pageId,
  type:type,
  name:pageName,
  contModules:{},
  contList:{},
  trackers:trackers
};
module.exports = pageControllers;
window.pageModules[pageName] = pageControllers;
