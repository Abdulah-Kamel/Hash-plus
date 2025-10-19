import { NavBar } from "@/components/navbar";
import Footer from "@/components/footer";
import LibraryHeader from "@/components/library/LibraryHeader";
import LibraryContent from "@/components/library/LibraryContent";

const LibraryPage = () => {
    return (
        <div>
            <NavBar />
            
            <div className="bg-white min-h-screen">
                <LibraryHeader />
                
                <div className="px-4 lg:px-8 py-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="">
                            {/* Main Content - 3 parts (75%) */}
                            <div className="">
                                <LibraryContent />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default LibraryPage;
