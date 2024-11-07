function Decoration({ margin, style }: { margin: string; style: string }) {
  return (
    <div className="w-fit h-9 flex justify-center items-center">
      <div
        className={`rounded-full ${style} bg-[#8E1717] border border-white`}
      ></div>
      <div
        className={`rounded-full ${style} ${margin} bg-[#9052FC] border border-white`}
      ></div>
      <div
        className={`rounded-full ${style} ${margin} bg-[#FFE8AF] border border-white`}
      ></div>
      <div
        className={`rounded-full ${style} ${margin} bg-[#0F172A] border border-white`}
      ></div>
      <div
        className={`rounded-full ${style} ${margin} bg-[#CC9F9B] items-center flex justify-center text-white border border-white`}
      >
        +10
      </div>
    </div>
  );
}

export default Decoration;
