let a = document.getElementsByTagName("h1");
console.log(a);
let b = setTimeout(()=>{
    a[1].innerText = "Web Designer";
},2000);
console.log(b);