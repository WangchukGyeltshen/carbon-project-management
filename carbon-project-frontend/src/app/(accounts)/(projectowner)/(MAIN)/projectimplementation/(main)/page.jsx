import Sidebar from "(accounts)/(projectowner)/(components)/Sidebar";
import Navbar from "(accounts)/(projectowner)/(components)/Navbar";
import ProjectImplementation from "(accounts)/(projectowner)/(MAIN)/projectimplementation/(components)/ProjectImplementation";

export default function ProjectImplementationPage() {
  return (
    <div className="flex h-screen bg-[#F4F6F2]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
  <ProjectImplementation />
</main>
      </div>
    </div>
  );
}

