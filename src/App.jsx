import React, { useState, useEffect } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setTask(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(task));
  }, [task]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !details.trim()) return;

    const newNote = {
      id: Date.now(),
      title,
      details,
    };

    setTask([...task, newNote]);

    setTitle("");
    setDetails("");
  };
 
  const deleteHandler = (id) => {
    const confirmDelete = window.confirm("Delete this note?");
    if (!confirmDelete) return;

    const filtered = task.filter((t) => t.id !== id);
    setTask(filtered);
  };

  return (
    <div className="min-h-screen lg:flex bg-black text-white">
      {/* LEFT SIDE FORM */}
      <form
        onSubmit={submitHandler}
        className="flex gap-4 lg:w-1/2 items-start flex-col p-10"
      >
        <h1 className="text-4xl font-bold">Add Notes</h1>

        <input
          type="text"
          placeholder="Enter Notes Heading"
          className="px-5 w-full py-2 border-2 outline-none rounded-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write Details Here..."
          className="px-5 w-full h-32 py-2 border-2 outline-none rounded-sm"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <button className="bg-white w-full text-black px-5 py-2 rounded active:bg-gray-300 active:scale-95">
          Add Notes
        </button>
      </form>

      {/* RIGHT SIDE NOTES */}
      <div className="lg:w-1/2 lg:border-l-2 p-10">
        <h1 className="text-4xl font-bold">Recent Notes</h1>

        <div className="flex flex-wrap gap-5 mt-5 h-full overflow-auto">
          {task.length === 0 ? (
            <p className="text-gray-400 mt-5">No notes yet...</p>
          ) : (
            task.map((elem) => (
              <div
                key={elem.id}
                className="relative h-52 w-40 bg-cover rounded-xl 
                bg-[url('https://static.vecteezy.com/system/resources/thumbnails/011/421/296/small/vertical-spiral-notebook-png.png')] 
                text-black p-2 overflow-hidden pl-4 shadow-lg 
                hover:scale-105 hover:shadow-2xl transition duration-200"
              >
                <h3 className="text-xl mt-2 font-bold">{elem.title}</h3>

                <p className="text-sm mt-2 text-gray-700 line-clamp-4">
                  {elem.details}
                </p>

                <button
                  onClick={() => deleteHandler(elem.id)}
                  className="absolute top-4 right-5 bg-white/80 rounded-full px-2 
                  hover:bg-red-500 hover:text-white transition cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;