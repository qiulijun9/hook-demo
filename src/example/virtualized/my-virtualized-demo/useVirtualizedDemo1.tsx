import React from "react";
import { useVirtualized } from "../../../custom_hooks/index";

let now = Date.now();

const items = Array.from(Array(100000)).map((_, index) => {
  return {
    id: index,
    other: `${index} list`,
  };
});

function useVirtualizedDemo1() {
  const { list, containerProps, wrapperProps } = useVirtualized(items, {
    itemHeight: 50,
  });

  return (
    // 没有优化之前
    // <div
    //   {...containerProps}
    //   style={{
    //     width: '300px',
    //     height: '400px',
    //     margin: '0 auto',
    //     overflow: 'auto',
    //     background: '#eee',
    //   }}
    // >
    //   <div {...wrapperProps}>
    //     {items.map(item => (
    //       <div style={{ height: 50 }} key={item.id}>
    //         编号: {item.id}
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div
      {...containerProps}
      style={{
        width: "500px",
        height: "600px",
        margin: "0 auto",
        overflow: "auto",
        background: "#eee",
        border: "1px solid red",
      }}
    >
      <div {...wrapperProps}>
        {list.map((item) => (
          <div style={{ height: 50, border: "1px solid black" }} key={item.id}>
            编号: {item.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export default useVirtualizedDemo1;
