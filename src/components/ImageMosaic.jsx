import { Link, useLocation } from 'react-router-dom';


const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const ImageMosaic = ({ images = [] }) => {
  const location = useLocation() ;

  const isHomePage = location.pathname === "/";

  if (!images.length) {
    return <div className="text-center p-10 text-gray-500">No images to display.</div>
  }

  return (
    <div className="px-5">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img) => (
          <div key={img._id} className="break-inside-avoid group relative">
            <img
              src={`${BACKEND_BASE_URL}/${img.imageUrl}`}
              alt="artwork"
              className="w-full rounded-lg shadow-md hover:scale-[1.02] transition-all duration-300 ease-in-out group-hover:brightness-90"
            />

            {/* The Username Section */}
            {img.username && isHomePage && (
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    <p className="text-white text-xs font-semibold tracking-wide">
                      @{img.username}
                    </p>
                  </div>

                  {/* Optional: Add a "view" icon or button here */}
                  <Link 
                    to={`/profile/${img.username}`}
                  >
                    <div className="bg-white/90 p-2 rounded-full shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </ Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageMosaic;