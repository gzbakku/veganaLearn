//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-sidepanelComp';             //dont worry about this
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

async function build(data){

  let main;
  if(engine.get.platform("mobile")){
    let mobileMenu = await engine.ui.getComp('commonUi','mobileMenuComp').init(compId,{
      integrate:true, //default is false
      globalFunctionName:'docsPageMobilMenu',  //default is menu
      only_body:true
    });
    // mobileMenu.functions.open();
    main = mobileMenu.body;
  } else {
    main = engine.make.div({
      parent:compId,
      class:'ui-common-comp-sidepanelComp-main'
    });
    let showing = true;
    engine.add.function("docsPageSideBarToggle",()=>{
      if(showing){
        engine.make.addClass({id:main,class:'ui-common-comp-sidepanelComp-main_close'});
        engine.make.removeClass({id:main,class:'ui-common-comp-sidepanelComp-main_open'});
        showing = false;
      } else {
        engine.make.removeClass({id:main,class:'ui-common-comp-sidepanelComp-main_close'});
        engine.make.addClass({id:main,class:'ui-common-comp-sidepanelComp-main_open'});
        showing = true;
      }
    });
    //test
    if(false){
      setInterval(function () {
        engine.global.function.docsPageSideBarToggle();
      }, 2000);
    }
    if(false){
      setTimeout(function () {
        engine.global.function.docsPageSideBarToggle();
      }, 2000);
    }
  }

  let sections = [
    {name:'add',panels:['object','function','comp']},
    {name:'binder',panels:['hover','click','files','text','number','value','active','boolean']},
    {name:'common',panels:['tell','error']},
    {name:'data',panels:['intro','get','set','reset','delete']},
    {name:'get',panels:['os','host','element', 'elementPosition','platform','pageModule', 'contModule','panelModule','body']},
    {name:'loader',panels:[
      {name:'load',panels:['image','wasm','js','comp','page','cont','panel','sassPack']},
      {name:'hook',panels:['comp','page','cont','panel']},
      'css'
    ],withSubsections:true},
    {name:'creator',panels:['intro','draw','events','expire','function','timer','touch','view']},
    {name:'make',panels:[
      'a',
      'div','text','span','p','heading','image',
      'addClass','removeClass','style',
      'select','input','textarea','button',
      'list',
      'element'
    ]},
    {name:'meta',panels:['intro','add','update','delete']},
    {name:'params',panels:[
      'get','add','delete',
      {name:'native',panels:['get','push']},
    ],withSubsections:true},
    {name:'request',panels:[]},
    {name:'router',panels:['intro','comp','page','cont','panel']},
    {name:'session',panels:['start','check','get','constants']},
  ];

  const sections_cont = engine.make.div({
    parent:main,
    class:'ui-common-comp-sidepanelComp-sections'
  });

  for(let section of sections){
    make_section(sections_cont,section,null,data.cont,data.panel);
  }

}

function make_section(parent,section,parent_section,cont,panel){

  const section_cont = engine.make.div({
    parent:parent,
    class:'ui-common-comp-sidepanelComp-sections-section'
  });

    let contName = parent_section ? parent_section : section.name;
    contName += "Cont";

    const contHref = engine.make.a({
      parent:section_cont,
      class:'ui-common-comp-sidepanelComp-sections-section-href',
      type:'local',
      page:'docsPage',
      cont:contName,
      superFunction:toggle
    });

    const title = engine.make.div({
      parent:contHref,
      class:'ui-common-comp-sidepanelComp-sections-section-title',
      // function:toggle
    });

      engine.make.div({
        parent:title,
        class:'ui-common-comp-sidepanelComp-sections-section-title-text',
        text:section.name,
      });

      const titleImageCont = engine.make.div({
        parent:title,
        class:'ui-common-comp-sidepanelComp-sections-section-title-icon',
      });

        let arrow;
        if(section.panels.length > 0){
          arrow = engine.make.image({
            parent:titleImageCont,
            class:'ui-common-comp-sidepanelComp-sections-section-title-icon-img',
            type:'local',
            location:'assets/images/icons/right-arrow.png'
          });
        }

    const links = engine.make.div({
      parent:section_cont,
      class:'ui-common-comp-sidepanelComp-sections-section-links'
    });

    let showing = false;
    // if(section.name === "loader" || section.name === "hook"){showing = true;}

    if(section.name === cont){
      showing = true;
    }
    if(panel && panel.indexOf("-") >= 0){
      let groupName = panel.split("-")[0];
      if(section.name === groupName){
        showing = true;
      }
    }

    if(!showing){engine.view.hide(links);} else {
      engine.make.addClass({id:arrow,class:'ui-common-comp-sidepanelComp-sections-section-title-icon-img-down'});
    }
    function toggle(){
      if(section.panels.length === 0){
        return engine.global.function.toCont(section.name,null);
      }
      if(showing){
        engine.make.addClass({id:arrow,class:'ui-common-comp-sidepanelComp-sections-section-title-icon-img-right'});
        engine.make.removeClass({id:arrow,class:'ui-common-comp-sidepanelComp-sections-section-title-icon-img-down'});
        engine.view.hide(links);
        showing = false;
      } else {
        engine.make.removeClass({id:arrow,class:'ui-common-comp-sidepanelComp-sections-section-title-icon-img-right'});
        engine.make.addClass({id:arrow,class:'ui-common-comp-sidepanelComp-sections-section-title-icon-img-down'});
        engine.view.show(links);
        showing = true;
      }
    }

      for(let link of section.panels){

        if(typeof(link) === "string"){//make panel text links

          let panelName = link;
          if(parent_section){
            panelName = section.name + "-" + link;
          }
          let contName = section.name;
          if(parent_section){
            contName = parent_section;
          }

          let href = engine.make.a({
            parent:links,
            class:'ui-common-comp-sidepanelComp-sections-section-links-link',
            type:'local',
            page:'docsPage',
            cont:contName+"Cont",
            panel:panelName+"Panel",
            superFunction:()=>{
              engine.global.function.toCont(contName,panelName);
            }
          });

            let link_cls = "ui-common-comp-sidepanelComp-sections-section-links-link-text";
            if(section.withSubsections){
              link_cls += " ui-common-comp-sidepanelComp-sections-section-links-link-text-withSubsections"
            }

            engine.make.div({
              parent:href,
              class:link_cls,
              text:link,
            });

        } else {//make text links

          const subSection = engine.make.div({
            parent:links,
            class:'ui-common-comp-sidepanelComp-sections-section-links-subSection',
          });

          make_section(subSection,link,section.name,cont,panel);

        }//make subsections



      }//loop through panels

}

module.exports = {init:init,ref:compRef,type:type}
