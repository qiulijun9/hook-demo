import React from "react";
import { useVirtualized } from "../../../custom_hooks/index";

const items = Array.from(Array(100000)).map((_, index) => {
  return {
    id: index,
    other: `${index} list`,
  };
});

const computeIndexHeight = (index: number) => {
  return (
    (index % 3 === 0 ? 25 : index % 2 === 0 ? 50 : 70) + Math.random() * 100
  );
};

function useVirtualizedDemo2() {
  const { list, containerProps, wrapperProps, isScrolling } = useVirtualized(
    items,
    {
      itemHeight: computeIndexHeight,
    }
  );

  return (
    <div
      {...containerProps}
      style={{
        width: "300px",
        height: "400px",
        margin: "0 auto",
        overflow: "auto",
        background: "#eee",
        border: "1px solid black",
      }}
    >
      <div {...wrapperProps}>
        {isScrolling
          ? list.map((item) => (
              <div
                style={{
                  height: computeIndexHeight(item.id),
                  boxSizing: "border-box",
                  border: "1px solid black",
                }}
                key={item.id}
              >
                scrolling....
              </div>
            ))
          : list.map((item) => (
              <div
                style={{
                  height: computeIndexHeight(item.id),
                  boxSizing: "border-box",
                  border: "1px solid black",
                }}
                key={item.id}
              >
                实际内容: {item.id}
              </div>
            ))}
      </div>
    </div>
  );
}

export default useVirtualizedDemo2;
