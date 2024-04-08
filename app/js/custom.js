Util={};
var EntityId;
var EntityName;
var temp;
var emailid;
var message;
   //Subscribe to the EmbeddedApp onPageLoad event before initializing the widget 
   ZOHO.embeddedApp.on("PageLoad",function(data)
  {


      EntityId=data.EntityId[0];
      console.log(EntityId);
      entityname=data.Entity;  

//Get details of a record using getRecord JS SDK
      ZOHO.CRM.API.getRecord({Entity:entityname,RecordID:EntityId})
.then(function(data){
    console.log(data);
    dataa=data.data[0];
    console.log(dataa);
    email=dataa.Email;
    console.log(email);
    customeremail=encodeURIComponent(email);
    console.log(customeremail);
    casestatus=dataa.Status;

    var x = {
          "customeremailid":customeremail    
  }


  //Invoking the CreateNewEvent API by passing the constructed data set
  ZOHO.CRM.CONNECTOR.invokeAPI("zohocrm36.zohocrmconnector.connectorapi",x)
  .then(function(dataa){
      console.log(dataa);
      response=dataa.response;
      console.log(response);
      parseresponse=JSON.parse(response);
      console.log(parseresponse);
      representation=parseresponse.representation;
      console.log(representation);
      
        sessionid=representation.session_id;
        console.log(sessionid);
        technicianurl = representation.technician_url;
        console.log(technicianurl);
      
       document.getElementById("customeremail").value=email;
       console.log(document.getElementById("customeremail").value);
       document.getElementById("myAnchor").href = technicianurl;
       console.log(document.getElementById("myAnchor").href);


       var recordData = {
        "Name": "Remote Session - " + sessionid,
        "zohocrm36__Session_ID": sessionid,
        "zohocrm36__Case_Name":EntityId,
        "zohocrm36__Case_status_during_session_initiation":casestatus,

  }
ZOHO.CRM.API.insertRecord({Entity:"zohocrm36__session_report",APIData:recordData,Trigger:[]}).then(function(data){
  console.log(data);
  });
       
 

})
})
})
