function NotesPage() {
  const temp = `Oh boy:
    
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
    * sdafsadfr`;

  return (
    <div>
      <Note temp={temp} />
    </div>
  );
}

function Note({ temp }) {
  return (
    <div className="container flex flex-col justify-start w-1/4 max-h-72 p-5 bg-white rounded overflow-hidden">
      <h1 className="text-2xl font-bold mb-5">Title</h1>
      <pre>{temp}</pre>
    </div>
  );
}

export default NotesPage;
