import ReactLoading from "react-loading";

const Loading = ({ color }: { color: string }) => (
  <ReactLoading
    type="balls"
    color={color}
    height={"20px"}
    width={"40px"}
    className="z-50 fixed bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  />
);

export default Loading;
