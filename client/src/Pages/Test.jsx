export default function Test() {

  const handleClick = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: "232f5a3b5b405999005315b2c1ea5670",
      // "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      code: 'print("Hello world")\nstart = input()\nend = input()\nfor i in range(int(start), int(end)):\n    print(i)',
      input: "1\n10",
      compiler: "python-3.9.7",
    });

    let response = await fetch("https://onlinecompiler.io/api/v2/run-code/", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.text();
    console.log(data);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      
      <div
        onClick={handleClick}
        className="p-4 text-white bg-green-500 curpo rounded-md "
      >
        Test the api
      </div>
      
    </div>
  );
}
