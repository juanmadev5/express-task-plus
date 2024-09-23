export default function TopBar() {
  return (
    <div className="w-full h-auto flex p-3 justify-between items-center bg-sky-950 rounded-2xl">
      <h2 className="text-2xl font-semibold">Tasks</h2>
      <div className="flex flex-row items-center h-full">
        <p className="mx-4">
          <a href="">History</a>
        </p>
        <p>
          <a href="">Account</a>
        </p>
      </div>
    </div>
  );
}
