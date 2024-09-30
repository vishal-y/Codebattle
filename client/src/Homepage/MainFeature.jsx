import HomeEditor from '../components/HomeEditor';

export default function MainFeature() {
  return (
    <section className="bg-black pt-5 lg:pt-28 " id="feature">
      <div>
        <h2 className="text-center text-white text-4xl md:text-5xl font-bold tracking-tighter sm:text-6xl">
          Elevate Your Coding Experience
        </h2>
        <div className="mx-auto max-w-xl px-8 md:px-0">
          <p className="mt-5 text-center text-base md:text-xl text-white/70">
            Join CodeBattle to challenge yourself with real-time coding battles,
            collaborate with peers, and enhance your programming skills in an
            interactive environment.
          </p>
        </div>
      </div>

      <div className="flex flex-col h-full gap-2 px-8 py-12 mx-auto md:px-12 lg:px-32 max-w-7xl">
        {/* Feature Card 1 */}
        <div className="hidden gap-2 lg:grid-flow-col-dense lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-3">
          <div className="max-w-lg p-2 rounded-3xl min-w-full mx-auto">
            <div className="flex mt-[-.5rem] h-[17rem]">
              <div className="bg-gradient-to-b from-[#5D2CA8] to-black flex flex-col justify-center p-8 border border-[#685a96] rounded-3xl max-w-none">
                <h2 className="font-medium text-[#b5a3fc] text-center">
                  Interactive Code Editor
                </h2>
                <p className="mt-4 text-sm text-center text-violet-200">
                  An in-browser code editor enables users to write, test, and submit code with real-time feedback on performance and correctness.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="relative h-full p-2 overflow-hidden box-inset border border-[#685a96] rounded-3xl">
              <HomeEditor
                h={16}
                code={`function twoSum(nums, target) {
  const map = new Map();
  for(let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if(map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`}
              />
            </div>
          </div>
        </div>

        {/* Feature Card 2 */}
        <div className=" py-2 gap-2 lg:grid-flow-col-dense lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-3">
          <div className="max-w-lg bg-gradient-to-b from-black to-[#5D2CA8] p-2 border rounded-3xl border-[#685a96] min-w-full mx-auto lg:col-start-3">
            <div className="flex h-full">
              <div className="flex flex-col justify-center p-8 max-w-none">
                <h2 className="font-medium text-[#b5a3fc] text-center">
                  Real-Time Coding Battles
                </h2>
                <p className="mt-4 text-sm text-center text-violet-200">
                  Engage in live coding challenges with multiple users simultaneously, adding a competitive edge to the learning experience.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-start-1 lg:col-span-2">
            {/* <div className="relative flex flex-col gap-2 h-full p-2 overflow-hidden box-inset border border-[#685a96] rounded-3xl">
             </div> */}

              <div className='flex mt-5 lg:mt-0 flex-col lg:flex-row justify-center gap-2 lg:gap-3 items-center'>

             <div className='w-full lg:w-1/2 relative flex flex-col gap-2 h-full p-2 overflow-hidden box-inset border border-[#685a96] rounded-3xl'>
              <HomeEditor
                h={18}
                code={`// Collaborative Example
// User A
function fetchData(apiUrl) {
  return fetch(apiUrl)
    .then(response => 
      response.json())
    .catch(error => 
      console.error(error));
}
let Data = fetchData(apiUrl);
console.log(Data);`}
              />
            </div>
            <div className='w-full lg:w-1/2 relative flex flex-col gap-2 h-full p-2 overflow-hidden box-inset border border-[#685a96] rounded-3xl'>
            <HomeEditor
                h={18}
                code={`// Collaborative Example
// User B
function any(api) {
  fetchData(apiURI)
    .then(data => 
      console.log(data))
    .catch(error => 
      console.error(error));
}
let Data = any(apiUrl);
console.log(Data);`}
              />
            </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
