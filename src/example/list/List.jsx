import React from "react";
import "../index.css";

const COUNT = 5000;
const data = Array.from(Array(COUNT)).map((_, index) => {
  return {
    id: index,
    title: `item ${index}`,
    image:
      "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=251702416,2812893672&fm=26&gp=0.jpg",
  };
});

function renderItem(item) {
  return (
    <div key={item.id} className="item">
      {/* <img
        src={item.image}
        alt="img"
        style={{ width: '50px', height: '50px' }}
       /> */}
      <span>编号:{item.id}</span>
    </div>
  );
}

function ListDemo() {
  return (
    <div className="container">
      {data.map((item) => {
        return renderItem(item);
      })}
    </div>
  );
}

export default ListDemo;
