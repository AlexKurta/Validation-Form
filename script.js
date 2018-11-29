var formDef1 =
  [
    {label:'Название сайта:',kind:'longtext',name:'sitename'},
    {label:'URL сайта:',kind:'longtext',name:'siteurl'},
    {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
    {label:'E-mail для связи:',kind:'shorttext',name:'email'},
    {label:'Рубрика каталога:',kind:'combo',name:'division', variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
    {label:'Размещение:',kind:'radio',name:'payment',variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
    {label:'Разрешить отзывы:',kind:'check',name:'votes'},
    {label:'Описание сайта:',kind:'memo',name:'description'},
    {label:'Опубликовать:',kind:'submit'},
  ];

var newId = 0;           
            
function createForm (formDef) {
  newId++;
  var form = document.createElement('form');
  form.name = 'forma';
  form.method = 'get';
  form.action = 'http://fe.it-academy.by/TestForm.php';
  document.body.appendChild(form);
                
  for (let i = 0; i < formDef.length; i++) {
    let label = document.createElement('label'),
        br = document.createElement('br');                  
    label.textContent = formDef[i].label;
    label.setAttribute('for', `${newId}_${i}`);
    form.appendChild(label);

    switch (formDef[i].kind) {
      case 'longtext':
      case 'number':
      case 'shorttext':
        let input = document.createElement('input'),
            className = formDef[i].kind;
        input.type = 'text';
        input.className = className;
        input.name = formDef[i].name;
        input.id = `${newId}_${i}`;
        form.appendChild(input);
        break;

      case 'combo':
        let select = document.createElement('select'),
            variants = formDef[i].variants;
        select.name = formDef[i].name;                                                            
        for (let i = 0; i < variants.length; i++) {
          let option = document.createElement('option');
          option.value = variants[i].value;
          option.textContent = variants[i].text; 
          select.appendChild(option);
        }
        form.appendChild(select);
        break;

      case 'radio':
        let variant = formDef[i].variants,
            name = formDef[i].name;
        for (let i = 0; i < variant.length; i++) {
          let input = document.createElement('input'),
              label = document.createElement('label');
          input.type = 'radio';
          label.setAttribute('for', `${newId}x${i}`);
          label.className = 'radio';
          input.id = `${newId}x${i}`;
          input.name = name;
          input.value = variant[i].value;
          label.textContent = variant[i].text;
          form.appendChild(input);
          form.appendChild(label);   
        }                            
        break;

      case 'check':
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('checked', true);
        form.appendChild(checkbox);
        break;

      case 'memo':
        let textarea = document.createElement('textarea'),
            br = document.createElement('br');
        textarea.name = formDef[i].name;
        form.appendChild(br);                            
        form.appendChild(textarea);
        break;
                        
			case 'submit':
        let submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = formDef[i].label;
        form.appendChild(submit);
        submit.previousElementSibling.remove();           
		}                    
    form.appendChild(br);
  }
}
createForm (formDef1);
