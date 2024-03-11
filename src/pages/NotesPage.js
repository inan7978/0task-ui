function NotesPage() {
  const temp = [
    `Oh boy:
    
    * This and that 1
    * This and that 2
    * This and that 3
    * Another ont?
    * Holy cow!
    * dsfadsfas
    * fasdfsdf
    * sdafasdfaf
    * dsafsadfasd
    * dafdfsdfa
    * sdafsadfr`,
    `Oh boy:
    
  * This and that 1
  * This and that 2
  * This and that 3
  * Another ont?
  * Holy cow!
  * dsfadsfas
  * fasdfsdf
  * 
  * sdafasdfaf
  * dsafsadfasd
  * dafdfsdfa
  * xxcsccsd
  * sasadS
  * 
  * 
  * 
  * dasd
  * sdafsadfr`,
    `Oh boy:
    
  * This and that 1
  * This and that 2
  * This and that 3
  * Another ont? Why not? They have already taken our gold.
  * Holy cow!
  * dsfadsfas
  * fasdfsdf
  * sdafasdfaf
  * dsafsadfasd
  * dafdfsdfa
  * sdafsadfr`,
  ];

  const notes = temp.map((note) => {
    return <Note temp={note} />;
  });

  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      <h1 className="text-white text-3xl font-bold my-10">Your notes</h1>
      <div className="flex-col flex justify-center gap-5 sm:flex-row">
        {notes}
      </div>
    </div>
  );
}

function Note({ temp }) {
  return (
    <div className="flex flex-col justify-start max-h-72 p-5 mb-5 bg-white rounded overflow-hidden">
      <pre>{temp}</pre>
    </div>
  );
}

export default NotesPage;
