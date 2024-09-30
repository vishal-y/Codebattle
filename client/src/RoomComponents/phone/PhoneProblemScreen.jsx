import Chip from "../../components/Chip";

export default function PhoneProblemScreen({ tabs, selected, setSelected, questionData, num }) {
  return (
    <div className="text-white px-8 overflow-y-scroll h-screen ">
      <div className="py-4 flex justify-start gap-6 items-center">
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

      <div id="desc" className="h-full overflow-y-scroll">
        <span className="text-white text-xl mt-2 flex justify-start items-center gap-2 mb-4">
          {num}. {questionData.question}
          <span
            className={
              questionData.difficulty !== "Hard"
                ? questionData.difficulty === "Easy"
                  ? "text-green-500 text-sm p-1 bg-slate-800 rounded-md"
                  : "text-yellow-500 text-sm p-1 bg-slate-800 rounded-md"
                : "text-red-500 text-sm p-1 bg-slate-800 rounded-md"
            }
          >
            {questionData.difficulty}
          </span>
        </span>
        <p className="mt-5">{questionData.description}</p>
        <div className="mt-6">
          Expected Value :{" "}
          <div className="bg-slate-800 rounded-xl my-1 mt-2 p-2">
            {questionData.expectedValue}
          </div>
        </div>

        <div className="mt-3 mb-1 flex items-center justify-start">
          Expected Time complexity :{" "}
          <div className="p-2 bg-slate-800 rounded-xl my-2 ml-2">
            {questionData.timeComplexity}
          </div>
        </div>

        <div className="mt-1 mb-3 flex items-center justify-start">
          Expected Space complexity :{" "}
          <div className="p-2 bg-slate-800 rounded-xl my-2 ml-2">
            {questionData.spaceComplexity}
          </div>
        </div>
        <p>Test cases : </p>
        <div id="testCase" className="p-2 bg-slate-800 rounded-xl my-2 overflow-y-scroll">
          <ul>
            {questionData.testCases.map((testCase, index) => (
              <li key={index} className="py-2 flex flex-col">
                <span>{testCase.input}</span> output: {testCase.output}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
