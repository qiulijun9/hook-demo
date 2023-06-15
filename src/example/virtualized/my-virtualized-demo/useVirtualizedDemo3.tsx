import React from "react";
import { useDynamicVirtualized } from "../../../custom_hooks/index";
const count = 1000;
const items = Array.from(Array(count)).map((_, index) => {
  return {
    id: index,
    other: `${index} list`,
    width: 200 + Math.floor(Math.random() * 50),
    height: 100 + Math.floor(Math.random() * 50),
    image: "/test.jpeg",
  };
});

function DynamicVirtualized() {
  const { list, containerProps, wrapperProps } = useDynamicVirtualized(items, {
    itemHeight: 200,
  });

  return (
    <div
      {...containerProps}
      style={{
        width: "400px",
        height: "500px",
        margin: "0 auto",
        overflow: "auto",
        background: "#eee",
        border: "1px solid black",
      }}
    >
      <div {...wrapperProps}>
        {list.map((item: any) => (
          <img
            id={item.id}
            key={item.id}
            src={item.image}
            alt="img"
            style={{
              height: item.height,
              width: item.width,
              border: "1px solid red",
            }}
            {...item.props}
          />
        ))}
      </div>
    </div>
  );
}

export default DynamicVirtualized;
