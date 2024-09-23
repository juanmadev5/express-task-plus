import TopBar from "../components/top-bar";
import Card from "../components/card";

export default function Home() {
  return (
    <div className="items-center bg-sky-900 text-white min-h-screen p-2 max-md:p-4">
      <TopBar />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pt-3 max-md:flex max-md:flex-col max-md:items-center">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
