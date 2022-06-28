import React from "react";

// Click Events Function

const Content = () => {
  const handleClick = () => {
    console.log("You Clicked it");
  };

  // anonimous button
  const handleClick2 = (name) => {
    console.log(`${name} was clicked.`);
  };

  const handleClick3 = (e) => {
    console.log(e.target);
  };
  return (
    <main>
      <p>Hello World..!!</p>

      <button onClick={handleClick}>Click It</button>
      
      {/* Anonimous button */}
      <button onClick={() => handleClick2("Thirosh")}>Click It</button>
      
      <button onClick={(e)=>handleClick3(e)}>Click It</button>
    </main>
  );
};

export default Content;
