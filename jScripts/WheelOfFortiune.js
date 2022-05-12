
let container = document.querySelector(".container2");
let number = Math.ceil(Math.random() * 1000);
let arrow = document.getElementsByClassName("arrow");

//getOffset(arrow);

//function getOffset(el) {
//    alert("in");
//    const rect = el.getBoundingClientRect();
//    alert(
//    "left:" + rect.left +
//        "top:" + rect.top);
//}



spinWheel = () => {
	container.style.transform = "rotate(" + number + "deg)";
	number += Math.ceil(Math.random() * 1000);
}
