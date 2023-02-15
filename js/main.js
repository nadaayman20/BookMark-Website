var subBtn = document.getElementById("sub");
var siteName = document.getElementById("name");
var siteURL= document.getElementById("url");
var invalidData = document.getElementById("invalidData");

var counter;

var allSites=[];

if(localStorage.getItem("allSites") != null){
    allSites = JSON.parse(localStorage.getItem("allSites"));
    displayAllSites();
}

function addSite(){

if( subBtn.innerHTML == "Submit"){
    var bookMark={
        name:siteName.value,
        url: siteURL.value
      }
        allSites.push(bookMark);
        displayAllSites();
        localStorage.setItem("allSites",JSON.stringify(allSites));
        clearSite();
     }  
  
 else{
        var bookMark={
            name:siteName.value,
            url: siteURL.value
          }
            allSites.splice(counter,1,bookMark);
            displayAllSites();
            localStorage.setItem("allSites",JSON.stringify(allSites));
            clearSite();
            subBtn.innerHTML = "Submit";      
    }
}

function clearSite(){
   siteName.value="";
   siteURL.value= "";
}
function displayAllSites(){
     
    var cartona ="";
    for(var i=0 ; i< allSites.length ; i++){
        
        cartona +=  ` <tr>

        <td>${allSites[i].name}</td>
        <td><a class="btn btn-primary" onclick="visitSite()" href="${allSites[i].url}" target="_blank">visit</a></td>
      <td> <button class="btn btn-danger"onclick="deleteSite(${i})">Delete</button> </td>
       <td> <button class="btn btn-warning"onclick="updateSite(${i})">Update</button> </td>
    </tr> `
    }
    document.getElementById ('tbody').innerHTML =  cartona;
}

function deleteSite(index){

  allSites.splice(index,1);
  localStorage.setItem("allSites",JSON.stringify(allSites));
  displayAllSites();

}
function updateSite(index){
    counter =index;
    siteName.value=allSites[index].name;
    siteURL.value=allSites[index].url;
    subBtn.innerHTML = "Update Site";
    displayAllSites();
}

function search(term){

    var cartona= "";

    for(var i=0 ;i<allSites.length ; i++){

        if(allSites[i].name.toLowerCase().includes(term.toLowerCase()) == true){

            cartona +=  ` <tr>

        <td>${allSites[i].name}</td>
        <td><a class="btn btn-primary" onclick="visitSite()" href="${allSites[i].url}" target="_blank">visit</a></td>
      <td> <button class="btn btn-danger"onclick="deleteSite(${i})">Delete</button> </td>
       <td> <button class="btn btn-warning"onclick="updateSite(${i})">Update</button> </td>
    </tr> `
    }
}
    document.getElementById ('tbody').innerHTML =  cartona;

}
function visitSite(counter){
   allSites.splice(counter,0)
}

function nameValidation() {
    var regex = /[a-zA-Z]/;
    return regex.test(siteName.value);
  }
  
  function siteValidation() {
    var regex = /^(https|http):\/\//;
    return regex.test(siteURL.value);
  }
  
    subBtn.onclick= function () {

        if (siteName.value == "" || siteURL.value == "") {
            invalidData.innerHTML= "Fill in the two fields";
        } else {
          if (nameValidation() && siteValidation()) {
             addSite();
          } else {
            if(!nameValidation() && !siteValidation() ){
                invalidData.innerHTML= "Enter a Valid Name and URL Website ";
            }
            else if (!nameValidation()) {
                invalidData.innerHTML= "Enter a Valid Name";
            } else if (!siteValidation()) {
                invalidData.innerHTML= "Enter a Valid URL ";
            }
           
          
          }
        }
      };
