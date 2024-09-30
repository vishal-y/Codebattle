export default function About() {
  return (
    <div className="mt-[18vh] flex justify-center items-center flex-col text-white">
      <p className="text-2xl font-bold">WHAT IS CODEBATTLE</p>
      <p className="w-[80vw] lg:max-w-[50vw] text-center mt-3">CodeBattle is a dynamic and interactive coding platform designed for competitive programming, enabling users to engage in real-time coding battles with others.</p>
      <p className="text-slate-400 my-4">(Here's the full tutorial of codebattle)</p>
      {/* <video className="h-[60vh] w-[60vw] rounded-xl mt-4" controls>
        <source
          src="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video> */}

<iframe width="800" className="hidden lg:block rounded-2xl" height="400" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=Z3bx6kQlhGy7Fn4O" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<iframe width="350" className="lg:hidden rounded-2xl" height="230" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=Z3bx6kQlhGy7Fn4O" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


      {/* <ul className="list-disc pl-6 mt-5 space-y-4">
       <p className="text-2xl font-bold">Features</p>
  <li className="text-lg font-semibold">
    Real-Time Coding Battles:
    <span className="block text-sm opacity-75 mt-1">Engage in live coding challenges with multiple users simultaneously, adding a competitive edge to the learning experience.</span>
  </li>
  <li className="text-lg font-semibold">
    User-Generated Contests:
    <span className="block text-sm opacity-75 mt-1">Empower users to create and manage their own coding contests, allowing for a flexible and customized competitive environment.</span>
  </li>
  <li className="text-lg font-semibold">
    Leaderboard and Scoring:
    <span className="block text-sm opacity-75 mt-1">Real-time leaderboards display users’ rankings during battles and contests, allowing them to track their performance against others.</span>
  </li>
  <li className="text-lg font-semibold">
    Collaborative Problem Solving:
    <span className="block text-sm opacity-75 mt-1">Users can collaborate or compete in teams, sharing insights and strategies to tackle challenges.</span>
  </li>
  <li className="text-lg font-semibold">
    Interactive Code Editor:
    <span className="block text-sm opacity-75 mt-1">An in-browser code editor enables users to write, test, and submit code with real-time feedback on performance and correctness.</span>
  </li>
  <li className="text-lg font-semibold">
    Progress Tracking:
    <span className="block text-sm opacity-75 mt-1">Detailed analytics and progress tracking for users, helping them assess their strengths and areas for improvement over time.</span>
  </li>
  <li className="text-lg font-semibold">
    Community Engagement:
    <span className="block text-sm opacity-75 mt-1">Fosters an active coding community with discussion forums, feedback options, and opportunities for mentorship.</span>
  </li>
</ul> */}

    </div>
  );
}
