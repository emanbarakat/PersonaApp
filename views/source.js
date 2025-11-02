const CallAPI=async function(){
    const inputBody={
    "inputText":document.querySelector('#inputText').value,
    "persona": document.querySelector('#persona').value,
    "audience": document.querySelector('#audience').value ,
    "length": Number(document.querySelector('#length').value),
    "provider": document.querySelector('#provider').value,
    "model": document.querySelector('#model').value,
    "context": document.querySelector('#context').value.split(",")
    }

    let response=await fetch("http://localhost:8080/generate",{
        method:"post",
        headers:{
            "content-type":"application/json",
        }
        ,
        body:JSON.stringify(inputBody)
    });

    let data=await response.json();
    console.log(data);

    generateDescription(data)


}