//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-menuComp';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid,data) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build(data);                      //start build you can also start fetch here.

}

function build(data){

  let main = engine.make.div({
    parent:compId,
    class:'ui-common-comp-menu-main',
  });

  engine.make.div({
    parent:main,
    class:'ui-common-comp-menu-main-first_pad',
  });

  const iconCont = engine.make.div({
    parent:main,
    class:'ui-common-comp-menu-main-icon',
  });

    engine.make.image({
      parent:iconCont,
      class:'ui-common-comp-menu-main-icon-img',
      type:'local',
      location:'assets/images/icons/menu.png',
      function:()=>{
        engine.global.function.docsPageMenuToggle();
      }
    });

  engine.make.div({
    parent:main,
    class:'ui-common-comp-menu-main-title',
    text:'vegana js'
  });

  const buttons = engine.make.div({
    parent:main,
    class:'ui-common-comp-menu-main-buttons'
  });

  function make_buttons(){
    engine.make.div({
      parent:buttons,
      class:'ui-common-comp-menu-main-buttons-button',
    });
  }

}

module.exports = {init:init,ref:compRef,type:type}
