import React from "react";

export const Stars = ({ rating }) => {
  return (
    <div class="flex items-center">
      <svg
        class={`-ml-0.5 mx-1 w-4 h-4 fill-current text-${
          rating > 0 ? "yellow" : "gray"
        }-500`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
      <svg
        class={`mx-1 w-4 h-4 fill-current text-${
          rating > 1 ? "yellow" : "gray"
        }-500`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
      <svg
        class={`mx-1 w-4 h-4 fill-current text-${
          rating > 2 ? "yellow" : "gray"
        }-500`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
      <svg
        class={`mx-1 w-4 h-4 fill-current text-${
          rating > 3 ? "yellow" : "gray"
        }-500`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
      <svg
        class={`mx-1 w-4 h-4 fill-current text-${
          rating > 4 ? "yellow" : "gray"
        }-500`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    </div>
  );
};
