export default function Card() {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white text-slate-700 border border-slate-200 grid grid-col-2 justify-start p-4 gap-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-400 ease-in-out transform hover:scale-[1.02] m-2 max-md:w-80">
      <div className="col-span-2 w-full">
        <h3 className="text-lg font-semibold text-gray-800 truncate pb-6">
          Take out garbage
        </h3>
      </div>
      <div className="flex justify-start align-bottom">
        <button className="flex items-center justify-center mr-2 w-10 h-10 bg-sky-200 rounded-full hover:bg-sky-500 transition-colors duration-300">
          <img
            src="https://img.icons8.com/material-outlined/24/task-completed.png"
            alt="Complete Task"
            className="w-5 h-5"
          />
        </button>
        <button className="flex items-center justify-center w-10 h-10 bg-red-200 rounded-full hover:bg-red-500 transition-colors duration-300">
          <img
            src="https://img.icons8.com/material-outlined/24/trash--v1.png"
            alt="Delete Task"
            className="w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
}
