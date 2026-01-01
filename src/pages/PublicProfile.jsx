import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageMosaic from '../components/ImageMosaic';
import toast from 'react-hot-toast';


const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const PublicProfile = () => {
    const { username } = useParams();
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchProfileImages = async () => {
        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/profile/${username}`)
            const data = await response.json()

            if (response.ok) {
                setImages(data)
            } else {
                toast.error(data.error || "Error")
            }

        } catch (error) {
            console.error("Failed to fetch profile images:", error);
            toast.error("Failed to fetch profile images");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfileImages();
    }, [username])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-400">
                Loading profile...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0b0f2a] via-[#0f1438] to-[#050716] text-gray-200 px-6 pt-32 pb-20">

            {/* Profile Header */}
            <section className="max-w-4xl mx-auto text-center mb-15">
                <div className="inline-flex flex-col items-center">

                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full
                                    bg-white/10 backdrop-blur-md
                                    border border-white/20
                                    ring-1 ring-white/10
                                    shadow-[0_0_30px_rgba(255,255,255,0.08)]
                                    flex items-center justify-center
                                    text-3xl font-semibold text-white"
                                >
                        {username?.charAt(0).toUpperCase()}
                    </div>

                    {/* Username */}
                    <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                        @{username}
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-md">
                        Public artworks shared by this creator
                    </p>

                    {/* Divider */}
                    <div className="mt-6 h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
            </section>

            {/* User Images (Masonry / Mosaic) */}
            <section className="max-w-6xl mx-auto">
                {images.length === 0 ? (
                    <p className="text-center text-gray-500 text-sm">
                        No artworks uploaded yet.
                    </p>
                ) : (
                    <ImageMosaic images={images} />
                )}
            </section>
        </div>
    )
}

export default PublicProfile
