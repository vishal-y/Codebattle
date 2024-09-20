import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProblemSet from "../utils/ProblemSet";
import PropTypes from "prop-types";

const tagsName = [
  "Array",
  "Strings",
  "Linked List",
  "Searching Algorithms",
  "Sorting Algorithms",
  "Divide and Conquer Algorithms",
  "Stack",
  "Queue",
  "Tree",
  "Graph",
  "Recursion",
  "Backtracking",
  "Dynamic Programming",
];

const Tags = ({ TagName, funName }) => {
  return (
    <p
      onClick={funName}
      className="cursor-pointer transition-all duration-75 ease-in-out hover:bg-transparent bg-slate-800 hover:border w-fit  p-1 h-fit text-sm rounded-lg hover:scale-105"
    >
      {TagName}
    </p>
  );
};
Tags.propTypes = {
  TagName: PropTypes.string.isRequired,
  funName: PropTypes.string.isRequired,
};

export default function Problems() {
  useEffect(() => {
    if (document.getElementById("navbar")) {
      document.getElementById("navbar").style.display = "block";
    }
  }, []);

  let tags = [" "];

  const handleTags = (e) => {
    let ele = e.target;

    tags.forEach((i) => {
      if (ele.textContent == i) {
        console.log("double click");
        ele.style.background = "#1e293b";
        ele.style.color = "#fff";
      } else {
        ele.style.background = "#b5a3fc";
        ele.style.color = "#000";
        tags.push(ele.textContent);
      }
    });

    console.log(tags);
  };

  console.log(ProblemSet);

  return (
    <div className="h-screen bg-[#100821] text-white">
      <div className="h-[3rem]"></div>
      <div className="h-[92vh] w-screen flex justify-center ">
        <div className="w-[80vw] border px-4 overflow-y-scroll flex justify-between">
          <div className="mt-[5rem]">
            {ProblemSet.map((e, i) => {
              let color =
                e.difficulty != "Hard"
                  ? e.difficulty == "Easy"
                    ? "green"
                    : "yellow"
                  : "red";
              console.log(color);
              return (
                <span key={i} data-tags={e.tags} className="flex gap-4 p-2">
                  <Link to={`${e.problem}/${i + 1}`}>
                    {" "}
                    {i + 1}. {e.problem}
                  </Link>
                  <p
                    style={{
                      backgroundColor: "#1e293b",
                      padding: "5px",
                      fontSize: "80%",
                      borderRadius: ".5rem",
                    }}
                    className={
                      e.difficulty !== "Hard"
                        ? e.difficulty === "Easy"
                          ? " text-green-500"
                          : "text-yellow-500"
                        : "text-red-500"
                    }
                  >
                    {e.difficulty}
                  </p>
                </span>
              );
            })}
          </div>

          <div className="border-2 mt-2 p-2 border-[#685a96] w-[20vw] h-fit flex flex-wrap gap-2 rounded-xl shadow-2xl">
            {tagsName.map((ele, i) => {
              console.log("first");
              console.log("ele", ele, i);
              return <Tags funName={handleTags} key={i} TagName={ele} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
