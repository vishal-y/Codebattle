import { Panel, PanelResizeHandle } from "react-resizable-panels";
import Chip from "../../components/Chip";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import HomeEditor from "../../components/HomeEditor";

export default function Left({ AboutProblem, num, handleBack }) { // Destructure props correctly
  const tabs = ["Description"];
  const [selected, setSelected] = useState(tabs[0]);

  useEffect(() => {
    if (AboutProblem) {
      console.log('Updated AboutProblem:', AboutProblem); // Log updates for debugging
    }
  }, [AboutProblem]);

  return (
    <>
      <Panel
        defaultSize={28}
        minSize={26}
        maxSize={31}
        className="h-[98.9vh] min-h-[40rem] w-full flex justify-between items-center flex-col border border-[#1f1f1f] text-white rounded-2xl bg-[#100821] ml-2 m-1 mr-0"
      >
        <div className="p-8 h-full min-h-[100%]">
          <div className="py-4 flex justify-start gap-6 items-center">
            <div
              className="h-8 w-8 cursor-pointer flex justify-center shadow-2xl items-center bg-violet-300 p-2 rounded-full"
            >
              <FaArrowLeftLong onClick={handleBack} style={{ color: "black" }} size={15} />
            </div>

            <ul className="flex gap-4">
              {tabs.map((tab) => (
                <Chip
                  text={tab}
                  selected={selected === tab}
                  setSelected={setSelected}
                  key={tab}
                />
              ))}
            </ul>
          </div>

          {AboutProblem && ( // Conditional rendering to avoid accessing undefined properties
            <div id="desc" className="h-full max-h-[90%] overflow-y-scroll">
              <span className="text-white text-xl mt-2 flex justify-start items-center gap-2 mb-4">
               {num}. {AboutProblem.question}
                <span
                  className={
                    AboutProblem.difficulty !== "Hard"
                      ? AboutProblem.difficulty === "Easy"
                        ? "text-green-500 text-sm p-1 bg-slate-800 rounded-md"
                        : "text-yellow-500 text-sm p-1 bg-slate-800 rounded-md"
                      : "text-red-500 text-sm p-1 bg-slate-800 rounded-md"
                  }
                >
                  {AboutProblem.difficulty}
                </span>
              </span>
              <p className="mt-5">{AboutProblem.description}</p>
              <div className="mt-6">
                Expected Value :{" "}
                <div className="bg-slate-800 rounded-xl my-1 mt-2 p-2">
                  {AboutProblem.expectedValue}
                </div>
              </div>

              <div className="mt-3 mb-1 flex items-center justify-start">
                Expected Time complexity :{" "}
                <div className="p-2 bg-slate-800 rounded-xl my-2 ml-2">
                  {AboutProblem.timeComplexity}
                </div>
              </div>

              <div className="mt-1 mb-3 flex items-center justify-start">
                Expected Space complexity :{" "}
                <div className="p-2 bg-slate-800 rounded-xl my-2 ml-2">
                  {AboutProblem.spaceComplexity}
                </div>
              </div>
              <p>Test cases : </p>
              <div id="testCase" className="p-2 bg-slate-800 rounded-xl my-2 overflow-y-scroll">
                <ul>
                  {AboutProblem.testCases.map((testCase, index) => (
                    <li key={index} className="py-2 flex flex-col">
                      <span>{testCase.input}</span> ouput : {testCase.output}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="hidden w-[20rem] border max-w-[20rem]" id="sol">
          </div>

          {/* Uncomment if you want to use HomeEditor */}
          {/* <div className="hidden" id="sub">
            <div className="box-inset border border-[#685a96] rounded-md">
              <HomeEditor
                code={language == "cpp" ? solutioncpp : solutionjava}
                doAnimate={false}
              />
            </div>
          </div> */}
        </div>
      </Panel>
      <PanelResizeHandle />
    </>
  );
}
