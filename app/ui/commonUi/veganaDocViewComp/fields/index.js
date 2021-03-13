const codemirror = require("./codemirror.js");
require("./javascript.js");

module.exports = {init:init};

function init(parent,field){

  const main = engine.make.div({
    parent:parent,
    class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field"
  });

  if(field.type === "heading"){
    make_heading(main,field.data.value);
  } else if(field.type === "paragraph"){
    make_paragraph(main,field.data.value);
  } else if(field.type === "image"){
    make_image(main,field.data);
  } else if(field.type === "code"){
    make_code(main,field.data);
  }

}

function make_code(parent,data){

  const main = engine.make.div({
    parent:parent,
    class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field-code"
  });

    const editor = engine.make.div({
      parent:main,
      class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field-code-editor"
    });
      const writer = codemirror(engine.get.element(editor),{
        value:data.value ? data.value : '',
        lineNumbers: true,
        mode:'javascript',
        lineWrapping: true,
        theme:'cobalt'
      });

    engine.make.div({
      parent:main,
      class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field-code-runner",
      text:"run",
      function:execute
    });

    const executer_cont = engine.make.div({
      parent:main,
      class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field-code-executer_cont"
    });
    let executer;
    async function execute(){
      if(executer){engine.view.remove(executer);}
      executer = engine.make.div({
        parent:main,
        class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field-code-executer_cont-executer"
      });
      let value = writer.getValue();
      if(value){
        while(value.indexOf("compId") >= 0){
          value = value.replace("compId",`"${executer}"`);
        }
        while(value.indexOf("pageId") >= 0){
          value = value.replace("pageId",`"${executer}"`);
        }
        while(value.indexOf("contId") >= 0){
          value = value.replace("contId",`"${executer}"`);
        }
        while(value.indexOf("panelId") >= 0){
          value = value.replace("panelId",`"${executer}"`);
        }
        while(value.indexOf("console.log") >= 0){
          value = value.replace("console.log",`log`);
        }
        while(value.indexOf("console.error") >= 0){
          value = value.replace("console.error",`log`);
        }
      }
      let outputs = ['//console output'];
      function log(m){
        console.log(m);
        if(typeof(m) === "object"){
          outputs.push(JSON.stringify(m,null,2));
        } else {
          outputs.push(m);
        }
      }

      await eval(`(async () => {\n${value}\n})()`);

      if(outputs.length > 1){
        const output_cont = engine.make.div({
          parent:executer,
          class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field-code-executer_cont-executer-output"
        });
        let collect = '';
        for(let l of outputs){
          collect += "\n" + l + '\n';
        }
        codemirror(engine.get.element(output_cont),{
          value:collect,
          lineNumbers: true,
          lineWrapping: true,
          theme:'cobalt'
        });
      }
    }

}

function make_image(parent,data){
  const main = engine.make.div({
    parent:parent,
    class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field-image"
  });
    engine.make.image({
      parent:main,
      type:'url',
      location:'http://localhost:5566/' + data.location,
      draw:{
        all:{
          height:data.height,
          width:data.width
        }
      }
    });
}

function make_paragraph(parent,value){
  if(!value){value = '';}
  while(value.indexOf("\n") >= 0){
    value = value.replace("\n","<br>");
  }
  // console.log(value);
  engine.make.div({
    parent:parent,
    class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field-paragraph",
    text:value
  });
}

function make_heading(parent,value){
  engine.make.div({
    // level:1,
    parent:parent,
    class:"ui-cmmon-comp-veganaDocViewComp-main-rows-row-containers-container-field-heading",
    text:value
  });
}
