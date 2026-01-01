import { useEffect, useState } from "react";
import ImageMosaic from "../components/ImageMosaic";
import toast from 'react-hot-toast';


const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const Dashboard = () => {
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploading, setUploading] = useState(false)


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error("Please select a file first");
            return;
        }

        setUploading(true)

        const formData = new FormData();
        formData.append('image', selectedFile)

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/images/upload`, {
                method: 'POST',
                body: formData,
                // Note: Don't set Content-Type header, browser will set it automatically
                headers: {
                    "x-username": localStorage.getItem("username")
                }
            })

            const data = await response.json();

            if (response.ok) {
                toast.success("Image uploaded successfully!");
                setSelectedFile(null)

                // Clear file input
                e.target.reset();

                // Fetch images again
                fetchMyImages();

            } else {
                console.error(`Uploading unseccessful: ${data.error}`);
                toast.error(data.error || "Uploading unsuccessful!");
            }

        } catch (error) {
            toast.error("Network error. Please try again.");
            console.error('Upload error:', error);
        } finally {
            setUploading(false)
        }
    }

    const fetchMyImages = async () => {

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/images/my`, {
                headers: {
                    "x-username": localStorage.getItem("username")
                }
            })

            const data = await response.json();

            if (response.ok) {
                setImages(data.images)
            } else {
                toast.error(data.error || "Check console");
                console.error(data.error)
            }

        } catch (error) {
            toast.error("Fetch images error");
            console.error("Fetch images error", error)
        }
    }

    useEffect(() => {
        fetchMyImages();
    }, [])

    return (
        <div className="min-h-screen pt-30 bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10">

            {/* Header */}
            <header className="max-w-6xl mx-auto mb-10">
                <h2 className="text-3xl font-semibold tracking-wide">
                    My Dashboard
                </h2>
                <p className="text-gray-400 mt-1 text-sm">
                    Manage and upload your artworks
                </p>
            </header>

            {/* Upload Section */}
            <section className="max-w-6xl mx-auto mb-14 px-4 sm:px-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-white">
                            Upload New Artwork
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                            Share your latest creation with the community.
                        </p>
                    </div>

                    <form
                        onSubmit={handleUpload}
                        className="flex flex-col md:flex-row gap-4 w-full"
                    >
                        {/* File Input Wrapper */}
                        <div className="relative flex-1 group">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="block w-full text-sm text-gray-400
                                            file:mr-4 file:py-2.5 file:px-6
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-white file:text-black
                                            hover:file:bg-green-400 hover:file:text-white
                                            file:transition-all file:duration-300
                                            cursor-pointer
                                            bg-white/5 rounded-full border border-white/10 pr-4 focus:outline-none"
                            />
                        </div>

                        {/* Upload Button */}
                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full md:w-auto px-8 py-2.5 rounded-full bg-green-500 text-white text-sm font-bold
                                        hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] 
                                        active:scale-95 transition-all duration-300 
                                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer"
                        >
                            {uploading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                "Publish Artwork"
                            )}
                        </button>
                    </form>
                </div>
            </section>

            {/* My Images */}
            <section className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-2xl font-semibold tracking-wide text-white">
                            My Uploaded Images
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                            A curated view of your recent artworks
                        </p>
                    </div>

                    {/* Subtle divider accent(give more premium feel) */}
                    <div className="hidden sm:block w-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>

                <ImageMosaic images={images} />
            </section>

        </div>
    )
}

export default Dashboard
