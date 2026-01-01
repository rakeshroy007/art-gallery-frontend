import { useEffect, useState } from "react";
import ImageMosaic from "../components/ImageMosaic";
import toast from 'react-hot-toast';


const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export default function Landing() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRandomImages = async () => {
        try {
            const res = await fetch(`${BACKEND_BASE_URL}/api/images/random`);
            const data = await res.json();
            
            if (res.ok) {
                setImages(data)
            } else {
                toast.error(data.error || "Error")
            }

        } catch (error) {
            toast.error("Failed to fetch random images");
            console.error("Failed to fetch random images", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRandomImages();
    }, []);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-400">
                Loading artworks...
            </div>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 pt-32 pb-10 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight text-white">
                    Showcase Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Digital Memories</span>
                </h1>

                <p className="mt-6 text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
                    Upload, preserve, and share your artwork with the world — beautifully and effortlessly.
                </p>
            </section>

            {/* Section Divider */}
            <div className="max-w-6xl mx-auto px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Community Gallery subtle */}
            <section className="max-w-6xl mx-auto px-6 py-5 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                    Community Gallery
                </p>
                <p className="mt-2 text-gray-500 text-sm">
                    Artwork shared by creators around the world
                </p>
            </section>

            {/* Masonry Gallery */}
            <section className="max-w-6xl mx-auto px-6 pb-24">
                <ImageMosaic images={images} />
            </section>
        </>
    )
}