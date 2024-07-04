export var menuStorage = JSON.parse(localStorage.getItem("menu"));
let menuDat;
let discountDat;


let fileInput = document.getElementById('fileInput');

if (fileInput){
    fileInput.addEventListener('change', function(e){
        var file = e.target.files[0];
        var reader = new FileReader();
    
        reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });
    
            var menuObject = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            var discountObject = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]]);
            console.log(menuObject);
            console.log(discountObject);
            // console.log(xlRowObject); // You can do anything you want with the parsed data
            // document.getElementById('output').innerHTML = JSON.stringify(xlRowObject, null, 2);

            // discountDat = discountObject;
            menuDat = menuObject;
            discountDat = discountObject;
        };
    
        reader.readAsArrayBuffer(file);
    });
}

let fileUpload = document.getElementById('fileUpload')

if (fileUpload){
    fileUpload.addEventListener('click', function(){
        let menu = rearrangeMenu(menuDat);
        localStorage.setItem("discountCode", JSON.stringify({discountDat}));
        localStorage.setItem("menu", JSON.stringify({menu}));
    });
};

function rearrangeMenu(menuData){
    let menuCategory = [];

    console.log(menuData);
    for (let i = 0; i<menuData.length; i++){
        let category = menuData[i]['category'];
        if (!(menuCategory.includes(category))){
            menuCategory.push(category);
        };
    };

    let menuOrganised = [];

    for (let i = 0; i<menuCategory.length; i++){
        for (let j = 0; j<menuData.length; j++){
            let itemCategory = menuData[j]['category'];
            if(itemCategory === menuCategory[i]){
                menuOrganised.push(menuData[j]);
            };
        };
    };

    return menuOrganised;
};
